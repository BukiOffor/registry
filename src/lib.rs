//! A registry for smart contract wallets.
//!
//! This contract aims to define a standard that can be used
//! to query cis5-wallet standard applicaations. The cis5 wallet
//! account systems makes use of a [PublicKeyEd25519] key. This key
//! can be used to deposit and transfer native and token assets on the network.  
//!
//! The overhead of this standard is that users can implement this protocol
//! on various smart contract and there will be no way for these contracts
//! to communicated with each other `yet`. Also the [PublicKeyEd25519] is
//! in an unreadable format and is prone to human error.
//!
//! The contract therefore creates an interface that allows owners of
//! [PublicKeyEd25519] to create a human readable tag for it's public key.
//! This tag will be used to create a object in the contract state that maps to
//! [Registry]. This [Registry] will contain the :
//! - *public_key*: the public key of the user
//! - *contract_address*: the smart wallet contract address that the key opearates on
//! - *provider*: this is a company or an app that manages the contract
//! The tags at the point of persisting will append a `.ccd` string to the tags,creating
//! a unique and deterministic sequence of tags.
//!
//! The three actions in the smart contract that can be taken are:
//! - *register*: creates a string tag for a given public key
//! - *get_key*: gets the account details of a key given a tag.
//! - *get_tag*: does a reverse lookup and gets the tag when given a key.
//!
//! By design the contract exposes only these 3 entry points. A given public key can
//! only have 1 tag for a lifetime. This means that a key cannot be moved
//! from one smart contract wallet to another once registered.
//! Note that the cis5 wallet standard does not aim to replace the account system
//! on the network but instead a way to quickly onboard users.
//!
//! The goal of this standard is to simplify the transfer of assets between accounts and
//! chaperone accounts on the concordium network. Third party wallet providers that supports
//! transfers to cis5-wallet standard can match a string sequence for `.ccd`.
//! if present they can query the registry for the account details without having
//! to ask a user to manually fill in all the fields.
//! While wallets that do not support the standard yet, can easily support it.
//!
#![cfg_attr(not(feature = "std"), no_std)]
pub mod errors;
pub mod types;
use crate::errors::*;
use crate::types::*;
use concordium_std::cmp::Ordering;
use concordium_std::*;
use core::fmt::Debug;

// The testnet genesis hash is:
// 0x4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796
const TESTNET_GENESIS_HASH: [u8; 32] = [
    66, 33, 51, 45, 52, 225, 105, 65, 104, 194, 160, 192, 179, 253, 15, 39, 56, 9, 97, 44, 177, 61,
    0, 13, 92, 46, 0, 232, 95, 80, 247, 150,
];

/// The state of the smart contract.
#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct State<S = StateApi> {
    // Add fields to this type to hold state in the smart contract.
    // This field is just an example.
    registry: StateMap<String, Registry, S>,
    lookup: StateMap<PublicKeyEd25519, String, S>,
}

impl State {
    fn register(&mut self, tag: String, data: Registry) -> RegistryResult<()> {
        let Registry {
            public_key,
            contract_address: _,
            provider: _,
        } = data.clone();
        match self.registry.entry(tag.clone().to_lowercase()) {
            // check if the tag has been created before.
            Entry::Occupied(_) => Err(Error::TagAlreadyExists),
            Entry::Vacant(entry) => {
                // check if the public key has created a tag for this key before.
                if self.lookup.get(&public_key).is_some() {
                    return Err(Error::TagAlreadyExists);
                }
                entry.insert(data);
                let _ = self.lookup.insert(public_key, tag.to_lowercase());
                Ok(())
            }
        }
    }

    fn get(&self, tag: String) -> RegistryResult<Registry> {
        self.registry
            .get(&tag.to_lowercase())
            .map(|r| r.clone())
            .ok_or(Error::TagDoesNotExist)
    }

    fn get_tag(&self, key: PublicKeyEd25519) -> RegistryResult<String> {
        self.lookup
            .get(&key)
            .map(|r| r.clone())
            .ok_or(Error::KeyDoesNotExist)
    }
}

/// Tagged events to be serialized for the event log.
#[derive(Debug, Serial, Deserial, PartialEq, Eq, SchemaType)]
#[concordium(repr(u8))]
pub enum Event {
    /// The event tracks the nonce used in the message that was signed.
    #[concordium(tag = 28)]
    Register(RegisterEvent),
}

/// Calculates the message hash from the message bytes.
/// It prepends the message bytes with a context string consisting of the
/// `genesis_hash` and this contract address.
fn calculate_message_hash_from_bytes(
    message_bytes: &[u8],
    crypto_primitives: &impl HasCryptoPrimitives,
    ctx: &ReceiveContext,
) -> RegistryResult<[u8; 32]> {
    // We prepend the message with a context string consistent of the genesis_hash
    // and this contract address.
    let mut msg_prepend = [0; 32 + 16];
    msg_prepend[0..32].copy_from_slice(TESTNET_GENESIS_HASH.as_ref());
    msg_prepend[32..40].copy_from_slice(&ctx.self_address().index.to_le_bytes());
    msg_prepend[40..48].copy_from_slice(&ctx.self_address().subindex.to_le_bytes());

    // Calculate the message hash.
    Ok(crypto_primitives
        .hash_sha2_256(&[&msg_prepend[0..48], &message_bytes].concat())
        .0)
}

/// Validates the message signature and increases the public key nonce.
///
/// It rejects if:
/// - the message is expired.
/// - the signature is invalid.
/// - the message hash can not be calculated.
fn validate_signature<T: Serial + IsMessage>(
    message: &T,
    signer: PublicKeyEd25519,
    signature: SignatureEd25519,
    crypto_primitives: &impl HasCryptoPrimitives,
    ctx: &ReceiveContext,
) -> RegistryResult<()> {
    // Check that the signature is not expired.
    ensure!(
        message.expiry_time() > ctx.metadata().slot_time(),
        Error::Expired
    );

    // Calculate the message hash.
    let message_hash: [u8; 32] =
        calculate_message_hash_from_bytes(&to_bytes(&message), crypto_primitives, ctx)?;

    // Check the signature.
    let valid_signature =
        crypto_primitives.verify_ed25519_signature(signer, signature, &message_hash);
    ensure!(valid_signature, Error::WrongSignature);

    Ok(())
}

/// Creates a new instance of the smart contract.
#[init(contract = "registry")]
fn init(_ctx: &InitContext, state_builder: &mut StateBuilder) -> InitResult<State> {
    // Create the initial state of the smart contract here.
    // This state can then be used in the other functions.
    Ok(State {
        registry: state_builder.new_map(),
        lookup: state_builder.new_map(),
    })
}

/// Helper function to calculate the `RegisterMessageHash` for a registeration.
#[receive(
    contract = "registry",
    name = "get_param_hash",
    parameter = "RegisterParam",
    return_value = "[u8;32]",
    error = "Error",
    crypto_primitives,
    mutable
)]
fn contract_get_register_message_hash(
    ctx: &ReceiveContext,
    _host: &mut Host<State>,
    crypto_primitives: &impl HasCryptoPrimitives,
) -> RegistryResult<[u8; 32]> {
    // Parse the parameter.
    let param: RegisterParam = ctx.parameter_cursor().get()?;
    calculate_message_hash_from_bytes(&to_bytes(&param), crypto_primitives, ctx)
}

/// The function adds a new tag to the registry.
/// it first tries to validate the signed transactions before attempting to execute.
/// logs the `Register` event
///
/// It rejects if:
/// - it fails to parse the parameter.
/// - the message is expired.
/// - the signature is invalid.
/// - the nonce is wrong.
#[receive(
    contract = "registry",
    name = "register",
    parameter = "RegisterMessage",
    error = "Error",
    crypto_primitives,
    enable_logger,
    mutable
)]
fn register(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut Logger,
    crypto_primitives: &impl HasCryptoPrimitives,
) -> ReceiveResult<()> {
    // Parse the parameter.
    let param: RegisterMessage = ctx.parameter_cursor().get()?;

    let RegisterMessage {
        signer,
        signature,
        message,
    } = param;
    // ensure!(
    //     signer.cmp(&message.data.public_key) == Ordering::Equal,
    //     Error::WrongSignature.into()
    // );
    let RegisterParam {
        expiry_time: _,
        mut tag,
        data,
    } = message.clone();
    // Validate the signature.
    validate_signature(&message, signer, signature, crypto_primitives, ctx)?;
    if !tag.ends_with(".ccd") {
        tag.push_str(".ccd");
    }
    // Register tag on chain
    host.state_mut().register(tag, data)?;

    logger.log(&Event::Register(RegisterEvent {
        tag: message.tag,
        contract_address: message.data.contract_address,
        public_key: message.data.public_key,
        provider: message.data.provider,
        registrar: ctx.sender(),
    }))?;

    Ok(())
}

/// Get's the registered tag for a user.
/// The input parameter in this function is a `String`.
#[receive(
    contract = "registry",
    name = "get_key",
    parameter = "String",
    error = "Error"
)]
fn get_key(ctx: &ReceiveContext, host: &Host<State>) -> RegistryResult<Registry> {
    let mut tag: String = ctx.parameter_cursor().get()?;
    if !tag.ends_with(".ccd") {
        tag.push_str(".ccd");
    }
    host.state.get(tag)
}

/// Get's the registered tag for a user.
/// The input parameter in this function is a `String`.
#[receive(
    contract = "registry",
    name = "get_tag",
    parameter = "PublicKeyEd25519",
    error = "Error"
)]
fn get_tag(ctx: &ReceiveContext, host: &Host<State>) -> RegistryResult<String> {
    let key: PublicKeyEd25519 = ctx.parameter_cursor().get()?;
    host.state.get_tag(key)
}
