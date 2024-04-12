import { useEffect, useState } from "react";
import { convertEthToUsd } from "~~/components/custom_components/Property";
import { CardBox } from "~~/components/custom_components/cardComponent";

export default function RentInfoCard({

    noOfMonths,
    rentof1Month,
    depositAmount,
    feesForLateInstallments,
}: any) {
    
    const [rent,setRent]=useState('')
    const [deposit,setDeposit]=useState('')
    const [fees,setFees]=useState('')


    useEffect(()=>{
        async function get() {
            console.log(rentof1Month,depositAmount,feesForLateInstallments, "   ")
           const a= await convertEthToUsd(Number(Number(rentof1Month)*(10**18)))
              const b= await convertEthToUsd(Number(depositAmount*10**18))
                const c= await convertEthToUsd(Number(feesForLateInstallments*10**18))
                console.log(a,b,c," aacscasf")
                setRent(a)
                setDeposit(b)
                setFees(c)

        }
        get()
    },[rentof1Month,depositAmount,feesForLateInstallments])
    

    return (
        <CardBox className='w-[100%]'>
            <h1 className="text-3xl font-bold mb-5">Property Details</h1>
            <div className="max-w-[100%] flex flex-wrap border-2 border-black rounded-xl ">

                <div className="flex items-center " >
                    <div className="  p-4 w-fit  m-3">
                        <p className="mb-0 opacity-75 text-md">Number of Months</p>
                        <p className="mt-0 text-xl font-bold">{noOfMonths}</p>
                    </div>
                    <div className="h-20 border-2 w-0.5 border-gray-400 rounded-full  "></div>

                </div>
                <div className="flex items-center " >
                    <div className="   p-4 w-fit m-3">
                        <p className="mb-0 opacity-75 text-md">Rent of 1 Month</p>
                        <p className="mt-0 text-xl font-bold">{rent}</p>
                    </div>
                    <div className="h-20 border-2 w-0.5 border-gray-400 rounded-full  "></div>

                </div>
                <div className="flex items-center " >
                    <div className="  p-4 w-fit m-3">
                        <p className="mb-0 opacity-75 text-md">Deposit Amount</p>
                        <p className="mt-0 text-xl font-bold">{deposit}</p>
                    </div>
                    <div className="h-20 border-2 w-0.3 border-gray-400 rounded-full  "></div>

                </div>

                <div className="flex items-center " >
                    <div className=" p-4 w-fit m-3">
                        <p className="mb-0 opacity-75 text-md">Fees for Late Installments</p>
                        <p className="mt-0 text-xl font-bold">{fees}</p>
                    </div>

                </div>

            </div>
        </CardBox>
    );
}
