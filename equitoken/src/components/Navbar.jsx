import { Box, HStack, Heading, Button, TabList, Tab, Tabs,TabIndicator} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/logo.png";
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function Navbar(){

    const app_id = import.meta.env.VITE_WLD_APP_ID;
    const action = import.meta.env.VITE_WLD_ACTION;

    const { setOpen } = useIDKit();
    const [isVerified,setVerified] = useState(false);

    const onSuccess = (result) => {
        setVerified(true);
    };

    const handleProof = async (result) => {
        try {
          const response = await fetch("https://world-id-backend.vercel.app/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ proof: result, signal: "optional_signal" }),
          });
      
          const data = await response.json();
          console.log(data);
          if (data.success) {
            console.log("Successful response from backend:", data);
          } else {
            console.error(`Verification failed: ${data.detail}`);
            throw new Error(`Verification failed: ${data.detail}`);
          }
        } catch (error) {
          console.error("Error occurred:", error);
        }
      };

    return(
        <>
        <Box>
            <Box h="100px" w="100%" zIndex={"tooltip"} top={0} bg="rgba(16, 24 ,39, 0.7)" position={"fixed"}
                sx={{backdropFilter: "blur(15px)",}}
            />
            <Box w="100%" position={"fixed"} zIndex={"tooltip"} bg="transparent" py={[0, 0, 8]} pb={[1, 1, 4]} px={[0, 0, 16]}>
                <HStack border="solid 0.9px #253350" bg="rgba(21, 34, 57, 0.8)" w="100%" h="80px" borderRadius={"10px"} 
                    justifyContent={"space-between"} alignItems={"center"} py={[1, 1, 8]} boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" 
                    px={[3, 3, 12]} sx={{backdropFilter: "blur(15px)",}}>
                    <Box>
                       <HStack>
                            <Box w="60px" h="60px" as="img"  src={logo} alt="logo"/>
                            <Heading color="white" ml="12px" mr = "40px" fontSize={"35px"} >
                                EquiToken
                            </Heading>
                        </HStack>
                    </Box>
                    <Tabs mr = "auto" position="relative"  align="start" variant="unstyled" >
                        <TabList >
                        <Tab fontSize="20px" fontWeight="400" ><Link to = "/" >Home</Link></Tab>
                        <Tab fontSize="20px" fontWeight="400"><Link to = "/buy">Buy Tokens</Link></Tab>
                        <Tab fontSize="20px" fontWeight="400"><Link to = "/analyze">Analyze</Link></Tab>
                        </TabList>
                        <TabIndicator mt="-1.5px" height="2px" bg="#5684db" borderRadius="1px"/>
                    </Tabs>
                    <Box> {!isVerified ? (
                        <>
                        <IDKitWidget action={action} app_id={app_id} onSuccess={onSuccess} handleVerify={handleProof} 
                        verification_level={VerificationLevel.Orb}/>
                        <Button onClick={() => setOpen(true)}>Verify with World ID</Button></>) : 
                        (
                            <DynamicContextProvider settings={{environmentId: "f969eea5-c336-4a89-8bdd-73aaef024950",
                            walletConnectors: [EthereumWalletConnectors],}}>
                                <DynamicWidget />
                            </DynamicContextProvider>
                        )}
                    </Box>
                </HStack>
            </Box >
        </Box>
        <ToastContainer position="top-center"/>
        </>
    )
}