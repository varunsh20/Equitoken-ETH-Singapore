import { Button } from "@chakra-ui/react"
import {ethers} from "ethers";
import { BigNumber } from "ethers";
import PythAbi from '@pythnetwork/pyth-sdk-solidity/abis/IPyth.json'


export default function Home(){

    const providers = new ethers.providers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/-kfpqgyfOtKsaPy_QubBU9QCMmS-dfLd");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract("0x2880aB155794e7179c9eE2e38200202908C17B43",PythAbi,provider.getSigner());
    const readContract = new ethers.Contract("0x2880aB155794e7179c9eE2e38200202908C17B43",PythAbi,providers);
    //const pythAbi = ['function exampleMethod(bytes[] calldata priceUpdate) public payable returns(PythStructs.Price memory)']

    const uploadData = async()=>{
        const updateData = ["0x504e41550100000003b801000000040d006596796aa493f4772c335a9e916c17082199d5b9bc5145feff343998604bd5376b349a3245b0b4eaa1bc308a7983c7d353e0bd0fde506fb662998057c993f6ea0002fab1e40b78b4f57a10b405b65108c6c132746b340bdbd10a088981f4b889a8766be4f465782f6f1e37792cd03722b62878afe38567a27591bee6b0a8042215f40003874c4fa5829597c620a1ec161fe5aff36c7023f8a05229410d3b425242586682777b13cbb26138baec648c8e66f9feac119ce9598b325f0f6f74827caf22b84300049ab36c400499961337bf6410199301802a7a1876a68be5b3ff98012ba1a2a8303f09dc0dccb3353da232d1990a86133dfe43f14db4a54c32c0527e874a1681370106a1cb204659a000440a9c79a9d583e6154054e6b958c89f3bd5bc0fb381025ba817f0a120c4e2aafb05bd8450cf7dcfe8108fc56c70f89e7a76269a2c647c36c1000861b40146a5196fe708b5cfcf7e5292ba245ecfb84b070675bc5a48575e52f88a45d9cf5d0592cf108a0e008455e6dd14cb240fbe42ecd4461bff3790a1fb6aee010a21364f2d9fa6b6c516816e831551d7528bcecee4a184523740beaf5f3e6a7f2b480ef27340973a959a250cbb6402865397a0a2f784f493db5a102a4360283d29010b8184d1ff93c14110eb076535eb2989b556ebc163e4ebd3f982996ff8b753b87551396a8d00173217f0eb540bd930fc15503e6014dd030f5e76c1d0cb886f8066010dae5cd32acff102fd8c594895d9832911998716fdf6496179c5fb2bbc3a72aa583122d51b7d56c99384aa7f29e2b4779699cd22066aaae8dd926e980c37818e4a000ea6f4f7a1148d6c149a781b4a1eff7b8b40cf65c6133632d6dbfd4dbc12dad89a749c7116ab275b9eb6585ea53b7df86edb3999abdab7c63e5a9cbd1c7e51556b000f80ca21604ec3d64d304e6609bdf4ea82c11f0351b4b81c72a1f063259b02cdbb2cf9f87c52612e487dca1907dfa3b5d0d75f52a134191dcad98710bb338f96dc0110c85d8ec23de9503379c271287a51e29e22ab2fb22088ddd8e4af54e088166d8a4067ab322c975a62adacaaa65ade7c072bc9cde969f392a2f871001072360c160012444edc65be3775cb077711dc874e6ed14ede4294b4d6436e9f2b68d67955207d7fa345fb8817f0a20942e04cd2ee036039042705fee57efc720261726b1423e70066df0ccb00000000001ae101faedac5851e32b9b23b5f9411a8c2bac4aae3ed4dd7b811dd1a72ea4aa710000000004ba8a390141555756000000000009c5e58c00002710ac8fd2abc99a6df0cc565ccf97c1a3a517319ac90100550016dad506d7db8da01c87581c87ca897a012a153557d4d578c3b9c9e1bc0632f1000000000149e1530000000000006c00fffffffb0000000066df0ccb0000000066df0cca00000000014b9fba00000000000083160b2de76d737e5fb8fb8a0f4c1bb117c0e84e99863ef14d8ca381f77e2ed14559a5dbe59fc6ad472f24269cb1d7f1e8b1bcbfedfd8becb4ba211ee7b9f2ca48119a58ec9ee2f64dffccc0f160c0c5e4c0a044b2a04e58e7bc95e7e8ef330512debf9cb5c226e4ef12aa896bffbb0e24c61d92813ea75d8c8f008a76a2dfd52c605b070edbfb9c17c990d66286872bcdd37bac3f2b7fc13a49c0c1d5cf8d4912f7bc8614e199fb309563dc7dec94e350e5528581ee0753e18a9a02727b92a2b1fdda881e7efc078d222f3816750153a1c96b1adfcd2a9d504e3628b6cc5e"];
        const bigNumber = BigNumber.from(1);
        const bigInt = bigNumber.toBigInt();
        console.log(bigInt);
        const account = await window.ethereum.request({method:'eth_accounts'});
        const tx = await contract.updatePriceFeeds(updateData, {value: bigInt});
        await tx.wait();
        console.log(tx);
        const feeAmount = await readContract.getPriceNoOlderThan("0x16dad506d7db8da01c87581c87ca897a012a153557d4d578c3b9c9e1bc0632f1", "100");
        console.log(feeAmount);
    }

    const fetchPrice = async()=>{
        const feeAmount = await readContract.getPriceNoOlderThan("0x16dad506d7db8da01c87581c87ca897a012a153557d4d578c3b9c9e1bc0632f1", "300");
        console.log(feeAmount);
    }

    return(
        <>
        <Button mt="100px" onClick={uploadData}>
            Upload Data
        </Button>
        <Button  mt="100px" onClick={fetchPrice}>Fetch Price</Button>
        </>
    )
}