# CIS5 Wallet Registry

### Overview

The **CIS5 Wallet Registry** is a smart contract designed to streamline the management of blockchain wallets on the Concordium network. It allows users to register human-readable tags for their public keys, simplifying interactions and transactions on the network. This system supports the **CIS5 wallet standard**, offering an easy way to link a public key to a wallet's smart contract and provider.

### Features

- **Human-readable tags**: Each public key can be associated with a user-friendly string tag (e.g., `buki.ccd`), making it easier to manage wallet addresses.
- **Immutable Mapping**: Once a tag is created for a public key, it cannot be reassigned, ensuring lifetime uniqueness.
- **Efficient Queries**: Supports lookups to retrieve either the key associated with a tag or the tag for a public key.
- **Interoperability**: Wallet providers can query the registry for registered users, reducing the need for manual inputs during asset transfers.

### Smart Contract Functions

- **register**: Registers a tag for a given public key. The tag must end with `.ccd` and can be used to map the user’s public key, wallet contract address, and the associated provider.
- **get_key**: Retrieves the wallet information (public key, contract address, provider) for a given tag.
- **get_tag**: Performs a reverse lookup, returning the tag for a given public key.

### Use Cases

- **Wallet Providers**: Simplify the process of wallet creation and management by allowing users to associate readable tags with their cryptographic public keys.
- **Developers**: Integrate the registry into dApps to improve the user experience by enabling easy lookups of wallet data using simple tags.
- **Users**: Maintain control over wallet details without the complexity of managing long cryptographic key strings.

### Installation and Setup

1. **Prerequisites**: 
   - Concordium smart contract development environment (Rust and cargo-concordium)

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/BukiOffor/registry.git
   cd registry
   ```

3. **Build the Smart Contract**:
   Run the following commands to compile the smart contract:
   ```bash
   cargo concordium build -e --out dist/module.wasm.v1
   ```

4. **Deploying the Smart Contract**:
   Use Concordium's CLI tools to deploy the contract. Ensure you have access to a Concordium testnet or mainnet node for contract deployment.

   ```bash
   cargo concordium deploy --<flags>
   ```
5. **Tests**:
   You can run the unit test in the test folder by running
   ```bash
   cargo concordium test
   ```

### Example Code

```rust
/// Register a tag for a given public key
fn register(&mut self, tag: String, data: Registry) -> RegistryResult<()> {
    if !tag.ends_with(".ccd") {
        tag.push_str(".ccd");
    }
    // Register the tag and public key
    self.registry.entry(tag.clone()).or_insert(data.clone());
    self.lookup.insert(data.public_key, tag);
    Ok(())
}

/// Retrieve the public key details from a tag
fn get_key(&self, tag: String) -> RegistryResult<Registry> {
    self.registry.get(&tag).cloned().ok_or(Error::TagDoesNotExist)
}

/// Retrieve the tag from a public key
fn get_tag(&self, key: PublicKeyEd25519) -> RegistryResult<String> {
    self.lookup.get(&key).cloned().ok_or(Error::KeyDoesNotExist)
}
```

### Contributing

We welcome contributions from the community. If you’d like to report an issue or contribute code, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add a new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request for review.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

