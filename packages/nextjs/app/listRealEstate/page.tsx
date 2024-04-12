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
import { useRouter } from 'next/navigation';
import { convertEthToUsd } from "~~/components/custom_components/Property";

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
  const router = useRouter();

  const [additionalDetails, setAdditionalDetails] = useState<any>({
    description: "",
    BhkType: "",
    type: "",
    amenities: [],
    area: 0,
    noOfBathrooms: 0,
    noOfBedrooms: 0,
    latitude: 19.0760,
    longitude: 72.8777,
  });

  console.log(additionalDetails, "additi");
  const [isForRent, setIsForRent] = useState(false);

  useEffect(() => {
    setListDetails({ ...ListDetails, owner: address ?? "" });
  }, [address]);

  const { data: tokenIdCounter } = useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "getTokenIdCounter",

  });

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
      console.log(tokenIdCounter, "tokenIdCounter")

      router.push('/dashboard/' + tokenIdCounter)
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
      console.log(tokenIdCounter, "tokenIdCounter")
      router.push('/dashboard/' + tokenIdCounter)
    },
  });



  console.log(parseUnits(`${1}`, "ether"), "data asfasf");

  const handleRentInputChange = (key: string, value: number) => {
    setListDetails(prevState => ({
      ...prevState,
      rentProps: {
        ...prevState.rentProps,
        [key]: value
      }
    }));
  };

  const onSubmit = async () => {
  const api_key = '23e8773154c7058e89e5cd814c46adf13122c90253a00c486d98f6905899dd0b';
  // const api_key = '23e8773154c7058e89e5cd814c46adf13122c90253a00c486d98f6905899dd0b';
  // const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
  // const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${api_key} `);
  const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${api_key} `);
  const dut = await response.json();

  // Extract the exchange rate from the API response
  const exchangeRate = dut.USD;

  // Convert ETH to USD
  
    console.log("hello", {
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
      latitude: additionalDetails.latitude,
      longitude: additionalDetails.longitude,
      area: additionalDetails.area,

    });
    if (isForRent) {
      listRealEstateForRent({
        args: [
          BigInt(ListDetails?.initialAmountOfTokens ?? 0),
          ListDetails.owner,
          BigInt(parseUnits(`${ListDetails?.priceOf1Token ?? 0}`, "ether")),
          BigInt(ListDetails.rentProps?.numberOfMonths ?? 0),
          BigInt((Number(ListDetails.rentProps?.rentPerMonth ?? 0)/exchangeRate)*10**18),
        BigInt((Number(ListDetails.rentProps?.depositAmount ?? 0)/exchangeRate)*10**18),
        BigInt((Number(ListDetails.rentProps?.lateInstallmentFees ?? 0)/exchangeRate)*10**18),
          BigInt(300000000000 ?? 0),
          data,
        ],
      });
      console.log("weee",(Number(ListDetails.rentProps?.rentPerMonth )/exchangeRate)*10**18)
      console.log("rerewent",
        BigInt(ListDetails?.initialAmountOfTokens ?? 0),
        ListDetails.owner,
        BigInt(parseUnits(`${ListDetails?.priceOf1Token ?? 0}`, "ether")),
        BigInt(ListDetails.rentProps?.numberOfMonths ?? 0),
        BigInt((Number(ListDetails.rentProps?.rentPerMonth ?? 0)/exchangeRate)*10**18),
        BigInt((Number(ListDetails.rentProps?.depositAmount ?? 0)/exchangeRate)*10**18),
        BigInt((Number(ListDetails.rentProps?.lateInstallmentFees ?? 0)/exchangeRate)*10**18),
        BigInt(300000000000 ?? 0),
      )

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
  const [loading, setLoading] = useState(false); // Loading state

  const [priceInUsd, setPriceInUsd] = useState('0')

  const debounce = (func: any, delay: number) => {
    let timeoutId: any;
    return function (...args: any) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };
  useEffect(() => {
    setLoading(true);
    const debouncedConvertEthToUsd = debounce(async () => {
      const convertedPrice = await convertEthToUsd(Number(ListDetails.priceOf1Token * ListDetails.initialAmountOfTokens * 10 ** 18));
      setPriceInUsd(convertedPrice);
      setLoading(false);
    }, 300); // Debounce delay of 300ms

    debouncedConvertEthToUsd();
  }, [ListDetails.priceOf1Token, ListDetails.initialAmountOfTokens]);


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
            <div className=" flex justify-between px-5">
              <h1 className="text-lg font-bold">Price</h1>
              {
                loading ?
                  (
                    <h1 className="text-xl">Loading...</h1>
                  ) : (
                    <h1 className="text-xl">$ {priceInUsd}</h1>
                  )
              }
            </div>
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
                setAdditionalDetails((prev: any) => ({ ...prev, BhkType: val + " Bhk" }));
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


            { isForRent&&<CardBox >
              <h1 className="text-xl font-bold" > Rent Info</h1>

              <div className="horizontal-2 w-[90vw] ">
                <NumberInput
                  label={"Number of Months"}
                  value={ListDetails.rentProps?.numberOfMonths || 0}
                  onChange={(e: any, val: any) => handleRentInputChange("numberOfMonths", val)}
                />
                <NumberInput
                  label={"Rent per Month"}
                  value={ListDetails.rentProps?.rentPerMonth || 0}
                  onChange={(e: any, val: any) => handleRentInputChange("rentPerMonth", val)}
                />
                <NumberInput
                  label={"Deposit Amount"}
                  value={ListDetails.rentProps?.depositAmount || 0}
                  onChange={(e: any, val: any) => handleRentInputChange("depositAmount", val)}
                />
                <NumberInput
                  label={"Fees for Late Installments"}
                  value={ListDetails.rentProps?.lateInstallmentFees || 0}
                  onChange={(e: any, val: any) => handleRentInputChange("lateInstallmentFees", val)}
                />

              </div>
            </CardBox>}
          </motion.div>

        )}
      </AnimatePresence>


      <AmenitySelector selectedAmenities={additionalDetails.amenities} setSelectedAmenities={handleAmenitiesChange} />


      <div>
        <MapboxMap latitude={additionalDetails.latitude} longitude={additionalDetails.longitude} setLatitude={(val) => setAdditionalDetails((prev) => ({ ...prev, latitude: val }))} setLongitude={(val) => setAdditionalDetails((prev) => ({ ...prev, longitude: val }))} />
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