"use client"
import React, { useEffect, useState } from 'react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import millify from 'millify';
import { baseUrl, fetchApi } from '../../utils/fetchApi';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import BathroomOutlinedIcon from '@mui/icons-material/BathroomOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import Image from 'next/image';
import Button from '~~/components/custom_components/button';
import { useScaffoldContractRead, useScaffoldContractWrite } from '~~/hooks/scaffold-eth';
import { formatEther, parseUnits } from 'ethers';
import { formatGwei } from 'viem';
import { useAccount } from 'wagmi';
import RentProposalModal from './components/RentProposalModal'; // Import the modal component
import BidModal from './components/BidModal';

const PropertyDetails = ({ params }: any) => {
  const [data, setData] = useState<any>({});
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);



  const handleOpenRentModal = () => {
    setIsRentModalOpen(true);
  };

  const handleCloseRentModal = () => {
    setIsRentModalOpen(false);
  };
  const handleBidModalSubmit = (noOfTokens:any,value:any) => {

    placeBid({args:[params.id ?? 0, noOfTokens],value:BigInt(parseUnits(`${value}`,'ether'))})

    setIsBidModalOpen(false);
  }


  const handleRentProposalSubmit = (address:any, noOfMonths:any,deadline:any) => {
    // Handle submission logic here
    console.log('Rent amount:', address);
    console.log('Number of months:', noOfMonths);
    // Close the modal after submission
    createRentProposal({args:[params.id ?? 0, address, noOfMonths, deadline]})
    setIsRentModalOpen(false);
  };




  console.log(params.id)
  async function getData() {
    const d = await fetchApi(`${baseUrl}/properties/detail?externalID=${params.id}`);
    setData(d);
    console.log(d, "dataaaaaa");

  }
  const {address}=useAccount()
  console.log(address,"aaa")
  const { data: bids } = useScaffoldContractRead({

    contractName: "RealEstateERC1155",
    functionName: "getPendingBids",
    args: [params.id],
    watch: true
  })
  console.log(data, "aaa");

  const {data:realEstate}=useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "getRealEstate",
    args: [params?.id ?? 0],
    watch: true
  })
  const noOfTokens = (realEstate as bigint[] | undefined)?.[0];
    const priceOf1Token = (realEstate as bigint[] | undefined)?.[1];
    const tokenId = (realEstate as bigint[] | undefined)?.[2];
    const status = Number((realEstate as bigint[] | undefined)?.[3]);
    const rentInfo = (realEstate as bigint[] | undefined)?.[5];
    const realEstateBalance = (realEstate as bigint[] | undefined)?.[6];
    console.log(rentInfo,"rentInfo",status)
  const { writeAsync:placeBid } = useScaffoldContractWrite({
    contractName: "RealEstateERC1155",
    functionName: "placeBidAndPay",
    args: [BigInt(params.id ?? 0), BigInt(5)],
    value: BigInt(parseUnits(`${5}`,'ether')),

    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  })
  const date=new Date();
  date.setDate(new Date().getDate() + 1);
const {data:proposals}=useScaffoldContractRead({
  contractName: "RealEstateERC1155",
  functionName: "getAllProposals",
  args: [params?.id??0],
  watch: true
})
console.log(proposals,"proposals")
  const { writeAsync:createRentProposal } = useScaffoldContractWrite({
    contractName: "RealEstateERC1155",
    functionName: "createRenteeProposal",
    args: [BigInt(params.id ?? 0), address,BigInt(5),BigInt(date.getTime())],
    value: BigInt(parseUnits(`${5}`,'ether')),

    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync:execute } = useScaffoldContractWrite({
    contractName: "RealEstateERC1155",
    functionName: "selectBid",
    args: [BigInt(params.id ?? 0,), BigInt(1)],
    // value: BigInt(5),
    
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  useEffect(() => {
    getData()
  }, []
  )

  const {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
    coverPhoto
  } = data;
  console.log(bids)
  return (
    <Box maxWidth='1000px' margin='auto' p='4'>
      {/* {photos && <ImageScrollbar data={photos} />}   */}
      {/* {photos} */}

      <Box w='full' p='6'>
        <div className='horizontal-1 flex justify-between items-center'>
          <Image src={coverPhoto?.url} height={500} width={500} alt='' />
          <div>

            <Image alt='' width={200} height={200} src={agency?.logo?.url}></Image>
          </div>

        </div>
        <div className='flex justify-around pt-5'>

          <Flex alignItems='center' >
            <Box paddingRight='3' color='green.400' >
              {isVerified ? 'Verified' : 'Not Verified'}
              <VerifiedOutlinedIcon />
            </Box>
            <Text paddingLeft='100' fontWeight='bold' fontSize='lg' color='blue.400'>
              Rs {price} {rentFrequency && `/${rentFrequency}`}
            </Text>
            <Spacer />
          </Flex>
          <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
            <BedroomChildOutlinedIcon />{rooms} <div className='mr-2'></div>  |<div className='mr-2'></div> <BathroomOutlinedIcon />{baths} <div className='mr-2'></div> |  <div className='mr-2'></div>{millify(area)} sqft
          </Flex>
        </div>
      </Box>
      <Box marginTop='2'>
        <Text fontSize='lg' marginBottom='2' fontWeight='bold'>
          {title}
        </Text>
        <Text lineHeight='2' color='gray.600'>
          {description}
        </Text>
      </Box>
      <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text>Type:</Text>
          <Text fontWeight='bold' marginLeft='0.1rem'>{type}</Text>
        </Flex>
        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text>Purpose</Text>
          <Text fontWeight='bold'>{purpose}</Text>
        </Flex>
        {furnishingStatus && (
          <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
            <Text>Furnishing Status</Text>
            <Text fontWeight='bold'>{furnishingStatus}</Text>
          </Flex>
        )}
      </Flex>
      <Box>
        {amenities?.length > 0 && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Facilities:</Text>}
        <Flex flexWrap='wrap'>
          {amenities?.map((item: any, index: any) => (
            item?.amenities?.map((amenity: any) => (
              <Text key={`${index}-${amenity.text}`} fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                {amenity.text}
              </Text>
            ))
          ))}
        </Flex>
      </Box>

      <Box>
        {
          bids?.map((bid: any) => {
            return (
              <Box>
                <Text>{bid?.bidder ?? 0}</Text>
                <Text>{Number(bid?.numberOfTokens ?? "0")}</Text>
                <button onClick={() => {
                  console.log([BigInt(params.id ?? 0), BigInt(bid?.id ?? 0)],"sad")
                  execute({
                    args: [BigInt(params.id ?? 0), BigInt(bid?.id ?? 0)],
                    
                  })

                }} className="btn btn-outline">{"Buy"}</button>
              </Box>
            )
          }
          )
        }
      </Box>

      <button onClick={() => {
        status===0?setIsBidModalOpen(true):handleOpenRentModal()

      }} className="btn btn-outline">{status===0?"Buy":"Rent"}</button>

  <RentProposalModal
        isOpen={isRentModalOpen}
        onClose={handleCloseRentModal}
        onSubmit={handleRentProposalSubmit}
      />
      <BidModal
        onSubmit={handleBidModalSubmit}
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        
      />
    </Box>
  );
};

export default PropertyDetails;
