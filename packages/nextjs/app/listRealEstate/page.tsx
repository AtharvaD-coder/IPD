"use client";

import { useState,useEffect } from "react";
import ImageUploader from "./components/imageUploader";
import NumberInput from "./components/numberInputs";
import Button from "~~/components/custom_components/button";
import Input from "~~/components/custom_components/input";
import { AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import Radio from "./components/Radio";
import Label from "~~/components/custom_components/labels";
import { useAccount } from "wagmi";

interface ListDetails {
  owner: string;
  initalAmountOfTokens: number;
  priceOf1Token: number;
}

export default function ListRealEstate() {
  const { address } = useAccount();

  const [ListDetails, setListDetails] = useState<ListDetails>({ owner: address??"", initalAmountOfTokens: 0, priceOf1Token: 0 });
  console.log(ListDetails)
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "RealEstateERC1155",
    functionName: "listRealEstate",
    args: [BigInt(ListDetails.initalAmountOfTokens), ListDetails.owner, BigInt(ListDetails.priceOf1Token)],

    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  useEffect(()=>{
    setListDetails({...ListDetails,owner:address??""})
  },[address])

  useScaffoldEventSubscriber({
    contractName: "RealEstateERC1155",
    eventName: "RealEstateListed",
    listener: logs => {
      logs.map(log => {
        const { tokenId, noOfTokens, owners, priceOf1Token } = log.args;
        console.log("📡 GreetingChange event", { tokenId, noOfTokens, owners, priceOf1Token });
      });
    },
  });

  return (
    <div className="p-9">
      {/* <AddressInput
        placeholder="enter Owner Address"
        value={ListDetails.owner}
        onChange={prevValue => {
          setListDetails({ ...ListDetails, owner: prevValue })
        }}
      /> */}
      <div className="horizontal-1 flex justify-between items-center w-[90vw] ">
        <div className="m-2 w-[30vw]">
          <ImageUploader label={"Upload Image"} />
        </div>
        <div className=" w-[30vw] justify-center items-center flex flex-col ">
          <NumberInput value={ListDetails.initalAmountOfTokens} onChange={(e:any,val:any)=>{setListDetails({...ListDetails,initalAmountOfTokens:Number(val)})}} label={"number of tokens of your property"} />
          <NumberInput value={ListDetails.priceOf1Token} onChange={(e:any,val:any)=>{setListDetails({...ListDetails,priceOf1Token:Number(val)})}} label={"Price of 1 Token"} />
          <NumberInput label={"Square Feet"} />
        </div>
      </div>
      <div className="horizontal-2 w-[90vw] " >
        <Label>Short description</Label>
        <textarea className="textarea rounded-3xl textarea-bordered w-full" placeholder="Short Description"></textarea>

      </div>

      <div className="horizontal-3 w-[90vw]">
      <Radio label={"Type Of property"} options={["Residential","Commercial","Vacation Home","PG"]}/>
      <Radio label={"For"} options={["Sale","Rent"]}/>
      <Radio label={"Size"} options={["1 BHK","2 BHK","3BHK","4BHK"]}/>
      
      </div>

     
      <Button
        label={"Submit"}
        onClick={() => {
          writeAsync();
        }}
      />
    </div>
  );
}
