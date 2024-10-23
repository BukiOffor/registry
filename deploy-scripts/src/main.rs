#![allow(unused_imports)]
pub mod deployer;
use anyhow::{bail, Context, Error};
use clap::Parser;
use concordium_rust_sdk::{
    base::contracts_common::PublicKeyEd25519,
    common::{to_bytes, types::{Amount, Timestamp}},
    smart_contracts::{
        common::{self as contracts_common},
        types::{OwnedContractName, OwnedParameter, OwnedReceiveName},
    },
    types::{
        smart_contracts::{ContractContext, InvokeContractResult, ModuleReference, WasmModule},
        transactions::{self, send::GivenEnergy, InitContractPayload},
        ContractAddress
    },
    v2::{self, BlockIdentifier},
};
use deployer::{DeployResult, Deployer, InitResult};
use registry::types::{RegisterMessage, RegisterParam, Registry};
use std::{
    io::{Cursor, Read},
    path::{Path, PathBuf},
};
use tonic::transport::ClientTlsConfig;



/// Command line flags.
#[derive(clap::Parser, Debug)]
#[clap(author, version, about)]
struct App {
    #[clap(
        long = "node",
        default_value = "https://grpc.testnet.concordium.com:20000",
        help = "V2 API of the Concordium node."
    )]
    endpoint: tonic::transport::Endpoint,
    #[clap(
        long = "account",
        help = "Path to the file containing the Concordium account keys exported from the wallet \
                (e.g. ./myPath/3PXwJYYPf6fyVb4GJquxSZU8puxrHfzc4XogdMVot8MUQK53tW.export)."
    )]
    key_file: PathBuf,
    #[clap(
        long = "module",
        help = "Path of the Concordium smart contract module. Use this flag several times if you \
                have several smart contract modules to be deployed (e.g. --module \
                ./myPath/default.wasm.v1 --module ./default2.wasm.v1)."
    )]
    module: Vec<PathBuf>,
}



/// Reads the wasm module from a given file path.
// fn get_wasm_module(file: &Path) -> Result<WasmModule, Error> {
//     let wasm_module = std::fs::read(file).context("Could not read the WASM file")?;
//     let mut cursor = Cursor::new(wasm_module);
//     let wasm_module: WasmModule = concordium_rust_sdk::common::from_bytes(&mut cursor)?;
//     Ok(wasm_module)
// }





#[tokio::main]
async fn main() -> Result<(), Error> {
    let app: App = App::parse();

    let endpoint = if app
        .endpoint
        .uri()
        .scheme()
        .map_or(false, |x| *x == concordium_rust_sdk::v2::Scheme::HTTPS)
    {
        app.endpoint
            .tls_config(ClientTlsConfig::new())
            .context("Unable to construct a TLS connection for the Concordium API.")?
    } else {
        app.endpoint
    };

    let mut concordium_client = v2::Client::new(endpoint)
        .await
        .context("Unable to establish connection to the node.")?;

    let mut deployer = Deployer::new(concordium_client.clone(), &app.key_file)?;

    // let mut modules_deployed: Vec<ModuleReference> = Vec::new();

    // for contract in app.module {
    //     let wasm_module = get_wasm_module(contract.as_path())?;

    //     let deploy_result = deployer
    //         .deploy_wasm_module(wasm_module, None)
    //         .await
    //         .context("Failed to deploy a module.")?;

    //     match deploy_result {
    //         DeployResult::ModuleDeployed(module_deploy_result) => {
    //             modules_deployed.push(module_deploy_result.module_reference)
    //         }
    //         DeployResult::ModuleExists(module_reference) => modules_deployed.push(module_reference),
    //     }
    // }

    // Write your own deployment/initialization script below. An example is given
    // here.

    // You can easily import a type from the smart contract like so:

    // let param = OwnedParameter::empty(); // Example

    // let init_method_name: &str = "init_registry"; // Example

    // let payload = InitContractPayload {
    //     init_name: OwnedContractName::new(init_method_name.into())?,
    //     amount: Amount::from_micro_ccd(0),
    //     mod_ref: modules_deployed[0],
    //     param,
    // }; // Example

    // let init_result: InitResult = deployer
    //     .init_contract(payload, None, None)
    //     .await
    //     .context("Failed to initialize the contract.")?; // Example
    

    use ed25519_dalek::{Signer, SigningKey};

    let tag: String = "buki.ccd".into();

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
        expiry_time: Timestamp::from_timestamp_millis(1_000_000_000_000_000_000),
    };
    let receive_name = OwnedReceiveName::new_unchecked("registry.get_param_hash".to_string());
    let mut context = ContractContext::new(ContractAddress { index: 10289, subindex: 0 }, receive_name);
    context.parameter = OwnedParameter::new_unchecked(contracts_common::to_bytes(&param));

    // Get the message hash to be signed.
    let invoke = concordium_client
        .invoke_instance(BlockIdentifier::Best, &context)
        .await?;
    let invoke_result = match invoke.response {
        InvokeContractResult::Success {
            return_value,
            events: _,
            used_energy: _,
        } => return_value,
        InvokeContractResult::Failure {
            return_value: _,
            reason,
            used_energy: _,
        } => {
            println!("{:?}",reason);
            bail!("Invoke failed");

        } ,
    };

    let signature = signing_key.sign(&invoke_result.unwrap().value);

    let message = RegisterMessage {
        signer: alice_public_key,
        signature: contracts_common::SignatureEd25519(signature.to_bytes()),
        message: param,
    };

    // Create a successful transaction.
    // The input parameter to the receive function is in this example a bool.
    let bytes = contracts_common::to_bytes(&message); // Example

    let update_payload = transactions::UpdateContractPayload {
        amount: Amount::from_ccd(0),
        address: ContractAddress { index: 10289, subindex: 0 },
        receive_name: OwnedReceiveName::new_unchecked("registry.register".to_string()),
        message: bytes.try_into()?,
    }; // Example

    // The transaction costs on Concordium have two components, one is based on the size of the
    // transaction and the number of signatures, and then there is a
    // transaction-specific one for executing the transaction (which is estimated with this function).
    let mut energy = deployer
        .estimate_energy(update_payload.clone())
        .await
        .context("Failed to estimate the energy.")?; // Example

    // We add 100 energy to be safe.
    energy.energy += 100; // Example

    // `GivenEnergy::Add(energy)` is the recommended helper function to handle the transaction cost automatically for the first component
    // (based on the size of the transaction and the number of signatures).
    // [GivenEnergy](https://docs.rs/concordium-rust-sdk/latest/concordium_rust_sdk/types/transactions/construct/enum.GivenEnergy.html)
    let _update_contract = deployer
        .update_contract(update_payload, Some(GivenEnergy::Add(energy)), None)
        .await
        .context("Failed to update the contract.")?; // Example

    // Write your own deployment/initialization script above. An example is given
    // here.

    Ok(())
}
// (9764,0)