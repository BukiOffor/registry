"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseErrorMessageGetTag = exports.dryRunGetTag = exports.sendGetTag = exports.createGetTagParameterWebWallet = exports.createGetTagParameter = exports.parseErrorMessageGetKey = exports.dryRunGetKey = exports.sendGetKey = exports.createGetKeyParameterWebWallet = exports.createGetKeyParameter = exports.parseErrorMessageRegister = exports.dryRunRegister = exports.sendRegister = exports.createRegisterParameterWebWallet = exports.createRegisterParameter = exports.parseErrorMessageGetParamHash = exports.parseReturnValueGetParamHash = exports.dryRunGetParamHash = exports.sendGetParamHash = exports.createGetParamHashParameterWebWallet = exports.createGetParamHashParameter = exports.checkOnChain = exports.createUnchecked = exports.create = exports.contractName = exports.moduleReference = void 0;
var SDK = require("@concordium/web-sdk");
/** The reference of the smart contract module supported by the provided client. */
exports.moduleReference = SDK.ModuleReference.fromHexString('9199cb2d2b9c0b041c7533c507e0fec441f1d95777d5d00f7f59a337a79720bd');
/** Name of the smart contract supported by this client. */
exports.contractName = SDK.ContractName.fromStringUnchecked('registry');
/** Smart contract client for a contract instance on chain. */
var RegistryContract = /** @class */ (function () {
    function RegistryContract(grpcClient, contractAddress, genericContract) {
        /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
        this.__nominal = true;
        this.grpcClient = grpcClient;
        this.contractAddress = contractAddress;
        this.genericContract = genericContract;
    }
    return RegistryContract;
}());
/**
 * Construct an instance of `RegistryContract` for interacting with a 'registry' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {RegistryContract}
 */
function create(grpcClient, contractAddress, blockHash) {
    return __awaiter(this, void 0, void 0, function () {
        var genericContract;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    genericContract = new SDK.Contract(grpcClient, contractAddress, exports.contractName);
                    return [4 /*yield*/, genericContract.checkOnChain({ moduleReference: exports.moduleReference, blockHash: blockHash })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new RegistryContract(grpcClient, contractAddress, genericContract)];
            }
        });
    });
}
exports.create = create;
/**
 * Construct the `RegistryContract` for interacting with a 'registry' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {RegistryContract}
 */
function createUnchecked(grpcClient, contractAddress) {
    var genericContract = new SDK.Contract(grpcClient, contractAddress, exports.contractName);
    return new RegistryContract(grpcClient, contractAddress, genericContract);
}
exports.createUnchecked = createUnchecked;
/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
function checkOnChain(contractClient, blockHash) {
    return contractClient.genericContract.checkOnChain({ moduleReference: exports.moduleReference, blockHash: blockHash });
}
exports.checkOnChain = checkOnChain;
/** Base64 encoding of the parameter schema type for update transactions to 'get_param_hash' entrypoint of the 'registry' contract. */
var base64GetParamHashParameterSchema = 'FAADAAAAAwAAAHRhZxYCBAAAAGRhdGEUAAMAAAAKAAAAcHVibGljX2tleR4gAAAAEAAAAGNvbnRyYWN0X2FkZHJlc3MMCAAAAHByb3ZpZGVyFgILAAAAZXhwaXJ5X3RpbWUN';
/**
 * Construct schema JSON representation used in update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {GetParamHashParameter} parameter The structured parameter to construct from.
 * @returns {GetParamHashParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetParamHashParameterSchemaJson(parameter) {
    var field1 = parameter.tag;
    var field2 = parameter.data;
    var field4 = field2.public_key;
    var field5 = field2.contract_address;
    var contractAddress6 = SDK.ContractAddress.toSchemaValue(field5);
    var field7 = field2.provider;
    var named3 = {
        public_key: field4,
        contract_address: contractAddress6,
        provider: field7,
    };
    var field8 = parameter.expiry_time;
    var timestamp9 = SDK.Timestamp.toSchemaValue(field8);
    var named0 = {
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
function createGetParamHashParameter(parameter) {
    return SDK.Parameter.fromBase64SchemaType(base64GetParamHashParameterSchema, createGetParamHashParameterSchemaJson(parameter));
}
exports.createGetParamHashParameter = createGetParamHashParameter;
/**
 * Construct WebWallet parameter type used in update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {GetParamHashParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
function createGetParamHashParameterWebWallet(parameter) {
    return {
        parameters: createGetParamHashParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema',
            value: SDK.toBuffer(base64GetParamHashParameterSchema, 'base64')
        },
    };
}
exports.createGetParamHashParameterWebWallet = createGetParamHashParameterWebWallet;
/**
 * Send an update-contract transaction to the 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetParamHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendGetParamHash(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('get_param_hash'), SDK.Parameter.toBuffer, transactionMetadata, createGetParamHashParameter(parameter), signer);
}
exports.sendGetParamHash = sendGetParamHash;
/**
 * Dry-run an update-contract transaction to the 'get_param_hash' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetParamHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunGetParamHash(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('get_param_hash'), invokeMetadata, SDK.Parameter.toBuffer, createGetParamHashParameter(parameter), blockHash);
}
exports.dryRunGetParamHash = dryRunGetParamHash;
/**
 * Get and parse the return value from dry-running update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetParamHash | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueGetParamHash(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}
exports.parseReturnValueGetParamHash = parseReturnValueGetParamHash;
/**
 * Get and parse the error message from dry-running update transaction for 'get_param_hash' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetParamHash | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageGetParamHash(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAgcAAABFeHBpcmVkAg8AAABXcm9uZ0VudHJ5UG9pbnQCDAAAAFVuQXV0aG9yaXplZAIIAAAAT3ZlcmZsb3cCEAAAAFRhZ0FscmVhZHlFeGlzdHMCDwAAAFRhZ0RvZXNOb3RFeGlzdAIPAAAAS2V5RG9lc05vdEV4aXN0AhYAAABQdWJsaWNLZXlBbHJlYWR5RXhpc3RzAg==');
    var match12;
    if ('ParseParams' in schemaJson) {
        match12 = {
            type: 'ParseParams',
        };
    }
    else if ('WrongSignature' in schemaJson) {
        match12 = {
            type: 'WrongSignature',
        };
    }
    else if ('NonceMismatch' in schemaJson) {
        match12 = {
            type: 'NonceMismatch',
        };
    }
    else if ('Expired' in schemaJson) {
        match12 = {
            type: 'Expired',
        };
    }
    else if ('WrongEntryPoint' in schemaJson) {
        match12 = {
            type: 'WrongEntryPoint',
        };
    }
    else if ('UnAuthorized' in schemaJson) {
        match12 = {
            type: 'UnAuthorized',
        };
    }
    else if ('Overflow' in schemaJson) {
        match12 = {
            type: 'Overflow',
        };
    }
    else if ('TagAlreadyExists' in schemaJson) {
        match12 = {
            type: 'TagAlreadyExists',
        };
    }
    else if ('TagDoesNotExist' in schemaJson) {
        match12 = {
            type: 'TagDoesNotExist',
        };
    }
    else if ('KeyDoesNotExist' in schemaJson) {
        match12 = {
            type: 'KeyDoesNotExist',
        };
    }
    else if ('PublicKeyAlreadyExists' in schemaJson) {
        match12 = {
            type: 'PublicKeyAlreadyExists',
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match12;
}
exports.parseErrorMessageGetParamHash = parseErrorMessageGetParamHash;
/** Base64 encoding of the parameter schema type for update transactions to 'register' entrypoint of the 'registry' contract. */
var base64RegisterParameterSchema = 'FAADAAAABgAAAHNpZ25lch4gAAAACQAAAHNpZ25hdHVyZR5AAAAABwAAAG1lc3NhZ2UUAAMAAAADAAAAdGFnFgIEAAAAZGF0YRQAAwAAAAoAAABwdWJsaWNfa2V5HiAAAAAQAAAAY29udHJhY3RfYWRkcmVzcwwIAAAAcHJvdmlkZXIWAgsAAABleHBpcnlfdGltZQ0=';
/**
 * Construct schema JSON representation used in update transaction for 'register' entrypoint of the 'registry' contract.
 * @param {RegisterParameter} parameter The structured parameter to construct from.
 * @returns {RegisterParameterSchemaJson} The smart contract parameter JSON.
 */
function createRegisterParameterSchemaJson(parameter) {
    var field25 = parameter.signer;
    var field26 = parameter.signature;
    var field27 = parameter.message;
    var field29 = field27.tag;
    var field30 = field27.data;
    var field32 = field30.public_key;
    var field33 = field30.contract_address;
    var contractAddress34 = SDK.ContractAddress.toSchemaValue(field33);
    var field35 = field30.provider;
    var named31 = {
        public_key: field32,
        contract_address: contractAddress34,
        provider: field35,
    };
    var field36 = field27.expiry_time;
    var timestamp37 = SDK.Timestamp.toSchemaValue(field36);
    var named28 = {
        tag: field29,
        data: named31,
        expiry_time: timestamp37,
    };
    var named24 = {
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
function createRegisterParameter(parameter) {
    return SDK.Parameter.fromBase64SchemaType(base64RegisterParameterSchema, createRegisterParameterSchemaJson(parameter));
}
exports.createRegisterParameter = createRegisterParameter;
/**
 * Construct WebWallet parameter type used in update transaction for 'register' entrypoint of the 'registry' contract.
 * @param {RegisterParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
function createRegisterParameterWebWallet(parameter) {
    return {
        parameters: createRegisterParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema',
            value: SDK.toBuffer(base64RegisterParameterSchema, 'base64')
        },
    };
}
exports.createRegisterParameterWebWallet = createRegisterParameterWebWallet;
/**
 * Send an update-contract transaction to the 'register' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {RegisterParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendRegister(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('register'), SDK.Parameter.toBuffer, transactionMetadata, createRegisterParameter(parameter), signer);
}
exports.sendRegister = sendRegister;
/**
 * Dry-run an update-contract transaction to the 'register' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {RegisterParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunRegister(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('register'), invokeMetadata, SDK.Parameter.toBuffer, createRegisterParameter(parameter), blockHash);
}
exports.dryRunRegister = dryRunRegister;
/**
 * Get and parse the error message from dry-running update transaction for 'register' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageRegister | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageRegister(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAgcAAABFeHBpcmVkAg8AAABXcm9uZ0VudHJ5UG9pbnQCDAAAAFVuQXV0aG9yaXplZAIIAAAAT3ZlcmZsb3cCEAAAAFRhZ0FscmVhZHlFeGlzdHMCDwAAAFRhZ0RvZXNOb3RFeGlzdAIPAAAAS2V5RG9lc05vdEV4aXN0AhYAAABQdWJsaWNLZXlBbHJlYWR5RXhpc3RzAg==');
    var match38;
    if ('ParseParams' in schemaJson) {
        match38 = {
            type: 'ParseParams',
        };
    }
    else if ('WrongSignature' in schemaJson) {
        match38 = {
            type: 'WrongSignature',
        };
    }
    else if ('NonceMismatch' in schemaJson) {
        match38 = {
            type: 'NonceMismatch',
        };
    }
    else if ('Expired' in schemaJson) {
        match38 = {
            type: 'Expired',
        };
    }
    else if ('WrongEntryPoint' in schemaJson) {
        match38 = {
            type: 'WrongEntryPoint',
        };
    }
    else if ('UnAuthorized' in schemaJson) {
        match38 = {
            type: 'UnAuthorized',
        };
    }
    else if ('Overflow' in schemaJson) {
        match38 = {
            type: 'Overflow',
        };
    }
    else if ('TagAlreadyExists' in schemaJson) {
        match38 = {
            type: 'TagAlreadyExists',
        };
    }
    else if ('TagDoesNotExist' in schemaJson) {
        match38 = {
            type: 'TagDoesNotExist',
        };
    }
    else if ('KeyDoesNotExist' in schemaJson) {
        match38 = {
            type: 'KeyDoesNotExist',
        };
    }
    else if ('PublicKeyAlreadyExists' in schemaJson) {
        match38 = {
            type: 'PublicKeyAlreadyExists',
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match38;
}
exports.parseErrorMessageRegister = parseErrorMessageRegister;
/** Base64 encoding of the parameter schema type for update transactions to 'get_key' entrypoint of the 'registry' contract. */
var base64GetKeyParameterSchema = 'FgI=';
/**
 * Construct schema JSON representation used in update transaction for 'get_key' entrypoint of the 'registry' contract.
 * @param {GetKeyParameter} parameter The structured parameter to construct from.
 * @returns {GetKeyParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetKeyParameterSchemaJson(parameter) {
    return parameter;
}
/**
 * Construct Parameter type used in update transaction for 'get_key' entrypoint of the 'registry' contract.
 * @param {GetKeyParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createGetKeyParameter(parameter) {
    return SDK.Parameter.fromBase64SchemaType(base64GetKeyParameterSchema, createGetKeyParameterSchemaJson(parameter));
}
exports.createGetKeyParameter = createGetKeyParameter;
/**
 * Construct WebWallet parameter type used in update transaction for 'get_key' entrypoint of the 'registry' contract.
 * @param {GetKeyParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
function createGetKeyParameterWebWallet(parameter) {
    return {
        parameters: createGetKeyParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema',
            value: SDK.toBuffer(base64GetKeyParameterSchema, 'base64')
        },
    };
}
exports.createGetKeyParameterWebWallet = createGetKeyParameterWebWallet;
/**
 * Send an update-contract transaction to the 'get_key' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetKeyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendGetKey(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('get_key'), SDK.Parameter.toBuffer, transactionMetadata, createGetKeyParameter(parameter), signer);
}
exports.sendGetKey = sendGetKey;
/**
 * Dry-run an update-contract transaction to the 'get_key' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetKeyParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunGetKey(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('get_key'), invokeMetadata, SDK.Parameter.toBuffer, createGetKeyParameter(parameter), blockHash);
}
exports.dryRunGetKey = dryRunGetKey;
/**
 * Get and parse the error message from dry-running update transaction for 'get_key' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetKey | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageGetKey(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAgcAAABFeHBpcmVkAg8AAABXcm9uZ0VudHJ5UG9pbnQCDAAAAFVuQXV0aG9yaXplZAIIAAAAT3ZlcmZsb3cCEAAAAFRhZ0FscmVhZHlFeGlzdHMCDwAAAFRhZ0RvZXNOb3RFeGlzdAIPAAAAS2V5RG9lc05vdEV4aXN0AhYAAABQdWJsaWNLZXlBbHJlYWR5RXhpc3RzAg==');
    var match50;
    if ('ParseParams' in schemaJson) {
        match50 = {
            type: 'ParseParams',
        };
    }
    else if ('WrongSignature' in schemaJson) {
        match50 = {
            type: 'WrongSignature',
        };
    }
    else if ('NonceMismatch' in schemaJson) {
        match50 = {
            type: 'NonceMismatch',
        };
    }
    else if ('Expired' in schemaJson) {
        match50 = {
            type: 'Expired',
        };
    }
    else if ('WrongEntryPoint' in schemaJson) {
        match50 = {
            type: 'WrongEntryPoint',
        };
    }
    else if ('UnAuthorized' in schemaJson) {
        match50 = {
            type: 'UnAuthorized',
        };
    }
    else if ('Overflow' in schemaJson) {
        match50 = {
            type: 'Overflow',
        };
    }
    else if ('TagAlreadyExists' in schemaJson) {
        match50 = {
            type: 'TagAlreadyExists',
        };
    }
    else if ('TagDoesNotExist' in schemaJson) {
        match50 = {
            type: 'TagDoesNotExist',
        };
    }
    else if ('KeyDoesNotExist' in schemaJson) {
        match50 = {
            type: 'KeyDoesNotExist',
        };
    }
    else if ('PublicKeyAlreadyExists' in schemaJson) {
        match50 = {
            type: 'PublicKeyAlreadyExists',
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match50;
}
exports.parseErrorMessageGetKey = parseErrorMessageGetKey;
/** Base64 encoding of the parameter schema type for update transactions to 'get_tag' entrypoint of the 'registry' contract. */
var base64GetTagParameterSchema = 'HiAAAAA=';
/**
 * Construct schema JSON representation used in update transaction for 'get_tag' entrypoint of the 'registry' contract.
 * @param {GetTagParameter} parameter The structured parameter to construct from.
 * @returns {GetTagParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetTagParameterSchemaJson(parameter) {
    return parameter;
}
/**
 * Construct Parameter type used in update transaction for 'get_tag' entrypoint of the 'registry' contract.
 * @param {GetTagParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createGetTagParameter(parameter) {
    return SDK.Parameter.fromBase64SchemaType(base64GetTagParameterSchema, createGetTagParameterSchemaJson(parameter));
}
exports.createGetTagParameter = createGetTagParameter;
/**
 * Construct WebWallet parameter type used in update transaction for 'get_tag' entrypoint of the 'registry' contract.
 * @param {GetTagParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
function createGetTagParameterWebWallet(parameter) {
    return {
        parameters: createGetTagParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema',
            value: SDK.toBuffer(base64GetTagParameterSchema, 'base64')
        },
    };
}
exports.createGetTagParameterWebWallet = createGetTagParameterWebWallet;
/**
 * Send an update-contract transaction to the 'get_tag' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetTagParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendGetTag(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('get_tag'), SDK.Parameter.toBuffer, transactionMetadata, createGetTagParameter(parameter), signer);
}
exports.sendGetTag = sendGetTag;
/**
 * Dry-run an update-contract transaction to the 'get_tag' entrypoint of the 'registry' contract.
 * @param {RegistryContract} contractClient The client for a 'registry' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetTagParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunGetTag(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('get_tag'), invokeMetadata, SDK.Parameter.toBuffer, createGetTagParameter(parameter), blockHash);
}
exports.dryRunGetTag = dryRunGetTag;
/**
 * Get and parse the error message from dry-running update transaction for 'get_tag' entrypoint of the 'registry' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetTag | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageGetTag(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCDgAAAFdyb25nU2lnbmF0dXJlAg0AAABOb25jZU1pc21hdGNoAgcAAABFeHBpcmVkAg8AAABXcm9uZ0VudHJ5UG9pbnQCDAAAAFVuQXV0aG9yaXplZAIIAAAAT3ZlcmZsb3cCEAAAAFRhZ0FscmVhZHlFeGlzdHMCDwAAAFRhZ0RvZXNOb3RFeGlzdAIPAAAAS2V5RG9lc05vdEV4aXN0AhYAAABQdWJsaWNLZXlBbHJlYWR5RXhpc3RzAg==');
    var match62;
    if ('ParseParams' in schemaJson) {
        match62 = {
            type: 'ParseParams',
        };
    }
    else if ('WrongSignature' in schemaJson) {
        match62 = {
            type: 'WrongSignature',
        };
    }
    else if ('NonceMismatch' in schemaJson) {
        match62 = {
            type: 'NonceMismatch',
        };
    }
    else if ('Expired' in schemaJson) {
        match62 = {
            type: 'Expired',
        };
    }
    else if ('WrongEntryPoint' in schemaJson) {
        match62 = {
            type: 'WrongEntryPoint',
        };
    }
    else if ('UnAuthorized' in schemaJson) {
        match62 = {
            type: 'UnAuthorized',
        };
    }
    else if ('Overflow' in schemaJson) {
        match62 = {
            type: 'Overflow',
        };
    }
    else if ('TagAlreadyExists' in schemaJson) {
        match62 = {
            type: 'TagAlreadyExists',
        };
    }
    else if ('TagDoesNotExist' in schemaJson) {
        match62 = {
            type: 'TagDoesNotExist',
        };
    }
    else if ('KeyDoesNotExist' in schemaJson) {
        match62 = {
            type: 'KeyDoesNotExist',
        };
    }
    else if ('PublicKeyAlreadyExists' in schemaJson) {
        match62 = {
            type: 'PublicKeyAlreadyExists',
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match62;
}
exports.parseErrorMessageGetTag = parseErrorMessageGetTag;
