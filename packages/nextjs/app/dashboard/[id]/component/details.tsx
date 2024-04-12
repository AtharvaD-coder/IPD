import { Box, Flex, Text } from "@chakra-ui/react";
import { formatEther, parseUnits } from "ethers";
import { useEffect, useState } from "react";
import { convertEthToUsd } from "~~/components/custom_components/Property";

function getStatusString(status: any): string {
    switch (status) {
        case 0:
            return "Listed for sale";
        case 1:
            return "Rented";
        case 2:
            return "Listed for rent";
        default:
            return "Unknown";
    }
}



export default function Details({noOfTokens,priceOf1Token,status,rentInfo}:any){
    // console.log(status.toString())

    const [rentprice,setRentPrice]=useState('')
    const [deposit,setDeposit]=useState('')
    useEffect   (()=>{
        async function get() {
            console.log(rentInfo?.rentof1Month,rentInfo?.depositAount, "   asf")
            const a= await convertEthToUsd(Number(rentInfo?.rentof1Month))
            const b= await convertEthToUsd(Number(rentInfo?.depositAmount))
            console.log(a,b," aacscasf")
            setRentPrice(a)
            setDeposit(b)
     
        }
        get()
    }
    ,[rentInfo?.rentof1Month,rentInfo?.depositAount])

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
        {
            rentInfo?.rentPrice?
            <Box className="bg-secondary"  borderRadius="lg" p={4} textAlign="center" minWidth="200px" marginTop={20}>
            <Text className="text-white" fontSize="lg" fontWeight="bold">
                Rent of 1 Month : $ {rentprice}
            </Text>
        </Box>
        :
        null
        }
        {
            rentInfo?.depositAmount?
            <Box className="bg-secondary"  borderRadius="lg" p={4} textAlign="center" minWidth="200px" marginTop={20}>
            <Text className="text-white" fontSize="lg" fontWeight="bold">
                Deposit : $ {deposit}
            </Text>
        </Box>
        :
        null
        }
      
        {/* <Box className="bg-secondary"  borderRadius="lg" p={4} textAlign="center" minWidth="200px" marginTop={20} >
            <Text className="text-white" fontSize="lg" fontWeight="bold">
                Deposit : $ {deposit}
            </Text>
        </Box> */}

    </Flex>
    )
}