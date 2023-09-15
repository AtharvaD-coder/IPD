'use client'
import { useState } from "react";
import Button from "~~/components/custom_components/button";
import Input from "~~/components/custom_components/input";
import { AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

interface ListDetails{
    owner:string,
    initalAmountOfTokens:number,
    priceOf1Token:number

    
}

export default function ListRealEstate(){
   

    const [ListDetails,setListDetails]=useState<ListDetails>({owner:"",initalAmountOfTokens:0,priceOf1Token:0});
    const { writeAsync } = useScaffoldContractWrite({
        contractName: "RealEstateERC1155",
        functionName: "listRealEstate",
        args: [  BigInt(ListDetails.initalAmountOfTokens),
            ListDetails.owner,
            BigInt(ListDetails.priceOf1Token)
        ],
        
        onBlockConfirmation: txnReceipt => {
          console.log("📦 Transaction blockHash", txnReceipt.blockHash);
        },
      });

      useScaffoldEventSubscriber({
        contractName: "RealEstateERC1155",
        eventName: "RealEstateListed",
        listener: logs => {
          logs.map(log => {
            const{tokenId,noOfTokens,owners,priceOf1Token}=log.args
            console.log("📡 GreetingChange event", {tokenId,noOfTokens,owners,priceOf1Token});
          });
        },
      });

     


    return(
        <div>
           
            <AddressInput placeholder="enter Owner Address" value={ListDetails.owner} onChange={(prevValue)=>{setListDetails({...ListDetails,owner:prevValue})}} />
             <Input label={'InitialAmountofTokens'} value={ListDetails.initalAmountOfTokens} onChange={(prevValue)=>{setListDetails({...ListDetails,initalAmountOfTokens:Number(prevValue)})}}  type='number' />
             <Input label={'price of 1 token'} value={ListDetails.priceOf1Token} onChange={(prevValue)=>{setListDetails({...ListDetails,priceOf1Token:Number(prevValue)})}}  type='number' />
             <Button label={'Submit'} onClick={()=>{writeAsync()}} />
        </div>
    )


}