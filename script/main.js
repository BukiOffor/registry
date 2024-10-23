import * as ccdJsGen from "@concordium/ccd-js-gen"
import * as SDK from "@concordium/web-sdk"


async function buildFromChain(){
    const outDirPath = "constants"; // The directory to use for the generated files.
    const outputModuleName = "module"; // The name to give the output smart contract module.

    const grpcClient = new SDK.ConcordiumGRPCWebClient("http://node.testnet.concordium.com", 20000)

    const moduleRef = SDK.ModuleReference.fromHexString('9199cb2d2b9c0b041c7533c507e0fec441f1d95777d5d00f7f59a337a79720bd');
    
    // Fetch the smart contract module source from chain.
    const moduleSource = await grpcClient.getModuleSource(moduleRef);
    
    // Generate the smart contract clients from module source.
    console.info('Generating smart contract module clients.');
    await ccdJsGen.generateContractClients(moduleSource, outputModuleName, outDirPath);
    console.info('Code generation was successful.');
}



async function main(){
   await buildFromChain()
}

main().then().catch((err)=>{
    console.log(err)
})