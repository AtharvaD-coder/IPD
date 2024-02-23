import { Box, Flex, Text } from "@chakra-ui/react";
import { formatEther, parseUnits } from "ethers";

function getStatusString(status: any): string {
    switch (status) {
        case 0:
            return "Listed";
        case 1:
            return "Rented";
        case 2:
            return "Renting";
        default:
            return "Unknown";
    }
}



export default function Details({noOfTokens,priceOf1Token,status}:any){
    // console.log(status.toString())
    return (
        
        <Flex direction="column" justifyContent="flex-start" maxWidth="180px" margin={3}>
        <Box className="bg-secondary" borderRadius="lg" p={4} textAlign="center" mb={5} minWidth="200px">
            <Text className="text-white" fontSize="lg" fontWeight="bold">
                No. of Tokens : {Number(noOfTokens)}
            </Text>
        </Box>
        <Box className="bg-secondary"  borderRadius="lg" p={4} textAlign="center" mb={5} minWidth="200px">
            <Text className="text-white" fontSize="lg" fontWeight="bold">
                Price of 1 Token : {Number(formatEther(`${Number(priceOf1Token??0)}`))}
            </Text>
        </Box>
        <Box className={`bg-secondary text-green-400`}  borderRadius="lg" p={4} textAlign="center" minWidth="200px">
            <Text className={`text-white ${status===0?"text-green-300 ":"text-red-400"}`} fontSize="lg" fontWeight="bold" >
                Status : {getStatusString(Number(status))}
            </Text>
        </Box>
    </Flex>
    )
}