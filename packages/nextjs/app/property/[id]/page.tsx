"use client"
import React, { useEffect, useState } from 'react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import millify from 'millify';
import { baseUrl, fetchApi} from '../../utils/fetchApi';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import BathroomOutlinedIcon from '@mui/icons-material/BathroomOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import Image from 'next/image';

const PropertyDetails = ({ params }:any) => {
  const [data,setData]=useState<any>({});
  console.log(params.id)
 async  function getData(){
    const d = await fetchApi(`${baseUrl}/properties/detail?externalID=${params.id}`);
    setData(d);
    console.log(d,"dataaaaaa");

  }
  useEffect(()=>{
    getData()
  },[]
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
// console.log(coverPhoto)
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

        <Flex  alignItems='center' >
          <Box paddingRight='3' color='green.400' >
            {isVerified ? 'Verified' : 'Not Verified'}
            <VerifiedOutlinedIcon/>
          </Box>
          <Text  paddingLeft='100' fontWeight='bold' fontSize='lg' color='blue.400'>
            Rs {price} {rentFrequency && `/${rentFrequency}`}
          </Text>
          <Spacer />
        </Flex>
        <Flex alignItems='center' p='1'  justifyContent='space-between' w='250px' color='blue.400'>
          <BedroomChildOutlinedIcon/>{rooms} <div className='mr-2'></div>  |<div className='mr-2'></div> <BathroomOutlinedIcon/>{baths} <div className='mr-2'></div> |  <div className='mr-2'></div>{millify(area)} sqft
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
          {amenities?.map((item:any, index:any) => (
            item?.amenities?.map((amenity:any) => (
              <Text key={`${index}-${amenity.text}`} fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>
                {amenity.text}
              </Text>
            ))
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default PropertyDetails;
