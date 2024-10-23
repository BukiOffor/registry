import {
    ContractAddress,
    ConcordiumGRPCWebClient, Timestamp, AccountAddress,
    CcdAmount, Energy, AccountSigner,
    buildBasicAccountSigner,
    ContractTransactionMetadata,
    HexString,
} from "@concordium/web-sdk";
import * as Registry from "../constants/module_registry"

export class RegistryClass {
    private contractAddress: number;
    private grpc: ConcordiumGRPCWebClient;
    private signer: AccountSigner;
    private name: string

    constructor(contractAddress: number, privateKey:HexString) {
        this.contractAddress = contractAddress;
        this.grpc = new ConcordiumGRPCWebClient('http://node.testnet.concordium.com', 20000)
        this.signer = buildBasicAccountSigner(privateKey);
        this.name = "registry";
    }

    public async register(param: Registry.RegisterParameter, address_of_signer:string ){
        // creates the register object parameter
        // const param: Registry.RegisterParameter = {
        //             message: {
        //                 data: {
        //                     contract_address: ContractAddress.create(100, 0),
        //                     provider: "AfrixLabs",
        //                     public_key:
        //                         "c82ce198a0595e621d9ab066b3950b78efbeea4eecfaf246bc3e0238d8d6d799",
        //                 },
        //                 expiry_time: Timestamp.futureMinutes(15),
        //                 tag: "buki.ccd",
        //             },
        //             signature:
        //                 "5ac312ac52171a91866e3e9de7bfe7caa24cc9385175f6718b3df00b912bd0e2b300a0e684e1d461b2de2a79d1149f04923b7b338dcfbfb2493b214d9683c70d",
        //             signer:
        //                 "c82ce198a0595e621d9ab066b3950b78efbeea4eecfaf246bc3e0238d8d6d799",
        //         };
        const contractAddr = ContractAddress.create(10289);
        const contract = Registry.createUnchecked(this.grpc, contractAddr)
        const response = await Registry.dryRunRegister(contract, param)
        if (!response || response.tag === 'failure' || !response.returnValue) {
            const parsedErrorCode = Registry.parseErrorMessageRegister(response)?.type;
            return { status: false, message: JSON.stringify(parsedErrorCode) }
        }
        const maxContractExecutionEnergy = Energy.create(response.usedEnergy.value + BigInt(200));
        const metadata: ContractTransactionMetadata = {
                amount: CcdAmount.zero(),
                senderAddress: AccountAddress.fromBase58(address_of_signer),
                energy: maxContractExecutionEnergy
            }
       await Registry.sendRegister(contract, metadata, param, this.signer);
    }

    public async get_key(tag: Registry.GetKeyParameter){
        const contractAddr = ContractAddress.create(10289);
        const contract = Registry.createUnchecked(this.grpc, contractAddr)
        const result = await Registry.dryRunGetKey(contract,tag);
        return result;
    }

    public async get_tag(key:Registry.GetTagParameter ){
        const contractAddr = ContractAddress.create(10289);
        const contract = Registry.createUnchecked(this.grpc, contractAddr)
        const result = await Registry.dryRunGetTag(contract,key);
        return result;
    }
}