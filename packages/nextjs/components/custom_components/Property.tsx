import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import millify from 'millify';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { baseUrl, fetchApi } from '../../app/utils/fetchAPI';
import { NextApiRequest } from 'next';

const DefaultImage = 'https://media.istockphoto.com/id/1269776313/photo/suburban-house.jpg?s=612x612&w=0&k=20&c=iNaSdrxJt7H37rjQZumXYScrmSTRm2fDJrqZzxpDL_k=';

interface PropertyProps {
  property: {
    title: string;
    externalID: string;
    coverPhoto?: {
      url: string;
    };
    price: number; 
    rentFrequency?: string; 
    rooms: number; 
    baths: number; 
    area: number; 
    isVerified: boolean;
  };
}

const Property: React.FC<PropertyProps> = ({ property: { title, externalID, coverPhoto, price, rentFrequency, rooms, baths, area, isVerified } }) => (
  <Link href={`/property/${externalID}`} passHref>
    <Flex flexWrap='wrap' w='420px' p='5' paddingTop='0px' justifyContent='flex-start' cursor='pointer'>
      <Box>
        <Image src={coverPhoto ? coverPhoto.url : DefaultImage} width={400} height={260} alt='' />
      </Box>

      <Box w='full'>
        <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
          <Flex alignItems='center'>
            <Box paddingRight='3' color='green.400'>{isVerified && <VerifiedOutlinedIcon />}</Box>
            <Text fontWeight='bold' fontSize='lg'>Rs {price}{rentFrequency && `/${rentFrequency}`}</Text>
          </Flex>
        </Flex>
        <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
          {rooms}
           | {baths} | {millify(area)} sqft
        </Flex>
        <Text fontSize='lg'>
          {title.length > 30 ? title.substring(0, 30) + '...' : title}
        </Text>
      </Box>


    </Flex>
  </Link>
);


export async function getData({query}: { query: NextApiRequest['query'] }) {


  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);


    return {
      props: {
        properties: data?.hits,
      },
    };

  }



export default Property;