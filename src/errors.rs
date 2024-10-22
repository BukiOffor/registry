use crate::*;

/// Errors that may be emitted by this smart contract.
#[derive(Debug, PartialEq, Eq, Reject, Serialize, SchemaType)]
pub enum Error {
    /// Failed parsing the input parameter.
    #[from(ParseError)]
    ParseParams, // -1
    /// Failed because the signature is invalid.
    WrongSignature, // -2
    /// Failed because the nonce is wrong in the message.
    NonceMismatch, // -3
    /// Failed because the signature is expired.
    Expired, // -4
    /// Failed because the message was intended for a different entry point.
    WrongEntryPoint, // -5
    /// Failed because the sender is unauthorized to invoke the entry point.
    UnAuthorized, // -6
    /// Failed because of an overflow in the token/CCD amount.
    Overflow, // -7
    /// Failed because
    TagAlreadyExists, // -8
    TagDoesNotExist, // -9
    KeyDoesNotExist, // -10
}
