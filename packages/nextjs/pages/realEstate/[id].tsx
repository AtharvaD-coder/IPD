import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import RentComponent from "~~/components/custom_components/RentComponent";
import Button from "~~/components/custom_components/button";
import Input from "~~/components/custom_components/input";
import { AddressInput } from "~~/components/scaffold-eth";
import {  useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { RealEstate } from "~~/types/realEstate";


export default function RealEstate(){
    const router=useRouter();
    const {id}=router.query;
    console.log(id);
    const {address}=useAccount();
    const [data,setData]=useState<any>({});
    const [RealEstateData,setRealEstateData]=useState<RealEstate|null>(null);
    const [tranferinfo,setTranferInfo]=useState({amount:0,to:''});
    useEffect(()=>{
        async function getData(){
            const result =await axios.post('http://localhost:3000/api/getRealEstateById',{id:id});
            console.log(result.data.data);
            setData(result?.data?.data)
        }
        if(id){
            getData();
        }
      
    },[id]);

    const {data:balanceOfCurentUser}=useScaffoldContractRead({
        
       contractName:"RealEstateERC1155",
       functionName:"balanceOf",
       args:[address,data?.tokenId],
       watch:true
    })
    const {data:realEstate}=useScaffoldContractRead({
        
        contractName:"RealEstateERC1155",
        functionName:"realEstates",
        args:[data?.tokenId],
        watch:true
        
     }) as any;
     const { writeAsync } = useScaffoldContractWrite({
        contractName: "RealEstateERC1155",
        functionName: "transferTokens",
        args:[data?.tokenId,address,tranferinfo.to,BigInt(tranferinfo.amount)],
       
        
        onBlockConfirmation: txnReceipt => {
            console.log("tranfered")
          console.log("📦 Transaction blockHash", txnReceipt.blockHash);
        },
      });
     useEffect(()=>{
        if(realEstate){
            const newData:RealEstate={
        
                noOfTokens:realEstate[0],
                priceOf1Token:realEstate[1],
                tokenId:realEstate[2],
               status:realEstate[3],
               rentInfo:realEstate[4],

                realEstateBalance:realEstate[5]
       }
       setRealEstateData(newData);
       

        }
      
     },[realEstate])
     console.log(data.tokenId,'tokenId')
    
    
    return(
        <div>
            <div>Balance of user : {Number(balanceOfCurentUser)}</div>
            <div>percentage of RealEstateOwn : {(Number(balanceOfCurentUser)/Number(RealEstateData?.noOfTokens)*100)} %</div>
            <AddressInput value={tranferinfo.to} onChange={(newAddress)=>{setTranferInfo({...tranferinfo,to:newAddress})}} />
            <Input label={"enter amount to tranfer"} type="number" value={tranferinfo.amount} onChange={(newValue)=>{setTranferInfo({...tranferinfo,amount:Number(newValue)})}} />
           <Button label="Trnafer OwnerShip " onClick={()=>writeAsync()}/> 
           <div className="mt-6"></div>
          {data?.tokenId!==undefined &&  <RentComponent tokenId={data.tokenId} />}

          {data?.tokenId!==undefined && <Link href={'/proposals/'+data?.tokenId}><Button  label="View Proposals" onClick={()=>{}} /></Link>}
        

        </div>
    )



}