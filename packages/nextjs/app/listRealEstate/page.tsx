"use client";

import { useEffect, useState } from "react";
// Remove unused import
import Radio from "./components/Radio";
import AmenitySelector from "./components/amenities";
import ImageUploader from "./components/imageUploader";
import NumberInput from "./components/numberInputs";
import { parseUnits } from "ethers";
import { useAccount } from "wagmi";
import Button from "~~/components/custom_components/button";
import Input from "~~/components/custom_components/input";
import Label from "~~/components/custom_components/labels";
import { AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { uploadToPinata } from "~~/utils/ipfs";
import { amenities } from "~~/utils/utils";
import MapboxMap from "./components/mapComponent";
import { CardBox } from "~~/components/custom_components/cardComponent";
import ToggleButtonSizes from "./components/toggleButton";
import { motion, AnimatePresence } from 'framer-motion'
interface RentProps {
  numberOfMonths?: number;
  rentPerMonth?: number;
  depositAmount?: number;
  lateInstallmentFees?: number;
  contractStartTimestamp?: number;
}

interface ListDetails {
  owner: string;
  initialAmountOfTokens: number;
  priceOf1Token: number;
  rentProps?: RentProps;
}



export default function ListRealEstate() {
  const { address } = useAccount();
  const [files, setFiles] = useState<any>([]);
  const [ListDetails, setListDetails] = useState<ListDetails>({
    owner: address ?? "",
    initialAmountOfTokens: 0,
    priceOf1Token: 0,
  });
  const [additionalDetails, setAdditionalDetails] = useState<any>({
    description: "",
    BhkType: "",
    type: "",
    amenities: [],
    area: 0,
    noOfBathrooms: 0,
    noOfBedrooms: 0,
    latitude:0,
    longitude:0,
  });

  console.log(additionalDetails, "additi");
  const [isForRent, setIsForRent] = useState(false);

  useEffect(() => {
    setListDetails({ ...ListDetails, owner: address ?? "" });
  }, [address]);

  

  const { writeAsync: listRealEstateForSale } = useScaffoldContractWrite({
    contractName: "RealEstateERC1155",
    functionName: "listRealEstateForSale",
    args: [
      BigInt(ListDetails?.initialAmountOfTokens ?? 0),
      ListDetails.owner,
      BigInt(ListDetails?.priceOf1Token ?? 0),
      "",
    ],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: listRealEstateForRent } = useScaffoldContractWrite({
    contractName: "RealEstateERC1155",
    functionName: "listRealEstateForRent",
    args: [
      BigInt(ListDetails?.initialAmountOfTokens ?? 0),
      ListDetails.owner,
      BigInt(ListDetails?.priceOf1Token ?? 0),
      BigInt(ListDetails.rentProps?.numberOfMonths ?? 0),
      BigInt(ListDetails.rentProps?.rentPerMonth ?? 0),
      BigInt(ListDetails.rentProps?.depositAmount ?? 0),
      BigInt(ListDetails.rentProps?.lateInstallmentFees ?? 0),
      BigInt(200000000000 ?? 0),
      "",
    ],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { data: tokenIdCounter } = useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "getTokenIdCounter",
    watch: true,
  });

  console.log(parseUnits(`${1}`, "ether"), "data asfasf");

  const onSubmit = async () => {
    console.log("hello",{
      purpose: isForRent ? "for-rent" : "for-sale",
      totalImages: files.length,
      description: additionalDetails.description,
      amenities: amenities,
      BhkType: additionalDetails.BhkType,
      noOfBathrooms: additionalDetails.noOfBathrooms,
      noOfBedrooms: additionalDetails.noOfBedrooms,
    
    });
    const data: string = await uploadToPinata(files, tokenIdCounter, {
      purpose: isForRent ? "for-rent" : "for-sale",
      totalImages: files.length,
      description: additionalDetails.description,
      amenities: additionalDetails.amenities,
      BhkType: additionalDetails.BhkType,
      noOfBathrooms: additionalDetails.noOfBathrooms,
      noOfBedrooms: additionalDetails.noOfBedrooms,
    });
    if (isForRent) {
      listRealEstateForRent({
        args: [
          BigInt(ListDetails?.initialAmountOfTokens ?? 0),
          ListDetails.owner,
          BigInt(parseUnits(`${ListDetails?.priceOf1Token ?? 0}`, "ether")),
          BigInt(ListDetails.rentProps?.numberOfMonths ?? 0),
          BigInt(ListDetails.rentProps?.rentPerMonth ?? 0),
          BigInt(ListDetails.rentProps?.depositAmount ?? 0),
          BigInt(ListDetails.rentProps?.lateInstallmentFees ?? 0),
          BigInt(ListDetails.rentProps?.contractStartTimestamp ?? 0),
          data,
        ],
      });
    } else {
      listRealEstateForSale({
        args: [
          BigInt(ListDetails?.initialAmountOfTokens ?? 0),
          ListDetails.owner,
          BigInt(parseUnits(`${ListDetails?.priceOf1Token ?? 0}`, "ether")),
          data,
        ],
      });
    }
  };
  const handleAmenitiesChange = (selectedAmenities: string[]) => {
    setAdditionalDetails({ ...additionalDetails, amenities: selectedAmenities });
  };

  console.log(files, "files");
  console.log(ListDetails, "listDetails");

  return (

    <div className="p-5">
      <div className="horizontal-1 flex justify-between items-center w-[100%] ">
        <div className="m-2 ml-4 w-1/3 ">
          <ImageUploader files={files} setFiles={setFiles} label={"Upload Image"} />
          {/* <ImageUploader/> */}
        </div>
        <div className=" w-2/5 pr-5 mr-20 justify-center items-center flex flex-col ">
          <CardBox className="w-[100%]">
            <NumberInput
              value={ListDetails.initialAmountOfTokens}
              onChange={(e: any, val: any) => setListDetails({ ...ListDetails, initialAmountOfTokens: Number(val) })}
              label={"Number of tokens of property"}

            />
            <NumberInput
              value={ListDetails.priceOf1Token}
              onChange={(e: any, val: any) => setListDetails({ ...ListDetails, priceOf1Token: Number(val) })}
              label={"Price of 1 Token"}
            />
          </CardBox>
          <CardBox className="w-[100%]" >
            <NumberInput
              label={"Area (in Sq ft)"}
              value={additionalDetails.area}
              onChange={(e: any, val: any) => {
                setAdditionalDetails((prev: any) => ({ ...prev, area: val }));
              }}
            />
            <NumberInput
              label={"Number of Bathrooms"}
              value={additionalDetails.noOfBathrooms}
              onChange={(e: any, val: any) => {
                setAdditionalDetails((prev: any) => ({ ...prev, noOfBathrooms: val }));
              }}
            />
            <NumberInput
              label={"Number of Bedrooms"}
              value={additionalDetails.noOfBedrooms}
              onChange={(e: any, val: any) => {
                setAdditionalDetails((prev: any) => ({ ...prev, noOfBedrooms: val }));
              }}
            />

            <NumberInput
              label={"BHK"}
              value={additionalDetails.bhk}
              onChange={(e: any, val: any) => {
                setAdditionalDetails((prev: any) => ({ ...prev, BhkType: val+" Bhk" }));
              }}
            />

          </CardBox>
        </div>
      </div>
      <CardBox className={'rounded-[30px] my-5'} >
        <div className="horizontal-2 w-[90vw] ">

          <h1 className="text-xl font-bold" > Description</h1>
          <textarea

            value={additionalDetails?.description ?? ""}
            onChange={e => {
              setAdditionalDetails((prev: any) => ({ ...prev, description: e.target.value }));
            }}
            className="textarea rounded-3xl textarea-bordered w-full min-h-[150px] bg-white "
            placeholder="write a description for your estate!"
          />
        </div>
      </CardBox>
      <CardBox className={'rounded-[30px] my-5'} >


        {/* <Radio label={'Type Of property'} options={['Residential', 'Commercial', 'Vacation Home', 'PG']} /> */}

        <h1 className="text-xl font-bold" >Property For</h1>

        <ToggleButtonSizes value={isForRent} setValue={setIsForRent} />




      </CardBox>
      <AnimatePresence>

        {isForRent && (
          <motion.div
            initial={{ opacity: 0, height: '0px' }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, height: '0px' }}

          >


            <CardBox >
              <h1 className="text-xl font-bold" > Rent Info</h1>

              <div className="horizontal-2 w-[90vw] ">
                <NumberInput label={"Number of Months"} />
                <NumberInput label={"Rent per Month"} />
                <NumberInput label={"Deposit Amount"} />
                <NumberInput label={"Fees for Late Installments"} />
                <Input
                  label={"Contract Start Timestamp"}
                  type="date"
                  value={
                    ListDetails.rentProps && ListDetails.rentProps.contractStartTimestamp
                      ? new Date(ListDetails.rentProps.contractStartTimestamp).toISOString().slice(0, 10)
                      : new Date().toISOString().slice(0, 10)
                  }
                  // value={new Date(ListDetails.rentProps?.contractStartTimestamp??'').toISOString().slice(0, 10) }
                  onChange={(val: any) => {
                    console.log("hello", val, new Date(val ?? 0).toISOString().slice(0, 10));
                    setListDetails(prevGroup => ({
                      ...prevGroup,
                      rentProps: {
                        ...prevGroup.rentProps,
                        contractStartTimestamp: new Date(val).getTime(),
                      },
                    }));
                  }}
                />
              </div>
            </CardBox>
          </motion.div>

        )}
      </AnimatePresence>


      <AmenitySelector selectedAmenities={additionalDetails.amenities} setSelectedAmenities={handleAmenitiesChange} />


      <div>
        <MapboxMap latitude={additionalDetails.latitude} longitude={additionalDetails.longitude} setLatitude={(val)=>setAdditionalDetails((prev)=>({...prev,latitude:val}))} setLongitude={(val)=>setAdditionalDetails((prev)=>({...prev,longitude:val}))} />
      </div>

      <Button
        label={"Submit"}
        onClick={() => {
          onSubmit();
        }}
      />

    </div>


  );
}