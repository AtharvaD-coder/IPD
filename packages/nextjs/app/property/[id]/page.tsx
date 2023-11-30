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

const PropertyDetails = ({ params }:any) => {
  const [data,setData]=useState<any>({});
  console.log(params.id)
 async  function getData(){
    const d = await fetchApi(`${baseUrl}/properties/detail?externalID=${params.id}`);
    setData(d);
    console.log(d);

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
  } = data;

  return (
    <Box maxWidth='1000px' margin='auto' p='4'>
      {/* {photos && <ImageScrollbar data={photos} />}   */}
      {/* {photos} */}
      <Box w='full' p='6'>

        <Flex paddingTop='2' alignItems='center'>
          <Box paddingRight='3' color='green.400' paddingTop='200'>
            {isVerified ? 'Verified' : 'Not Verified'}
            <VerifiedOutlinedIcon/>
          </Box>
          <Text  paddingTop='200' paddingLeft='100' fontWeight='bold' fontSize='lg'>
            Rs {price} {rentFrequency && `/${rentFrequency}`}
          </Text>
          <Spacer />
          <Avatar size='sm' w='200px' src={agency?.logo?.url}></Avatar>
        </Flex>
        <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
          <BedroomChildOutlinedIcon/>{rooms}  | <BathroomOutlinedIcon/>{baths}  |  {millify(area)} sqft
        </Flex>
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
