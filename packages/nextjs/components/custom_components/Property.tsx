import Image from "next/image";
import Link from "next/link";
import { baseUrl, fetchApi } from "../../app/utils/fetchApi";
import { Box, Flex, Text } from "@chakra-ui/layout";
import BathroomOutlinedIcon from "@mui/icons-material/BathroomOutlined";
import BedroomChildOutlinedIcon from "@mui/icons-material/BedroomChildOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import millify from "millify";
import { NextApiRequest } from "next";

const DefaultImage =
  "https://media.istockphoto.com/id/1269776313/photo/suburban-house.jpg?s=612x612&w=0&k=20&c=iNaSdrxJt7H37rjQZumXYScrmSTRm2fDJrqZzxpDL_k=";

interface PropertyProps {
  property: {
    title: string;
    tokenId: string;
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

const Property: React.FC<any> = ({
  property: { _id, title, price, tokenId, coverPhoto, rentFrequency, rooms, baths, area, isVerified },
}: any) => {
  return (
    <Link href={`/property/${tokenId}`} passHref>
      <Flex flexWrap="wrap" w="420px" p="5" paddingTop="0px" justifyContent="flex-start" cursor="pointer">
        <Box>
          <Image src={coverPhoto ? coverPhoto : DefaultImage} className="rounded-xl" width={300} height={300} alt="" />
        </Box>

        <Box w="full">
          <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <Box paddingRight="3" color="green.400">
                {isVerified && <VerifiedOutlinedIcon />}
              </Box>
              <Text fontWeight="bold" fontSize="lg">
                Rs {millify(price)}
                {rentFrequency && `/${rentFrequency}`}
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
            <BedroomChildOutlinedIcon />
            {rooms} <div className="mr-3"></div>| <div className="mr-3"></div> <BathroomOutlinedIcon /> {baths} |{" "}
            <div></div> <CompareArrowsOutlinedIcon className="mr-2" />
            {Math.floor(area)} sq.ft.
          </Flex>
          <Text fontSize="lg">{title && title.length > 30 ? title.substring(0, 60) + "..." : title}</Text>
        </Box>
      </Flex>
    </Link>
  );
};

export async function getData({ query }: { query: NextApiRequest["query"] }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationtokenIds = query.locationtokenIds || "5002";
  const categorytokenId = query.categorytokenId || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationtokenIds=${locationtokenIds}&purpose=${purpose}&categorytokenId=${categorytokenId}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`,
  );

  console.log(data, "data");
  return {
    props: {
      properties: data?.hits,
    },
  };
}

export default Property;
