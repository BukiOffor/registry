import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export declare const moduleReference: SDK.ModuleReference.Type;
/** Name of the smart contract supported by this client. */
export declare const contractName: SDK.ContractName.Type;
/** Smart contract client for a contract instance on chain. */
declare class RegistryContract {
    /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
    private __nominal;
    /** The gRPC connection used by this client. */
    readonly grpcClient: SDK.ConcordiumGRPCClient;
    /** The contract address used by this client. */
    readonly contractAddress: SDK.ContractAddress.Type;
    /** Generic contract client used internally. */
    readonly genericContract: SDK.Contract;
    constructor(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, genericContract: SDK.Contract);
}
/** Smart contract client for a contract instance on chain. */
export type Type = RegistryContract;
/**
 * Construct an instance of `RegistryContract` for interacting with a 'registry' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {RegistryContract}
 */
export declare function create(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, blockHash?: SDK.BlockHash.Type): Promise<RegistryContract>;
/**
 * Construct the `RegistryContract` for interacting with a 'registry' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {RegistryContract}
 */
export declare function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type): RegistryContract;
/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
export declare function checkOnChain(contractClient: RegistryContract, blockHash?: SDK.BlockHash.Type): Promise<void>;
/** Parameter JSON type needed by the schema for update transaction for 'get_param_hash' entrypoint of the 'registry' contract. */
type GetParamHashParameterSchemaJson = {
    tag: string;
    data: {
        public_key: string;
        contract_address: SDK.ContractAddress.SchemaValue;
        provider: string;
    };
    expiry_time: SDK.Timestamp.SchemaValue;
};
/** Parameter type for update transaction for 'get_param_hash' entrypoint of the 'registry' contract. */
export type GetParamHashParameter = {
    tag: string;
    data: {
        public_key: SDK.HexString;
        contract_address: SDK.ContractAddress.Type;
        provider: string;
    };
    expiry_time: SDK.Timestamp.Type;
};
/**
 * Construct Parameter type used in update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {GetParamHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createGetParamHashParameter(parameter: GetParamHashParameter): SDK.Parameter.Type;
/**
 * Construct WebWallet parameter type used in update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {GetParamHashParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export declare function createGetParamHashParameterWebWallet(parameter: GetParamHashParameter): {
    parameters: GetParamHashParameterSchemaJson;
    schema: {
        type: "TypeSchema";
        value: import("buffer").Buffer;
    };
};
/**
 * Send an update-contract transaction to the 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetParamHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendGetParamHash(contractClient: RegistryContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetParamHashParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetParamHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunGetParamHash(contractClient: RegistryContract, parameter: GetParamHashParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Return value for dry-running update transaction for 'get_param_hash' entrypoint of the 'registry' contract. */
export type ReturnValueGetParamHash = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
/**
 * Get and parse the return value from dry-running update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetParamHash | undefined} The structured return value or undefined if result was not a success.
 */
export declare function parseReturnValueGetParamHash(invokeResult: SDK.InvokeContractResult): ReturnValueGetParamHash | undefined;
/** Error message for dry-running update transaction for 'get_param_hash' entrypoint of the 'registry' contract. */
export type ErrorMessageGetParamHash = {
    type: 'ParseParams';
} | {
    type: 'WrongSignature';
} | {
    type: 'NonceMismatch';
} | {
    type: 'Expired';
} | {
    type: 'WrongEntryPoint';
} | {
    type: 'UnAuthorized';
} | {
    type: 'Overflow';
} | {
    type: 'TagAlreadyExists';
} | {
    type: 'TagDoesNotExist';
} | {
    type: 'KeyDoesNotExist';
} | {
    type: 'PublicKeyAlreadyExists';
};
/**
 * Get and parse the error message from dry-running update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetParamHash | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageGetParamHash(invokeResult: SDK.InvokeContractResult): ErrorMessageGetParamHash | undefined;
/** Parameter JSON type needed by the schema for update transaction for 'register' entrypoint of the 'registry' contract. */
type RegisterParameterSchemaJson = {
    signer: string;
    signature: string;
    message: {
        tag: string;
        data: {
            public_key: string;
            contract_address: SDK.ContractAddress.SchemaValue;
            provider: string;
        };
        expiry_time: SDK.Timestamp.SchemaValue;
    };
};
/** Parameter type for update transaction for 'register' entrypoint of the 'registry' contract. */
export type RegisterParameter = {
    signer: SDK.HexString;
    signature: SDK.HexString;
    message: {
        tag: string;
        data: {
            public_key: SDK.HexString;
            contract_address: SDK.ContractAddress.Type;
            provider: string;
        };
        expiry_time: SDK.Timestamp.Type;
    };
};
/**
 * Construct Parameter type used in update transaction for 'register' entrypoint of the 'registry' contract.
 * @param {RegisterParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createRegisterParameter(parameter: RegisterParameter): SDK.Parameter.Type;
/**
 * Construct WebWallet parameter type used in update transaction for 'register' entrypoint of the 'registry' contract.
 * @param {RegisterParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export declare function createRegisterParameterWebWallet(parameter: RegisterParameter): {
    parameters: RegisterParameterSchemaJson;
    schema: {
        type: "TypeSchema";
        value: import("buffer").Buffer;
    };
};
/**
 * Send an update-contract transaction to the 'register' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {RegisterParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendRegister(contractClient: RegistryContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: RegisterParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'register' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {RegisterParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunRegister(contractClient: RegistryContract, parameter: RegisterParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Error message for dry-running update transaction for 'register' entrypoint of the 'registry' contract. */
export type ErrorMessageRegister = {
    type: 'ParseParams';
} | {
    type: 'WrongSignature';
} | {
    type: 'NonceMismatch';
} | {
    type: 'Expired';
} | {
    type: 'WrongEntryPoint';
} | {
    type: 'UnAuthorized';
} | {
    type: 'Overflow';
} | {
    type: 'TagAlreadyExists';
} | {
    type: 'TagDoesNotExist';
} | {
    type: 'KeyDoesNotExist';
} | {
    type: 'PublicKeyAlreadyExists';
};
/**
 * Get and parse the error message from dry-running update transaction for 'register' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageRegister | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageRegister(invokeResult: SDK.InvokeContractResult): ErrorMessageRegister | undefined;
/** Parameter type for update transaction for 'get_key' entrypoint of the 'registry' contract. */
export type GetKeyParameter = string;
/**
 * Construct Parameter type used in update transaction for 'get_key' entrypoint of the 'registry' contract.
 * @param {GetKeyParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createGetKeyParameter(parameter: GetKeyParameter): SDK.Parameter.Type;
/**
 * Construct WebWallet parameter type used in update transaction for 'get_key' entrypoint of the 'registry' contract.
 * @param {GetKeyParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export declare function createGetKeyParameterWebWallet(parameter: GetKeyParameter): {
    parameters: string;
    schema: {
        type: "TypeSchema";
        value: import("buffer").Buffer;
    };
};
/**
 * Send an update-contract transaction to the 'get_key' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetKeyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendGetKey(contractClient: RegistryContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetKeyParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'get_key' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetKeyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunGetKey(contractClient: RegistryContract, parameter: GetKeyParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Error message for dry-running update transaction for 'get_key' entrypoint of the 'registry' contract. */
export type ErrorMessageGetKey = {
    type: 'ParseParams';
} | {
    type: 'WrongSignature';
} | {
    type: 'NonceMismatch';
} | {
    type: 'Expired';
} | {
    type: 'WrongEntryPoint';
} | {
    type: 'UnAuthorized';
} | {
    type: 'Overflow';
} | {
    type: 'TagAlreadyExists';
} | {
    type: 'TagDoesNotExist';
} | {
    type: 'KeyDoesNotExist';
} | {
    type: 'PublicKeyAlreadyExists';
};
/**
 * Get and parse the error message from dry-running update transaction for 'get_key' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetKey | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageGetKey(invokeResult: SDK.InvokeContractResult): ErrorMessageGetKey | undefined;
/** Parameter type for update transaction for 'get_tag' entrypoint of the 'registry' contract. */
export type GetTagParameter = SDK.HexString;
/**
 * Construct Parameter type used in update transaction for 'get_tag' entrypoint of the 'registry' contract.
 * @param {GetTagParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export declare function createGetTagParameter(parameter: GetTagParameter): SDK.Parameter.Type;
/**
 * Construct WebWallet parameter type used in update transaction for 'get_tag' entrypoint of the 'registry' contract.
 * @param {GetTagParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export declare function createGetTagParameterWebWallet(parameter: GetTagParameter): {
    parameters: string;
    schema: {
        type: "TypeSchema";
        value: import("buffer").Buffer;
    };
};
/**
 * Send an update-contract transaction to the 'get_tag' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetTagParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export declare function sendGetTag(contractClient: RegistryContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetTagParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type>;
/**
 * Dry-run an update-contract transaction to the 'get_tag' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetTagParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export declare function dryRunGetTag(contractClient: RegistryContract, parameter: GetTagParameter, invokeMetadata?: SDK.ContractInvokeMetadata, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult>;
/** Error message for dry-running update transaction for 'get_tag' entrypoint of the 'registry' contract. */
export type ErrorMessageGetTag = {
    type: 'ParseParams';
} | {
    type: 'WrongSignature';
} | {
    type: 'NonceMismatch';
} | {
    type: 'Expired';
} | {
    type: 'WrongEntryPoint';
} | {
    type: 'UnAuthorized';
} | {
    type: 'Overflow';
} | {
    type: 'TagAlreadyExists';
} | {
    type: 'TagDoesNotExist';
} | {
    type: 'KeyDoesNotExist';
} | {
    type: 'PublicKeyAlreadyExists';
};
/**
 * Get and parse the error message from dry-running update transaction for 'get_tag' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetTag | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export declare function parseErrorMessageGetTag(invokeResult: SDK.InvokeContractResult): ErrorMessageGetTag | undefined;
export {};
