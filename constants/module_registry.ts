import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('9199cb2d2b9c0b041c7533c507e0fec441f1d95777d5d00f7f59a337a79720bd');
/** Name of the smart contract supported by this client. */
export const contractName: SDK.ContractName.Type = /*#__PURE__*/ SDK.ContractName.fromStringUnchecked('registry');

/** Smart contract client for a contract instance on chain. */
class RegistryContract {
    /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
    private __nominal = true;
    /** The gRPC connection used by this client. */
    public readonly grpcClient: SDK.ConcordiumGRPCClient;
    /** The contract address used by this client. */
    public readonly contractAddress: SDK.ContractAddress.Type;
    /** Generic contract client used internally. */
    public readonly genericContract: SDK.Contract;

    constructor(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, genericContract: SDK.Contract) {
        this.grpcClient = grpcClient;
        this.contractAddress = contractAddress;
        this.genericContract = genericContract;
    }
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
export async function create(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, blockHash?: SDK.BlockHash.Type): Promise<RegistryContract> {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    await genericContract.checkOnChain({ moduleReference: moduleReference, blockHash: blockHash });
    return new RegistryContract(
        grpcClient,
        contractAddress,
        genericContract
    );
}

/**
 * Construct the `RegistryContract` for interacting with a 'registry' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {RegistryContract}
 */
export function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type): RegistryContract {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    return new RegistryContract(
        grpcClient,
        contractAddress,
        genericContract,
    );
}

/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
export function checkOnChain(contractClient: RegistryContract, blockHash?: SDK.BlockHash.Type): Promise<void> {
    return contractClient.genericContract.checkOnChain({moduleReference: moduleReference, blockHash: blockHash });
}
/** Base64 encoding of the parameter schema type for update transactions to 'get_param_hash' entrypoint of the 'registry' contract. */
const base64GetParamHashParameterSchema = 'FAADAAAAAwAAAHRhZxYCBAAAAGRhdGEUAAMAAAAKAAAAcHVibGljX2tleR4gAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMCAAAAHByb3ZpZGVyFgILAAAAZXhwaXJ5X3RpbWUN';
/** Parameter JSON type needed by the schema for update transaction for 'get_param_hash' entrypoint of the 'registry' contract. */
type GetParamHashParameterSchemaJson = {
    tag: string,
    data: {
    public_key: string,
    contract_address: SDK.ContractAddress.SchemaValue,
    provider: string,
    },
    expiry_time: SDK.Timestamp.SchemaValue,
    };
/** Parameter type for update transaction for 'get_param_hash' entrypoint of the 'registry' contract. */
export type GetParamHashParameter = {
    tag: string,
    data: {
    public_key: SDK.HexString,
    contract_address: SDK.ContractAddress.Type,
    provider: string,
    },
    expiry_time: SDK.Timestamp.Type,
    };

/**
 * Construct schema JSON representation used in update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {GetParamHashParameter} parameter The structured parameter to construct from.
 * @returns {GetParamHashParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetParamHashParameterSchemaJson(parameter: GetParamHashParameter): GetParamHashParameterSchemaJson {
    const field1 = parameter.tag;
    const field2 = parameter.data;
    const field4 = field2.public_key;
    const field5 = field2.contract_address;
    const contractAddress6 = SDK.ContractAddress.toSchemaValue(field5);
    const field7 = field2.provider;
    const named3 = {
    public_key: field4,
    contract_address: contractAddress6,
    provider: field7,
    };
    const field8 = parameter.expiry_time;
    const timestamp9 = SDK.Timestamp.toSchemaValue(field8);
    const named0 = {
    tag: field1,
    data: named3,
    expiry_time: timestamp9,
    };
    return named0;
}

/**
 * Construct Parameter type used in update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {GetParamHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetParamHashParameter(parameter: GetParamHashParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64GetParamHashParameterSchema, createGetParamHashParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {GetParamHashParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetParamHashParameterWebWallet(parameter: GetParamHashParameter) {
    return {
        parameters: createGetParamHashParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64GetParamHashParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetParamHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetParamHash(contractClient: RegistryContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetParamHashParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('get_param_hash'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createGetParamHashParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetParamHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetParamHash(contractClient: RegistryContract, parameter: GetParamHashParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('get_param_hash'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createGetParamHashParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'get_param_hash' entrypoint of the 'registry' contract. */
export type ReturnValueGetParamHash = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

/**
 * Get and parse the return value from dry-running update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetParamHash | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueGetParamHash(invokeResult: SDK.InvokeContractResult): ReturnValueGetParamHash | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'get_param_hash' entrypoint of the 'registry' contract. */
export type ErrorMessageGetParamHash = { type: 'ParseParams'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'} | { type: 'TagAlreadyExists'} | { type: 'TagDoesNotExist'} | { type: 'KeyDoesNotExist'} | { type: 'PublicKeyAlreadyExists'};

/**
 * Get and parse the error message from dry-running update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetParamHash | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageGetParamHash(invokeResult: SDK.InvokeContractResult): ErrorMessageGetParamHash | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] } | {'TagAlreadyExists' : [] } | {'TagDoesNotExist' : [] } | {'KeyDoesNotExist' : [] } | {'PublicKeyAlreadyExists' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAgcAAABFeHBpcmVkAg8AAABXcm9uZ0VudHJ5UG9pbnQCDAAAAFVuQXV0aG9yaXplZAIIAAAAT3ZlcmZsb3cCEAAAAFRhZ0FscmVhZHlFeGlzdHMCDwAAAFRhZ0RvZXNOb3RFeGlzdAIPAAAAS2V5RG9lc05vdEV4aXN0AhYAAABQdWJsaWNLZXlBbHJlYWR5RXhpc3RzAg==');
    let match12: { type: 'ParseParams'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'} | { type: 'TagAlreadyExists'} | { type: 'TagDoesNotExist'} | { type: 'KeyDoesNotExist'} | { type: 'PublicKeyAlreadyExists'};
    if ('ParseParams' in schemaJson) {
       match12 = {
           type: 'ParseParams',
       };
    } else if ('WrongSignature' in schemaJson) {
       match12 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match12 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match12 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match12 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match12 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match12 = {
           type: 'Overflow',
       };
    } else if ('TagAlreadyExists' in schemaJson) {
       match12 = {
           type: 'TagAlreadyExists',
       };
    } else if ('TagDoesNotExist' in schemaJson) {
       match12 = {
           type: 'TagDoesNotExist',
       };
    } else if ('KeyDoesNotExist' in schemaJson) {
       match12 = {
           type: 'KeyDoesNotExist',
       };
    } else if ('PublicKeyAlreadyExists' in schemaJson) {
       match12 = {
           type: 'PublicKeyAlreadyExists',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match12
}
/** Base64 encoding of the parameter schema type for update transactions to 'register' entrypoint of the 'registry' contract. */
const base64RegisterParameterSchema = 'FAADAAAABgAAAHNpZ25lch4gAAAACQAAAHNpZ25hdHVyZR5AAAAABwAAAG1lc3NhZ2UUAAMAAAADAAAAdGFnFgIEAAAAZGF0YRQAAwAAAAoAAABwdWJsaWNfa2V5HiAAAAAQAAAAY29udHJhY3RfYWRkcmVzcwwIAAAAcHJvdmlkZXIWAgsAAABleHBpcnlfdGltZQ0=';
/** Parameter JSON type needed by the schema for update transaction for 'register' entrypoint of the 'registry' contract. */
type RegisterParameterSchemaJson = {
    signer: string,
    signature: string,
    message: {
    tag: string,
    data: {
    public_key: string,
    contract_address: SDK.ContractAddress.SchemaValue,
    provider: string,
    },
    expiry_time: SDK.Timestamp.SchemaValue,
    },
    };
/** Parameter type for update transaction for 'register' entrypoint of the 'registry' contract. */
export type RegisterParameter = {
    signer: SDK.HexString,
    signature: SDK.HexString,
    message: {
    tag: string,
    data: {
    public_key: SDK.HexString,
    contract_address: SDK.ContractAddress.Type,
    provider: string,
    },
    expiry_time: SDK.Timestamp.Type,
    },
    };

/**
 * Construct schema JSON representation used in update transaction for 'register' entrypoint of the 'registry' contract.
 * @param {RegisterParameter} parameter The structured parameter to construct from.
 * @returns {RegisterParameterSchemaJson} The smart contract parameter JSON.
 */
function createRegisterParameterSchemaJson(parameter: RegisterParameter): RegisterParameterSchemaJson {
    const field25 = parameter.signer;
    const field26 = parameter.signature;
    const field27 = parameter.message;
    const field29 = field27.tag;
    const field30 = field27.data;
    const field32 = field30.public_key;
    const field33 = field30.contract_address;
    const contractAddress34 = SDK.ContractAddress.toSchemaValue(field33);
    const field35 = field30.provider;
    const named31 = {
    public_key: field32,
    contract_address: contractAddress34,
    provider: field35,
    };
    const field36 = field27.expiry_time;
    const timestamp37 = SDK.Timestamp.toSchemaValue(field36);
    const named28 = {
    tag: field29,
    data: named31,
    expiry_time: timestamp37,
    };
    const named24 = {
    signer: field25,
    signature: field26,
    message: named28,
    };
    return named24;
}

/**
 * Construct Parameter type used in update transaction for 'register' entrypoint of the 'registry' contract.
 * @param {RegisterParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createRegisterParameter(parameter: RegisterParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64RegisterParameterSchema, createRegisterParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'register' entrypoint of the 'registry' contract.
 * @param {RegisterParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createRegisterParameterWebWallet(parameter: RegisterParameter) {
    return {
        parameters: createRegisterParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64RegisterParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'register' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {RegisterParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendRegister(contractClient: RegistryContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: RegisterParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('register'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createRegisterParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'register' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {RegisterParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunRegister(contractClient: RegistryContract, parameter: RegisterParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('register'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createRegisterParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'register' entrypoint of the 'registry' contract. */
export type ErrorMessageRegister = { type: 'ParseParams'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'} | { type: 'TagAlreadyExists'} | { type: 'TagDoesNotExist'} | { type: 'KeyDoesNotExist'} | { type: 'PublicKeyAlreadyExists'};

/**
 * Get and parse the error message from dry-running update transaction for 'register' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageRegister | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageRegister(invokeResult: SDK.InvokeContractResult): ErrorMessageRegister | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] } | {'TagAlreadyExists' : [] } | {'TagDoesNotExist' : [] } | {'KeyDoesNotExist' : [] } | {'PublicKeyAlreadyExists' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAgcAAABFeHBpcmVkAg8AAABXcm9uZ0VudHJ5UG9pbnQCDAAAAFVuQXV0aG9yaXplZAIIAAAAT3ZlcmZsb3cCEAAAAFRhZ0FscmVhZHlFeGlzdHMCDwAAAFRhZ0RvZXNOb3RFeGlzdAIPAAAAS2V5RG9lc05vdEV4aXN0AhYAAABQdWJsaWNLZXlBbHJlYWR5RXhpc3RzAg==');
    let match38: { type: 'ParseParams'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'} | { type: 'TagAlreadyExists'} | { type: 'TagDoesNotExist'} | { type: 'KeyDoesNotExist'} | { type: 'PublicKeyAlreadyExists'};
    if ('ParseParams' in schemaJson) {
       match38 = {
           type: 'ParseParams',
       };
    } else if ('WrongSignature' in schemaJson) {
       match38 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match38 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match38 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match38 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match38 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match38 = {
           type: 'Overflow',
       };
    } else if ('TagAlreadyExists' in schemaJson) {
       match38 = {
           type: 'TagAlreadyExists',
       };
    } else if ('TagDoesNotExist' in schemaJson) {
       match38 = {
           type: 'TagDoesNotExist',
       };
    } else if ('KeyDoesNotExist' in schemaJson) {
       match38 = {
           type: 'KeyDoesNotExist',
       };
    } else if ('PublicKeyAlreadyExists' in schemaJson) {
       match38 = {
           type: 'PublicKeyAlreadyExists',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match38
}
/** Base64 encoding of the parameter schema type for update transactions to 'get_key' entrypoint of the 'registry' contract. */
const base64GetKeyParameterSchema = 'FgI=';
/** Parameter JSON type needed by the schema for update transaction for 'get_key' entrypoint of the 'registry' contract. */
type GetKeyParameterSchemaJson = string;
/** Parameter type for update transaction for 'get_key' entrypoint of the 'registry' contract. */
export type GetKeyParameter = string;

/**
 * Construct schema JSON representation used in update transaction for 'get_key' entrypoint of the 'registry' contract.
 * @param {GetKeyParameter} parameter The structured parameter to construct from.
 * @returns {GetKeyParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetKeyParameterSchemaJson(parameter: GetKeyParameter): GetKeyParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'get_key' entrypoint of the 'registry' contract.
 * @param {GetKeyParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetKeyParameter(parameter: GetKeyParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64GetKeyParameterSchema, createGetKeyParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'get_key' entrypoint of the 'registry' contract.
 * @param {GetKeyParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetKeyParameterWebWallet(parameter: GetKeyParameter) {
    return {
        parameters: createGetKeyParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64GetKeyParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'get_key' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetKeyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetKey(contractClient: RegistryContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetKeyParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('get_key'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createGetKeyParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'get_key' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetKeyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetKey(contractClient: RegistryContract, parameter: GetKeyParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('get_key'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createGetKeyParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'get_key' entrypoint of the 'registry' contract. */
export type ErrorMessageGetKey = { type: 'ParseParams'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'} | { type: 'TagAlreadyExists'} | { type: 'TagDoesNotExist'} | { type: 'KeyDoesNotExist'} | { type: 'PublicKeyAlreadyExists'};

/**
 * Get and parse the error message from dry-running update transaction for 'get_key' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetKey | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageGetKey(invokeResult: SDK.InvokeContractResult): ErrorMessageGetKey | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] } | {'TagAlreadyExists' : [] } | {'TagDoesNotExist' : [] } | {'KeyDoesNotExist' : [] } | {'PublicKeyAlreadyExists' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAgcAAABFeHBpcmVkAg8AAABXcm9uZ0VudHJ5UG9pbnQCDAAAAFVuQXV0aG9yaXplZAIIAAAAT3ZlcmZsb3cCEAAAAFRhZ0FscmVhZHlFeGlzdHMCDwAAAFRhZ0RvZXNOb3RFeGlzdAIPAAAAS2V5RG9lc05vdEV4aXN0AhYAAABQdWJsaWNLZXlBbHJlYWR5RXhpc3RzAg==');
    let match50: { type: 'ParseParams'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'} | { type: 'TagAlreadyExists'} | { type: 'TagDoesNotExist'} | { type: 'KeyDoesNotExist'} | { type: 'PublicKeyAlreadyExists'};
    if ('ParseParams' in schemaJson) {
       match50 = {
           type: 'ParseParams',
       };
    } else if ('WrongSignature' in schemaJson) {
       match50 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match50 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match50 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match50 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match50 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match50 = {
           type: 'Overflow',
       };
    } else if ('TagAlreadyExists' in schemaJson) {
       match50 = {
           type: 'TagAlreadyExists',
       };
    } else if ('TagDoesNotExist' in schemaJson) {
       match50 = {
           type: 'TagDoesNotExist',
       };
    } else if ('KeyDoesNotExist' in schemaJson) {
       match50 = {
           type: 'KeyDoesNotExist',
       };
    } else if ('PublicKeyAlreadyExists' in schemaJson) {
       match50 = {
           type: 'PublicKeyAlreadyExists',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match50
}
/** Base64 encoding of the parameter schema type for update transactions to 'get_tag' entrypoint of the 'registry' contract. */
const base64GetTagParameterSchema = 'HiAAAAA=';
/** Parameter JSON type needed by the schema for update transaction for 'get_tag' entrypoint of the 'registry' contract. */
type GetTagParameterSchemaJson = string;
/** Parameter type for update transaction for 'get_tag' entrypoint of the 'registry' contract. */
export type GetTagParameter = SDK.HexString;

/**
 * Construct schema JSON representation used in update transaction for 'get_tag' entrypoint of the 'registry' contract.
 * @param {GetTagParameter} parameter The structured parameter to construct from.
 * @returns {GetTagParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetTagParameterSchemaJson(parameter: GetTagParameter): GetTagParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'get_tag' entrypoint of the 'registry' contract.
 * @param {GetTagParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetTagParameter(parameter: GetTagParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64GetTagParameterSchema, createGetTagParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'get_tag' entrypoint of the 'registry' contract.
 * @param {GetTagParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetTagParameterWebWallet(parameter: GetTagParameter) {
    return {
        parameters: createGetTagParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64GetTagParameterSchema, 'base64')
        },
    }
}

/**
 * Send an update-contract transaction to the 'get_tag' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetTagParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetTag(contractClient: RegistryContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetTagParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('get_tag'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        createGetTagParameter(parameter),
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'get_tag' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetTagParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetTag(contractClient: RegistryContract, parameter: GetTagParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('get_tag'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        createGetTagParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'get_tag' entrypoint of the 'registry' contract. */
export type ErrorMessageGetTag = { type: 'ParseParams'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'} | { type: 'TagAlreadyExists'} | { type: 'TagDoesNotExist'} | { type: 'KeyDoesNotExist'} | { type: 'PublicKeyAlreadyExists'};

/**
 * Get and parse the error message from dry-running update transaction for 'get_tag' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetTag | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageGetTag(invokeResult: SDK.InvokeContractResult): ErrorMessageGetTag | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] } | {'TagAlreadyExists' : [] } | {'TagDoesNotExist' : [] } | {'KeyDoesNotExist' : [] } | {'PublicKeyAlreadyExists' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAgcAAABFeHBpcmVkAg8AAABXcm9uZ0VudHJ5UG9pbnQCDAAAAFVuQXV0aG9yaXplZAIIAAAAT3ZlcmZsb3cCEAAAAFRhZ0FscmVhZHlFeGlzdHMCDwAAAFRhZ0RvZXNOb3RFeGlzdAIPAAAAS2V5RG9lc05vdEV4aXN0AhYAAABQdWJsaWNLZXlBbHJlYWR5RXhpc3RzAg==');
    let match62: { type: 'ParseParams'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'} | { type: 'TagAlreadyExists'} | { type: 'TagDoesNotExist'} | { type: 'KeyDoesNotExist'} | { type: 'PublicKeyAlreadyExists'};
    if ('ParseParams' in schemaJson) {
       match62 = {
           type: 'ParseParams',
       };
    } else if ('WrongSignature' in schemaJson) {
       match62 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match62 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match62 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match62 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match62 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match62 = {
           type: 'Overflow',
       };
    } else if ('TagAlreadyExists' in schemaJson) {
       match62 = {
           type: 'TagAlreadyExists',
       };
    } else if ('TagDoesNotExist' in schemaJson) {
       match62 = {
           type: 'TagDoesNotExist',
       };
    } else if ('KeyDoesNotExist' in schemaJson) {
       match62 = {
           type: 'KeyDoesNotExist',
       };
    } else if ('PublicKeyAlreadyExists' in schemaJson) {
       match62 = {
           type: 'PublicKeyAlreadyExists',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match62
}
