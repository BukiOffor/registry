### Chapter 3: **Deploying and Initializing a Smart Contract**

In this chapter, we will walk through the deployment and initialization process of the CIS5 wallet registry smart contract on Concordium. Deploying a smart contract is the first crucial step in getting your registry up and running. We'll cover how to set up the contract state, register initial values, and ensure that the contract is prepared for interaction with external users and applications.

By the end of this chapter, you’ll understand how to deploy the wallet registry on Concordium and how to initialize the contract with the necessary data structures.

---

#### 3.1 Understanding the Smart Contract Lifecycle

Smart contracts on Concordium follow a lifecycle that begins with deployment and ends when the contract is no longer in use. This lifecycle includes several key stages:
- **Initialization**: This is where the contract’s state is created and any necessary parameters are set.
- **Interaction**: Once deployed, the contract can be interacted with by users or other contracts, triggering specific functions.
- **State Management**: As users interact with the contract, its state evolves, storing new information or updating existing entries.

Before users can register their wallet tags, we need to deploy and initialize the contract, setting up the necessary structures for future interaction.

#### 3.2 Preparing for Deployment

Before deploying the contract, you need to have a working Concordium node or access to Concordium's smart contract development tools, such as:
- **Concordium Node**: You can either run your own Concordium node or use a testnet node provided by the platform.
- **Concordium Client**: The client is used to interact with the blockchain, deploy contracts, and manage transactions.
- **Development Environment**: Make sure you have Rust and Concordium's smart contract SDK set up to compile and deploy the contract.

The contract must be compiled to WebAssembly (Wasm) format before it can be deployed. The Wasm file will then be uploaded to the blockchain via the Concordium client.

#### 3.3 Compiling the Smart Contract

Once the contract is written, you need to compile it into a Wasm binary that can be deployed to Concordium. Here’s how you can do it:

1. **Navigate to the Contract Directory**: Ensure that your contract code is in a directory with the necessary dependencies, such as `Cargo.toml` configured for smart contract development.
   
2. **Compile the Contract**: Use the following command to compile your contract to Wasm:
   ```bash
   cargo concordium build
   ```

   This command generates a `.wasm` file in the `target/wasm32-unknown-unknown/release` directory, which can then be deployed to Concordium.

#### 3.4 Deploying the Smart Contract

Once the contract is compiled, it’s ready to be deployed to the blockchain. The Concordium client will handle the process of uploading the contract and executing the necessary transactions to make it available on-chain.

Here’s the basic process:

1. **Upload the Wasm File**: Use the following command to deploy the contract:
   ```bash
   concordium-client module deploy <path-to-wasm-file> --sender <sender-account> --energy <energy-limit>
   ```

   This command uploads the Wasm file and initializes the contract with the sender account.

2. **Initialize the Contract**: After the Wasm file is deployed, the contract needs to be initialized. In the case of the CIS5 wallet registry, we need to set up the `registry` and `lookup` mappings that store tags and public keys.

   The initialization function is defined as:
   ```rust
   #[init(contract = "registry")]
   fn init(_ctx: &InitContext, state_builder: &mut StateBuilder) -> InitResult<State> {
       Ok(State {
           registry: state_builder.new_map(),
           lookup: state_builder.new_map(),
       })
   }
   ```

   When the `init` function is called, it sets up an empty `registry` (for tag-to-public-key mappings) and `lookup` (for public-key-to-tag reverse lookups). These data structures are necessary for the registry to function.

3. **Command to Initialize**:
   Use the following command to initialize the contract after deployment:
   ```bash
   concordium-client contract init <module-ref> --init-function init --sender <sender-account> --energy <energy-limit>
   ```

   This command initializes the contract, setting up its initial state.

Once initialized, the contract is ready to handle registrations, lookups, and interactions from users.

#### 3.5 Contract State Setup

At initialization, the contract’s state is defined by the `State` struct:

```rust
#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct State<S = StateApi> {
    registry: StateMap<String, Registry, S>,
    lookup: StateMap<PublicKeyEd25519, String, S>,
}
```

The `registry` and `lookup` are maps that store:
- **Registry**: A mapping from a string (the tag) to a `Registry` object. The `Registry` object includes details like the public key, contract address, and provider.
  
- **Lookup**: A reverse lookup that maps a `PublicKeyEd25519` to the associated tag string.

The state is created during initialization by calling `state_builder.new_map()`, which sets up empty mappings for both `registry` and `lookup`. These mappings will be populated as users register their wallet tags through interactions with the contract.

#### 3.6 Initializing with Test Data

During the testing phase or deployment to a development environment, you may want to initialize the contract with some test data to verify its functionality. You can modify the initialization function to include a few example entries, like so:

```rust
#[init(contract = "registry")]
fn init(_ctx: &InitContext, state_builder: &mut StateBuilder) -> InitResult<State> {
    let mut registry = state_builder.new_map();
    let mut lookup = state_builder.new_map();

    // Example entry
    let test_key = PublicKeyEd25519([1; 32]); // Example public key
    let test_registry = Registry {
        public_key: test_key,
        contract_address: AccountAddress([2; 32]),
        provider: "TestProvider".to_string(),
    };

    registry.insert("example.ccd".to_string(), test_registry.clone());
    lookup.insert(test_key, "example.ccd".to_string());

    Ok(State {
        registry,
        lookup,
    })
}
```

In this example, we pre-register a tag (`example.ccd`) and its associated public key, contract address, and provider. This allows for easier testing and validation of the contract’s functionality.

#### 3.7 Finalizing Deployment

After initialization, the contract is live on the Concordium blockchain and ready for interaction. Users and other contracts can now register tags, retrieve public keys, and perform reverse lookups. Each transaction will update the contract’s state and emit events, which can be tracked for auditing purposes.

---
