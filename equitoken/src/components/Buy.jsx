import {Box,Flex,HStack,Button,Select,Text,Image,Icon,Input,InputGroup,InputLeftElement} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from 'ethers';
import tokenLists from "../tokensLists.json"
import log from "../assets/images.png"

export default function Buy(){

    const [amount,setAmount] = useState();
    const [tokenLogo, setTokenLogo] = useState('');
    const [selectedTokenAddress, setSelectedTokenAddress] = useState();
    //const tokenLogo = import.meta.env.VITE_USDC_LOGO;
    const handleDeposit = (event)=>setAmount(event.target.value);
    const handleSelectedToken = (event) => {
        const [address,logo] = event.target.value.split(',');
        console.log(address);
        setSelectedTokenAddress(address);
        setTokenLogo(logo)
        console.log(logo);
    }
    console.log(tokenLogo);


    return(
        <>
         <Box pt={40} mb={10} w="100%"  display={"flex"} pr={"20"} alignItems={"center"} justifyContent={"center"}>
            <Flex alignItems="center" justifyContent="center" w="100%" ml="500px">
                <Box  h="64vh" w="90%" pt={2} pb={4}  bg="rgba(21, 34, 57, 0.6)"  boxShadow={ '0px 0px 10px 0.2px #5684db'}
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
                            <Text fontSize={"24px"} pl= "2px">Shares To Buy </Text>
                        </Box>
                        <InputGroup>
                        <InputLeftElement pointerEvents='none' top="9px" left="15px" alt="USDC"  display={"flex"} 
                        justifyContent={"center"} >
                            <Flex >
                            {tokenLogo && <img src={tokenLogo} alignItems="center" alt="USDC" />} 
                            </Flex>
                        </InputLeftElement>
                                <Input pl="68px" h = {"60px"} placeholder="0" size='lg' bg="rgb(93 132 202 / 60%)"
                                    fontSize={"30px"} value={amount} onChange={handleDeposit} required={true}/>
                        </InputGroup>
                        
                    </Box>
                    <Box p="20px">
                        <Button  w="100%" h="60px" fontSize={"24px"} color={"white"} 
                        bgColor={"#ea6969"}  _hover={{ bgColor:"#d43b3b", 
                        cursor:"pointer"}} >
                        Buy Token
                    </Button>
                    </Box>
                </Box>
            </Flex>
            <ToastContainer/>
            </Box>
        </>
    )
}