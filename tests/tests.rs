use concordium_smart_contract_testing::*;
use concordium_std::{PublicKeyEd25519, SignatureEd25519};
use registry::*;
use types::{RegisterMessage, RegisterParam, Registry};

/// A test account.
const ALICE: AccountAddress = AccountAddress([0u8; 32]);
const ALICE_ADDR: Address = Address::Account(ALICE);

/// The initial balance of the ALICE test account.
const ACC_INITIAL_BALANCE: Amount = Amount::from_ccd(10_000);
/// A [`Signer`] with one set of keys, used for signing transactions.
const SIGNER: Signer = Signer::with_one_key();

/// Test that invoking the `receive` endpoint with the `false` parameter
/// succeeds in updating the contract.
#[test]
fn test_get_registry_by_tag() {
    let tag: String = "alice.ccd".into();
    let (mut chain, init, alice_public_key) = initialize_chain_and_create_tag(tag.clone());
    let sim_registry = Registry::new(
        alice_public_key,
        ContractAddress {
            index: 0,
            subindex: 0,
        },
        "AfrixLabs".into(),
    );

    // Update the contract via the `receive` entrypoint with the parameter `false`.
    let update = chain
        .contract_update(
            SIGNER,
            ALICE,
            ALICE_ADDR,
            Energy::from(10_000),
            UpdateContractPayload {
                address: init.contract_address,
                amount: Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked("registry.get_key".to_string()),
                message: OwnedParameter::from_serial(&tag).expect("Parameter within size bounds"),
            },
        )
        .expect("Update succeeds with `false` as input.");
    let registry: Registry = update.parse_return_value().expect("Deserialize `Error`");
    assert_eq!(registry.public_key, sim_registry.public_key);
    assert_eq!(registry.contract_address, sim_registry.contract_address);
    assert_eq!(registry.provider, sim_registry.provider);
}

/// Test that invoking the `receive` endpoint with the `true` parameter
/// results in the `CustomError` being thrown.
#[test]
fn test_throw_error() {
    let (mut chain, init) = initialize();

    // Update the contract via the `receive` entrypoint with the parameter `true`.
    let update = chain
        .contract_update(
            SIGNER,
            ALICE,
            ALICE_ADDR,
            Energy::from(10_000),
            UpdateContractPayload {
                address: init.contract_address,
                amount: Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked("registry.receive".to_string()),
                message: OwnedParameter::from_serial(&true).expect("Parameter within size bounds"),
            },
        )
        .expect_err("Update fails with `true` as input.");

    // Check that the contract returned `CustomError`.
    let error: errors::Error = update.parse_return_value().expect("Deserialize `Error`");
    assert_eq!(error, errors::Error::Expired);
}

/// Helper method for initializing the contract.
///
/// Does the following:
///  - Creates the [`Chain`]
///  - Creates one account, `Alice` with `10_000` CCD as the initial balance.
///  - Initializes the contract.
///  - Returns the [`Chain`] and the [`ContractInitSuccess`]
fn initialize() -> (Chain, ContractInitSuccess) {
    // Initialize the test chain.
    let mut chain = Chain::new();

    // Create the test account.
    chain.create_account(Account::new(ALICE, ACC_INITIAL_BALANCE));

    // Load the module.
    let module = module_load_v1("./dist/module.wasm.v1").expect("Module exists at path");
    // Deploy the module.
    let deployment = chain
        .module_deploy_v1(SIGNER, ALICE, module)
        .expect("Deploy valid module");

    // Initialize the contract.
    let init = chain
        .contract_init(
            SIGNER,
            ALICE,
            Energy::from(10_000),
            InitContractPayload {
                amount: Amount::zero(),
                mod_ref: deployment.module_reference,
                init_name: OwnedContractName::new_unchecked("init_registry".to_string()),
                param: OwnedParameter::empty(),
            },
        )
        .expect("Initializing contract");

    (chain, init)
}

/// Helper method for initializing the contract.
///
/// Does the following:
///  - Creates the [`Chain`]
///  - Creates one account, `Alice` with `10_000` CCD as the initial balance.
///  - Initializes the contract and create a tag for alice.
///  - Returns the [`Chain`] and the [`ContractInitSuccess`]
fn initialize_chain_and_create_tag(tag: String) -> (Chain, ContractInitSuccess, PublicKeyEd25519) {
    use ed25519_dalek::{Signer, SigningKey};

    // Initialize the test chain.
    let mut chain = Chain::new();

    // Create the test account.
    chain.create_account(Account::new(ALICE, ACC_INITIAL_BALANCE));

    // Load the module.
    let module = module_load_v1("./dist/module.wasm.v1").expect("Module exists at path");
    // Deploy the module.
    let deployment = chain
        .module_deploy_v1(SIGNER, ALICE, module)
        .expect("Deploy valid module");

    // Initialize the contract.
    let init = chain
        .contract_init(
            SIGNER,
            ALICE,
            Energy::from(10_000),
            InitContractPayload {
                amount: Amount::zero(),
                mod_ref: deployment.module_reference,
                init_name: OwnedContractName::new_unchecked("init_registry".to_string()),
                param: OwnedParameter::empty(),
            },
        )
        .expect("Initializing contract");

    let rng = &mut rand::thread_rng();

    // Construct signing key.
    let signing_key = SigningKey::generate(rng);
    let alice_public_key = PublicKeyEd25519(signing_key.verifying_key().to_bytes());
    let registry = Registry::new(
        alice_public_key,
        ContractAddress {
            index: 0,
            subindex: 0,
        },
        "AfrixLabs".into(),
    );
    let param = RegisterParam {
        tag,
        data: registry,
        expiry_time: Timestamp::from_timestamp_millis(5000),
    };
    // Get the message hash to be signed.
    let invoke = chain
        .contract_invoke(
            ALICE,
            ALICE_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount: Amount::zero(),
                address: init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked(
                    "registry.get_param_hash".to_string(),
                ),
                message: OwnedParameter::from_serial(&param)
                    .expect("Should be a valid inut parameter"),
            },
        )
        .expect("Should be able to query getCcdWithdrawMessageHash");
    let signature = signing_key.sign(&invoke.return_value);

    let message = RegisterMessage {
        signer: alice_public_key,
        signature: SignatureEd25519(signature.to_bytes()),
        message: param,
    };
    let payload = UpdateContractPayload {
        address: init.contract_address,
        amount: Amount::zero(),
        receive_name: OwnedReceiveName::new_unchecked("registry.register".to_string()),
        message: OwnedParameter::from_serial(&message).expect("Parameter within size bounds"),
    };

    chain
        .contract_update(SIGNER, ALICE, ALICE_ADDR, Energy::from(10_000), payload)
        .expect("failed to update contract");

    (chain, init, alice_public_key)
}
