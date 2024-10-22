use crate::errors::Error;
use concordium_std::SignatureEd25519;
use concordium_std::{
    Address, ContractAddress, PublicKeyEd25519, SchemaType, Serialize, Timestamp,
};
use core::fmt::Debug;

/// Trait definition of the `IsMessage`. This trait is implemented for the two
/// types `WithdrawMessage` and `TransferMessage`. The `isMessage` trait is used
/// as an input parameter to the `validate_signature_and_increase_nonce`
/// function so that the function works with both message types.
pub trait IsMessage {
    fn expiry_time(&self) -> Timestamp;
}

pub type RegistryResult<T> = Result<T, Error>;

#[derive(Debug, Serialize, Clone, SchemaType)]
pub struct Registry {
    pub public_key: PublicKeyEd25519,
    pub contract_address: ContractAddress,
    pub provider: String,
}
impl Registry {
    pub fn new(
        public_key: PublicKeyEd25519,
        contract_address: ContractAddress,
        provider: String,
    ) -> Self {
        Self {
            public_key,
            contract_address,
            provider,
        }
    }
}

/// Extrinsic paramemter used to invoke the smart contract
#[derive(Serialize, Clone, SchemaType)]
pub struct RegisterParam {
    pub tag: String,
    pub data: Registry,
    /// A timestamp to make the signatures expire.
    pub expiry_time: Timestamp,
}

/// The withdraw message that is signed by the signer.
#[derive(Serialize, SchemaType)]
#[cfg_attr(feature = "serde", derive(SerdeSerialize, SerdeDeserialize))]
pub struct RegisterMessage {
    /// The signer public key.
    pub signer: PublicKeyEd25519,
    /// The signature.
    pub signature: SignatureEd25519,
    /// The message being signed.
    pub message: RegisterParam,
}

impl IsMessage for RegisterParam {
    fn expiry_time(&self) -> Timestamp {
        self.expiry_time
    }
}

/// The `WithdrawCcdEvent` is logged whenever a CCD amount held by a
/// public key is withdrawn to an address.
#[derive(Debug, Serialize, SchemaType, PartialEq, Eq)]
pub struct RegisterEvent {
    pub tag: String,
    pub public_key: PublicKeyEd25519,
    pub contract_address: ContractAddress,
    pub provider: String,
    pub registrar: Address,
}
