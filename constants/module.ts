import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('9199cb2d2b9c0b041c7533c507e0fec441f1d95777d5d00f7f59a337a79720bd');

/** Client for an on-chain smart contract module with module reference '9199cb2d2b9c0b041c7533c507e0fec441f1d95777d5d00f7f59a337a79720bd', can be used for instantiating new smart contract instances. */
class ModuleModule {
    /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
    private __nominal = true;
    /** Generic module client used internally. */
    public readonly internalModuleClient: SDK.ModuleClient.Type;

    /** Constructor is only meant to be used internally in this module. Use functions such as `create` or `createUnchecked` for construction. */
    constructor(internalModuleClient: SDK.ModuleClient.Type) {
        this.internalModuleClient = internalModuleClient;
    }
}

/** Client for an on-chain smart contract module with module reference '9199cb2d2b9c0b041c7533c507e0fec441f1d95777d5d00f7f59a337a79720bd', can be used for instantiating new smart contract instances. */
export type Type = ModuleModule;

/**
 * Construct a ModuleModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {ModuleModule} A module client ensured to be deployed on chain.
 */
export async function create(grpcClient: SDK.ConcordiumGRPCClient): Promise<ModuleModule> {
    const moduleClient = await SDK.ModuleClient.create(grpcClient, moduleReference);
    return new ModuleModule(moduleClient);
}

/**
 * Construct a ModuleModule client for interacting with a smart contract module on chain.
 * It is up to the caller to ensure the module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @returns {ModuleModule}
 */
export function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient): ModuleModule {
    const moduleClient = SDK.ModuleClient.createUnchecked(grpcClient, moduleReference);
    return new ModuleModule(moduleClient);
}

/**
 * Construct a ModuleModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {ModuleModule} moduleClient - The client of the on-chain smart contract module with referecence '9199cb2d2b9c0b041c7533c507e0fec441f1d95777d5d00f7f59a337a79720bd'.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {ModuleModule} A module client ensured to be deployed on chain.
 */
export function checkOnChain(moduleClient: ModuleModule): Promise<void> {
    return SDK.ModuleClient.checkOnChain(moduleClient.internalModuleClient);
}

/**
 * Get the module source of the deployed smart contract module.
 * @param {ModuleModule} moduleClient - The client of the on-chain smart contract module with referecence '9199cb2d2b9c0b041c7533c507e0fec441f1d95777d5d00f7f59a337a79720bd'.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or module not found.
 * @returns {SDK.VersionedModuleSource} Module source of the deployed smart contract module.
 */
export function getModuleSource(moduleClient: ModuleModule): Promise<SDK.VersionedModuleSource> {
    return SDK.ModuleClient.getModuleSource(moduleClient.internalModuleClient);
}
/** Parameter type transaction for instantiating a new 'registry' smart contract instance. */
export type RegistryParameter = SDK.Parameter.Type;

/**
 * Send transaction for instantiating a new 'registry' smart contract instance.
 * @param {ModuleModule} moduleClient - The client of the on-chain smart contract module with referecence '9199cb2d2b9c0b041c7533c507e0fec441f1d95777d5d00f7f59a337a79720bd'.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract module.
 * @param {RegistryParameter} parameter - Parameter to provide as part of the transaction for the instantiation of a new smart contract contract.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If failing to communicate with the concordium node.
 * @returns {SDK.TransactionHash.Type}
 */
export function instantiateRegistry(moduleClient: ModuleModule, transactionMetadata: SDK.ContractTransactionMetadata, parameter: RegistryParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return SDK.ModuleClient.createAndSendInitTransaction(
        moduleClient.internalModuleClient,
        SDK.ContractName.fromStringUnchecked('registry'),
        transactionMetadata,
        parameter,
        signer
    );
}
