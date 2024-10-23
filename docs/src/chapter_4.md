### Chapter 4: **Registering Wallet Tags**

It’s time to explore how users can interact with the contract to register their wallet tags. The process of registration is crucial because it maps a human-readable tag to a user's public key and smart contract wallet. This enables smooth and error-free transactions on the Concordium network.

In this chapter, we’ll cover how the `register` function works, its parameters, and how to validate and execute a successful registration.

---

#### 4.1 Overview of the Registration Process

The core function for registering wallet tags in this contract is called `register`. This function performs several critical tasks:
- **Validates** the user's signature to ensure that the request is authentic.
- **Ensures uniqueness** by checking if the tag or public key has already been registered.
- **Registers the tag** by mapping it to the public key and wallet contract details.

The registration process takes in a user-generated tag and appends the `.ccd` suffix to it, creating a standardized and unique identifier across the Concordium network. 

#### 4.2 The `register` Function

The contract function responsible for this action is as follows:

```rust
fn register(&mut self, tag: String, data: Registry) -> RegistryResult<()> {
    let Registry { public_key, contract_address: _, provider:_ } = data.clone();    
    match self.registry.entry(tag.clone()) {
        // check if the tag has been created before.
        Entry::Occupied(_) => Err(Error::TagAlreadyExists),
        Entry::Vacant(entry) => {
            // check if the public key has created a tag for this key before.
            if self.lookup.get(&public_key).is_some() {
                return Err(Error::TagAlreadyExists);
            }
            entry.insert(data);
            let _ = self.lookup.insert(public_key, tag);
            Ok(())
        }
    }
}
```

Let’s break this down step by step:

1. **Inputs**:
   - `tag`: A string representing the tag the user wants to register (e.g., `"alice"`).
   - `data`: A `Registry` object containing the user's `public_key`, `contract_address`, and `provider`.

2. **Tag Existence Check**:
   - First, the contract checks if the tag already exists by attempting to look it up in the `registry` map. If the tag is already registered, the contract returns an error (`Error::TagAlreadyExists`).

3. **Public Key Uniqueness**:
   - If the tag is available, the contract then checks whether the `public_key` has already been registered with another tag. If the `public_key` is already associated with a tag, the contract returns the same error.

4. **Tag Registration**:
   - If both the tag and public key are unique, the contract registers the tag by inserting it into the `registry` map and creating a reverse lookup in the `lookup` map. This ensures both the tag-to-public-key and public-key-to-tag mappings are updated.

5. **Return**:
   - If successful, the function returns `Ok(())`, indicating the registration was completed without issues.

#### 4.3 Registering with `.ccd`

As per the contract’s design, each tag is required to end with `.ccd`. This suffix helps create a standard for tags across the Concordium network. The contract automatically appends this suffix if the user doesn’t include it when registering.

Here’s the relevant logic from the contract’s `register` entry point:

```rust
if !tag.ends_with(".ccd") {
    tag.push_str(".ccd");
}
```

This ensures that even if a user inputs `"alice"`, the contract will automatically convert it to `"alice.ccd"`, maintaining consistency across the platform.

#### 4.4 Validating the Registration Request

Before executing the registration, the contract validates that the request is signed by the public key’s owner. This is important for preventing unauthorized tag registrations.

The signature validation is handled by the `validate_signature` function:

```rust
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
```

This function ensures that:
1. **The message has not expired**: A timestamp (`expiry_time`) is checked to make sure the registration is still valid.
2. **The signature is correct**: Using cryptographic primitives, the contract verifies the signature against the user’s public key. If the signature doesn’t match, it returns an error (`Error::WrongSignature`).

Only after passing this validation step does the contract proceed to register the tag.

#### 4.5 Events and Logs

Once a tag is successfully registered, the contract logs the event to the blockchain. This event is crucial for tracking the registration and providing proof of execution.

The `RegisterEvent` structure logs the following data:

```rust
#[derive(Debug, Serial, Deserial, PartialEq, Eq, SchemaType)]
pub struct RegisterEvent {
    tag: String,
    contract_address: AccountAddress,
    public_key: PublicKeyEd25519,
    provider: String,
    registrar: AccountAddress
}
```

Here’s the corresponding part of the `register` function that emits the event:

```rust
logger.log(&Event::Register(RegisterEvent {
    tag: message.tag,
    contract_address: message.data.contract_address,
    public_key: message.data.public_key,
    provider: message.data.provider,
    registrar: ctx.sender(),
}))?;
```

The event contains:
- The registered tag.
- The contract address associated with the public key.
- The public key itself.
- The wallet provider (such as a company managing the contract).

These events are written to the blockchain’s event log, which can be queried and audited at any time. This creates transparency and traceability for all tag registrations.

#### 4.6 Error Handling

During registration, various errors can occur. These are handled by the contract’s error system, which returns specific error messages depending on the situation:

- **`Error::TagAlreadyExists`**: Returned when the tag or public key has already been registered.
- **`Error::WrongSignature`**: Returned when the user’s signature is invalid.
- **`Error::Expired`**: Returned when the request has expired based on the provided timestamp.

These error messages help users understand why their registration failed, allowing them to correct their input or try again later.

---

### Chapter Summary

In this chapter, we explored the **register** function in detail, from validating signatures to ensuring unique tag and public key combinations. We also discussed how the contract automatically appends `.ccd` to tags and how it logs successful registrations for transparency and traceability.

In the next chapter, **Chapter 5: Retrieving Tags and Public Keys**, we’ll examine how to retrieve a tag’s details or look up the tag associated with a public key using the contract’s built-in functions.

---