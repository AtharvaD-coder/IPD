import { useEffect, useState } from "react";
import Input from "./input";
import { RentInfo } from "~~/types/rentInfo";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { RealEstate } from "~~/types/realEstate";
import Rentinfo from "~~/classes/RentInfo";
import Button from "./button";

export default function RentComponent({ tokenId }: { tokenId: number }) {
  const [rentInfo, setRentInfo] = useState<undefined | null | RentInfo>(null);
  const { data } = useScaffoldContractRead({
    contractName: 'RealEstateERC1155',
    functionName: 'realEstates',
    args: [BigInt(tokenId)],
  }) as any;
//   uint256 tokenId,uint256 numberOfMonths,uint256 rentof1Month,uint256 depositAmount,uint256 feesForLateInstallments
  const {writeAsync}=useScaffoldContractWrite({
    contractName:'RealEstateERC1155',
    functionName:'updateRentinfo',
    args:[BigInt(tokenId),BigInt(rentInfo?.noOfMonths||0),BigInt(rentInfo?.rentof1Month||0),BigInt(rentInfo?.depositAmount||0),BigInt(rentInfo?.feesForLateInstallments||0)]
  })

  useEffect(() => {
    if (data) {
      const rentinfo = { ...data[4] };
      rentinfo.depositAmount = Number(rentinfo.depositAmount);
      rentinfo.feesForLateInstallments = Number(rentinfo.feesForLateInstallments);
      rentinfo.noOfMonths = Number(rentinfo.noOfMonths);
      rentinfo.rentof1Month = Number(rentinfo.rentof1Month);
      console.log(rentinfo);
      setRentInfo(rentinfo); 
    }
  }, [data]);

  console.log(rentInfo);

  return (
    <>
      {rentInfo && (
        <div>
          <Input
            label={'enter No of months'}
            type='number'
            value={rentInfo?.noOfMonths}
            onChange={(newValue) => {
              setRentInfo({ ...rentInfo, noOfMonths: Number(newValue) });
            }}
          />
          <Input
            label={'enter rentof1Month'}
            type='number'
            value={rentInfo?.rentof1Month}
            onChange={(newValue) => {
              setRentInfo({ ...rentInfo, rentof1Month: Number(newValue) });
            }}
          />
          <Input
            label={'enter depositAmount'}
            type='number'
            value={rentInfo?.depositAmount}
            onChange={(newValue) => {
              setRentInfo({ ...rentInfo, depositAmount: Number(newValue) });
            }}
          />
          <Input
            label={'enter feesForLateInstallments'}
            type='number'
            value={rentInfo?.feesForLateInstallments}
            onChange={(newValue) => {
              setRentInfo({ ...rentInfo, feesForLateInstallments: Number(newValue) });
            }}
          />
          <Button label="change" onClick={()=>{writeAsync()}} />
        </div>
      )}
    </>
  );
}
