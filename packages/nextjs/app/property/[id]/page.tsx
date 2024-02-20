"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { baseUrl, fetchApi } from "../../utils/fetchApi";
// Import the modal component
import BidModal from "./components/BidModal";
import DetailsTabs from "./components/DetailsTabs";
import OwnerShip from "./components/OwnerPercentage";
import PropertyDetailCard from "./components/PropertyDetailCard";
import RentProposalModal from "./components/RentProposalModal";
import ImageGallery from "./components/imageViewer";
import PriceHistory from "./components/priceHistory";
import CustomizedTimeline from "./components/timeline";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import BathroomOutlinedIcon from "@mui/icons-material/BathroomOutlined";
import BedroomChildOutlinedIcon from "@mui/icons-material/BedroomChildOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import axios from "axios";
import { formatEther, parseUnits } from "ethers";
import millify from "millify";
import { formatGwei } from "viem";
import { useAccount } from "wagmi";
import Button from "~~/components/custom_components/button";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import Map from "./components/map";
import StickyBox from "react-sticky-box";

const PropertyDetails = ({ params }: any) => {
  const [data, setData] = useState<any>({});
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [images, setImages] = useState([]);

  const handleOpenRentModal = () => {
    setIsRentModalOpen(true);
  };

  const handleCloseRentModal = () => {
    setIsRentModalOpen(false);
  };
  const handleBidModalSubmit = (noOfTokens: any, value: any) => {
    placeBid({ args: [params.id ?? 0, noOfTokens], value: BigInt(parseUnits(`${value}`, "ether")) });

    setIsBidModalOpen(false);
  };

  const handleRentProposalSubmit = (address: any, noOfMonths: any, deadline: any) => {
    // Handle submission logic here
    console.log("Rent amount:", address);
    console.log("Number of months:", noOfMonths);
    // Close the modal after submission
    createRentProposal({ args: [params.id ?? 0, address, noOfMonths, deadline] });
    setIsRentModalOpen(false);
  };

  console.log(params.id);
  async function getData() {
    const d = await axios.post(`${process.env.NEXT_PUBLIC_URLL}/api/getRealEstateById`, {
      id: params.id,
    });
    setData(d.data);
    console.log(d, "dataaaaaa");
  }
  const { address } = useAccount();
  console.log(address, "aaa");
  const { data: bids } = useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "getPendingBids",
    args: [params.id],
    watch: true,
  });
  console.log(data, "aaa");

  const { data: realEstate } = useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "getRealEstate",
    args: [params?.id ?? 0],
    watch: true,
  });
  const noOfTokens = (realEstate as bigint[] | undefined)?.[0];
  const priceOf1Token = (realEstate as bigint[] | undefined)?.[1];
  const tokenId = (realEstate as bigint[] | undefined)?.[2];
  const status = Number((realEstate as bigint[] | undefined)?.[3]);
  const rentInfo = (realEstate as bigint[] | undefined)?.[5];
  const realEstateBalance = (realEstate as bigint[] | undefined)?.[6];
  console.log(rentInfo, "rentInfo", status);
  const { writeAsync: placeBid } = useScaffoldContractWrite({
    contractName: "RealEstateERC1155",
    functionName: "placeBidAndPay",
    args: [BigInt(params.id ?? 0), BigInt(5)],
    value: BigInt(parseUnits(`${5}`, "ether")),

    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  const date = new Date();
  date.setDate(new Date().getDate() + 1);
  const { data: proposals } = useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "getAllProposals",
    args: [params?.id ?? 0],
    watch: true,
  });
  console.log(proposals, "proposals");
  const { writeAsync: createRentProposal } = useScaffoldContractWrite({
    contractName: "RealEstateERC1155",
    functionName: "createRenteeProposal",
    args: [BigInt(params.id ?? 0), address, BigInt(5), BigInt(date.getTime())],
    value: BigInt(parseUnits(`${5}`, "ether")),

    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: execute } = useScaffoldContractWrite({
    contractName: "RealEstateERC1155",
    functionName: "selectBid",
    args: [BigInt(params.id ?? 0), BigInt(1)],
    // value: BigInt(5),

    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const executedProposals = proposals?.filter((proposal: any) => proposal.executed);
  const activeProposals = proposals?.filter(
    (proposal: any) => !proposal.executed && Date.now() <= Number(proposal.deadline),
  );
  const expiredProposals = proposals?.filter((proposal: any) => Date.now() > Number(proposal.deadline));
  const activeBids = bids?.filter((bid: any) => bid.status === 0);
  const executedBids = bids?.filter((bid: any) => bid.status === 1);

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
    coverPhoto,
    photos,
    totalImages,
    metadataUri,
    BhkType,
    noOfBathrooms,
    noOfBedrooms,
    latitude,
    longitude
  } = data;

  console.log(noOfBedrooms, "totalImages dataaa");
  useEffect(() => {
    const images: any = [];
    for (let i = 0; i < photos?.length??0; i++) {
      console.log(photos[i], "photos[i]"    );
      images.push(photos[i]);
    }

    setImages(images);
  }, [data]);

  return (
    <div className="m-10  ">
      <div className=" flex items-start w-[100%]  ">
        <div className="overflow-y-auto max-h-[100%] h-full w-[100%]   ">
          <div className=" mb-6 flex  items-center ">
            <ImageGallery imageUrls={images} />
          </div>

          <div className=" flex  ">
            <PropertyDetailCard
              price={price}
              bhkTypes={BhkType}
              area={area}
              noOfBathrooms={noOfBathrooms}
              noOfBedrooms={noOfBedrooms}
            />
          </div>
          <div className=" flex w-[100%] ">
            <DetailsTabs
              TabComponents={[
                {
                  title: "Description",
                  Component: () => <div><div className="w-[100%] max-w-[900px]   ">{description}</div></div>,
                },
                {
                  title: "Price History",
                  Component: () => (
                    <div className="w-[700px] h-[300px]">
                      <PriceHistory tokenId={params?.id ?? 0} />
                    </div>
                  ),
                },
                {
                  title: "Facilities",
                  Component: () => (
                    <div>
                      {amenities?.length > 0 && (
                        <Text fontSize="2xl" fontWeight="black" marginTop="5">
                          Facilities:
                        </Text>
                      )}
                      <div className="grid-cols-3 gap-4 h-50 inline-grid" style={{ flexDirection: "column" }}>
                        {amenities?.map((amenity: any, index: any) => (
                          <Text
                            key={`${index}-${amenity}`}
                            fontWeight="bold"
                            color="blue.400"
                            fontSize="l"
                            p="2"
                            bg="gray.200"
                            m="1"
                            borderRadius="5"
                          >
                            {amenity}
                          </Text>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>
          <div className=" flex  ">
            <CustomizedTimeline tokenId={params?.id} />

          </div>
        </div>

        <StickyBox className="w-[100%" offsetTop={5} offsetBottom={5}>

          <OwnerShip id={params?.id ?? 0} />

          <Map latitude={latitude} longitude={longitude} />


        </StickyBox>
      </div>



      <button
        onClick={() => {
          status === 0 ? setIsBidModalOpen(true) : handleOpenRentModal();
        }}
        className="btn btn-outline"
      >
        {status === 0 ? "Buy" : "Rent"}
      </button>

      <RentProposalModal isOpen={isRentModalOpen} onClose={handleCloseRentModal} onSubmit={handleRentProposalSubmit} />
      <BidModal onSubmit={handleBidModalSubmit} isOpen={isBidModalOpen} onClose={() => setIsBidModalOpen(false)} />
    </div>
  );
};

export default PropertyDetails;
