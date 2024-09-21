import { Box,Text, Image, Button, Heading, HStack, VStack,Flex} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import { useEffect,useState} from "react";
import rwa from "../assets/rwa1.jpg"
import axios from "axios";


export default function Home(){

    const [stocks, setStocks] = useState([]);
    const API_KEY = import.meta.env.VITE_API_KEY; 
    
    useEffect(() => {
        const fetchStockPrices = async () => {
          try {
            const symbols = ['NVDA', 'AAPL', 'TSLA', 'AMZN', 'MSFT', 'GOOGL', 'META', 'NFLX', 'INTC', 'ADBE', 'PYPL', 'V'];
            
            const response = await axios.get('https://api.twelvedata.com/price', {
              params: {
                symbol: symbols.join(','),
                apikey: API_KEY
              }
            });
    
            const stockData = symbols.map(symbol => ({
              name: symbol,
              price: response.data[symbol]?.price || 'N/A'
            }));
    
            setStocks(stockData);
          } catch (error) {
            console.error('Error fetching stock prices:', error);
          }
        };
    
        fetchStockPrices();
        const interval = setInterval(fetchStockPrices, 60000); // Refresh every 60 seconds
    
        return () => clearInterval(interval); // Clean up interval on component unmount
      }, []);

    return(
        <>
        <Box  mt={10} p="50px" >
            <HStack spacing={10} display={"flex"} alignItems="flex-start" justifyContent="center"
            p="50px"> 
            <VStack display={"flex"} alignItems="flex-start" justifyContent="flex-start" spacing={6} w="50%"> 
                <Heading size="xl">Get Your Tokenized Stocks</Heading>
                    <Text fontSize={"24px"} textAlign={"justify"}>
                    Easily buy your favorite tokenized stocks, like Google, Tesla, or Nvidia, from our platform at the best market rates. We offer a seamless way to convert your funds into stock-backed tokens, giving you instant access to the stock market in a more flexible and digital form. Whether you're looking to invest or diversify your portfolio, our platform ensures you get the most competitive prices and a user-friendly experience to manage your tokenized assets.
                    </Text>
                    <VStack  display={"flex"} justifyContent={"flex-end"} alignItems={"flex-end"} mt={5}>
                    <Link to="/buy">
                    <Button fontSize="20px" background="#ea6969" color={"white"} _hover={{ bg: "#d43b3b" }}>
                        Get Started
                    </Button>
                    </Link>
                    </VStack>
            </VStack>
                <Box display={"flex"} alignItems="flex-end" justifyContent={"flex-end"} w="50%">
                    <Image objectFit='cover' src={rwa} w="60%" alt='RWA'/>
                </Box>
            </HStack>

            <Box p={5} bg="gray.700" borderRadius="md" boxShadow="md">
            <HStack spacing={8} justifyContent="center">
                {stocks.map((stock, index) => (
                    <VStack key={index}>
                    <Text fontSize="xl" color="white">{stock.name}</Text>
                    <Text fontSize="lg" color="green.300">${stock.price}</Text>
                    </VStack>
                ))}
            </HStack>
            </Box>
            </Box>
        </>
    )
}