"use client";

import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import "chart.js/auto";
import { stat } from "fs";
import { CardBox } from "~~/components/custom_components/cardComponent";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import Proposals from "./component/proposals";
import Bids from "./component/bids";
import Ownership from "./component/ownerShipInfo";
import Details from "./component/details";
import PriceHistory from "~~/app/property/[id]/components/priceHistory";

// Define types for owners and percentages
type Owner = string;
type Percentage = number;



const PropertyDetails = ({ params }: any) => {
  const { data: realEstateArray } = useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "getRealEstate",
    args: [params?.id ?? 0],
    watch: true,
  });

  // Check if realEstateArray is undefined before accessing its elements
  const noOfTokens = (realEstateArray as bigint[] | undefined)?.[0];
  const priceOf1Token = (realEstateArray as bigint[] | undefined)?.[1];
  const tokenId = (realEstateArray as bigint[] | undefined)?.[2];
  const status = (realEstateArray as bigint[] | undefined)?.[3];
  const rentInfo = (realEstateArray as bigint[] | undefined)?.[5];
  const realEstateBalance = (realEstateArray as bigint[] | undefined)?.[6];
  console.log(rentInfo, "rentInfo", status);






  console.log(status, "status");

  // Filter proposals into executed, active, and expired categories



  return (
    <div className="w-full p-5">
      <div className="flex w-[100%]  ">
        <div className=" flex  flex-grow justify-between" >
          <div className=" flex  m-3">

            <Details noOfTokens={noOfTokens} priceOf1Token={priceOf1Token} status={status} />
          </div>
          <div className=" flex  m-3 ">
            <Ownership id={params?.id ?? 0} realEstateArray={realEstateArray} />
          </div>
        </div>
        <div className="flex  w-[100%]  ">
          <CardBox className={'w-[100%]'} >
          <h1 className="text-3xl font-bold mb-5">Price Trend</h1>

            <div className="w-[100%] h-[100%] pb-5">

              <PriceHistory tokenId={params?.id ?? 0} />

            </div>
          </CardBox>
        </div>
      </div>


      <Proposals id={params?.id ?? 0} tokenId={tokenId} />
      <Bids id={params?.id ?? 0} />

    </div>


  );
};

export default PropertyDetails;
