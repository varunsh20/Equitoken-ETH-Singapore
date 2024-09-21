import {Box,Flex,HStack,Button,Select,Text,Image,Icon,Input,InputGroup,InputLeftElement} from '@chakra-ui/react';
import { useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';
import { Spinner } from '@chakra-ui/react'
import tokenLists from "../tokensLists.json"

export default function Buy(){

    const erc20ABI = [
        'function approve(address spender, uint amount) returns (bool)',
        'function allowance(address owner, address spender) external view returns (uint256)',
        'function balanceOf(address account) public view virtual returns (uint256)'
    ];

    const tokenContractsABI = [
        'function sendMintRequest(uint256 amount) external onlyOwner whenNotPaused returns (bytes32 requestId)',
        'function sendRedeemRequest(uint256 amount) external whenNotPaused returns (bytes32 requestId)'
    ];
    
    const [balance, setBalance] = useState();
    const [amount,setAmount] = useState();
    const [tokenLogo, setTokenLogo] = useState('');
    const [selectedTokenAddress, setSelectedTokenAddress] = useState();

    const handleDeposit = (event)=>setAmount(event.target.value);
    const handleSelectedToken = (event) => {
        const [address,logo] = event.target.value.split(',');
        console.log(address);
        setSelectedTokenAddress(address);
        setTokenLogo(logo)
    }

    const RPC_URL =  import.meta.env.VITE_RPC_URL;
    const usdcAddress = "0x96182684ae05EC30A3c2644c6CB9F3B9e6A8e89B";

    useEffect(()=>{
        async function getUserBalance(){
            const accounts = await window.ethereum.request({method:'eth_accounts'});
            console.log(accounts);
            const rpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
            const readContract = new ethers.Contract(selectedTokenAddress,erc20ABI,rpcProvider);
            const bal = await readContract.balanceOf(accounts[0]);
            console.log(bal);
        }
        getUserBalance();
    },[balance])

    console.log(balance);

    const buyTokens = async()=>{
        const accounts = await window.ethereum.request({method:'eth_accounts'});
        const addr = accounts[0];
        if(selectedTokenAddress==null || selectedTokenAddress==""){
            toast.error("Please select a token to buy");
        }
        else if(amount==null || amount==""){
            toast.error("Invalid amount of tokens");
        }
        else if(addr==null){
            toast.error("Please connect your wallet!");
        }
        else{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const writeContract = new ethers.Contract("0xB78DF707B5Ad592b4F5BcF6D680829A649c29d14",tokenContractsABI,provider.getSigner());
            const usdcContract = new ethers.Contract(usdcAddress,erc20ABI,provider.getSigner());
            const givenAllowance = await usdcContract.approve(selectedTokenAddress,100000000000000000000000000000n);
            await givenAllowance.wait()
            const buyAmount = ethers.utils.parseUnits(amount,8);
            const tx = await writeContract.sendMintRequest(buyAmount);
            await tx.wait()
            .then( () => {
                toast.success("Tokens Purchased Successfully.");
              }).catch( () => {
                toast.success("Some error occurred.");
            })
        }
    }

    return(
        <>
         <Box pt={40} mb={10} w="100%"  display={"flex"} pr={"20"} alignItems={"center"} justifyContent={"center"}>
            <Flex alignItems="center" justifyContent="center" w="100%" ml="500px">
                <Box  h="68vh" w="90%" pt={2} pb={4}  bg="rgba(21, 34, 57, 0.6)"  boxShadow={ '0px 0px 10px 0.2px #5684db'}
                border="solid 0.9px #253350" borderRadius={"25px"}  zIndex={2} mb="10px">
                    <HStack p="35px" gap={8} w="100%" >
                        <Box w="100%">
                            <Text fontSize={"24px"}>
                                Select Token
                            </Text>
                            <Select  bg="#4c689d" fontSize={"20px"} top={2} w="100%" size='lg' border={"none"} 
                             _hover={{ bg:"#5684db",cursor:"pointer"}}
                             onChange={handleSelectedToken}>
                                <option selected hidden disabled value="">Token</option>
                                {tokenLists.map((token)=>(
                                     <option value={`${token.address},${token.img}`} style={{ background: "#4c689d" ,fontSize:"20px"}}>{token.name}</option>
                                ))}
                            </Select>
                        </Box>
                    </HStack>
                    <Box mt={1} p="35px">
                        <Box display={"flex"} alignItems={"flex-start"} mb={"5px"}>
                            <Text fontSize={"24px"} pl= "2px">Shares To Buy/Sell </Text>
                        </Box>
                        <InputGroup>
                        <InputLeftElement pointerEvents='none' top="9px" left="15px" alt="USDC"  display={"flex"} 
                        justifyContent={"center"} >  
                            <Flex >
                            {tokenLogo && <img src={tokenLogo} alignItems="center" alt="USDC" />} 
                            </Flex>
                        </InputLeftElement>
                                <Input pl="68px" h = {"50px"} placeholder="0" size='lg' bg="rgb(93 132 202 / 60%)"
                                    fontSize={"30px"} value={amount} onChange={handleDeposit} required={true}/>
                        </InputGroup>
                        
                    </Box>
                    <Box p="20px">
                        <Button  w="100%" h="40px" fontSize={"24px"} color={"white"} 
                        bgColor={"#4047d2"}  _hover={{ bgColor:"blue", 
                        cursor:"pointer"}} onClick={buyTokens}>
                        Buy Tokens
                    </Button>
                    </Box>
                    <Box p="20px">
                        <Button  w="100%" h="40px" fontSize={"24px"} color={"white"} 
                        bgColor={"#ea6969"}  _hover={{ bgColor:"#d43b3b", 
                        cursor:"pointer"}} >
                        Sell Tokens
                    </Button>
                    </Box>
                </Box>
            </Flex>
            <ToastContainer position="top-center"/>
            </Box>
        </>
    )
}