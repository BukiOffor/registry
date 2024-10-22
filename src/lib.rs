//! # Concordium V1 Smart Contract Template

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
}

impl State {
    fn register(&mut self, tag: String, data: Registry) -> RegistryResult<()> {
        match self.registry.entry(tag) {
            Entry::Occupied(_) => Err(Error::TagAlreadyExists),
            Entry::Vacant(entry) => {
                entry.insert(data);
                Ok(())
            }
        }
    }

    
    fn get(&self, tag: String) -> RegistryResult<Registry> {
        self.registry
            .get(&tag)
            .map(|r| r.clone())
            .ok_or(Error::TagDoesNotExist)
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
/// - the nonce is wrong.
/// - the message hash can not be calculated.
fn validate_signature_and_increase_nonce<T: Serial + IsMessage>(
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
#[init(contract = "registry", parameter = "CustomInputParameter")]
fn init(_ctx: &InitContext, state_builder: &mut StateBuilder) -> InitResult<State> {
    // Create the initial state of the smart contract here.
    // This state can then be used in the other functions.
    Ok(State {
        registry: state_builder.new_map(),
    })
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
fn withdraw_ccd(
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
    ensure!(
        signer.cmp(&message.data.public_key) == Ordering::Equal,
        Error::WrongSignature.into()
    );
    let RegisterParam {
        expiry_time: _,
        mut tag,
        data,
    } = message.clone();
    // Validate the signature and increase the nonce.
    validate_signature_and_increase_nonce(
        &message,
        signer,
        signature,
        crypto_primitives,
        ctx,
    )?;
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
    name = "getTag",
    parameter = "String",
    error = "Error",
    mutable
)]
fn get_tag(ctx: &ReceiveContext, host: &mut Host<State>) -> RegistryResult<Registry> {
    let mut tag: String = ctx.parameter_cursor().get()?;
    if !tag.ends_with(".ccd"){ tag.push_str(".ccd"); }
    host.state.get(tag)
}

/// Returns the state of the smart contract.
#[receive(contract = "registry", name = "view", return_value = "State")]
fn view<'a>(_ctx: &ReceiveContext, host: &'a Host<State>) -> ReceiveResult<&'a State> {
    Ok(host.state())
}
