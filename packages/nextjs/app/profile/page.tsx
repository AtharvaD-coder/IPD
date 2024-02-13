'use client'
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import Networth from "./components/netWorth";
import PriceHistory from "./components/PriceHistory";
import Properties from "./components/myRealEstates";
import ProposalsAndBids from "./components/proposalsAndBids";



export default function MyRealEstates() {
  const { address } = useAccount();
  const { data: realEstates } = useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "getRealEstatesByOwner",
    args: [address ?? ''],
    watch:false
});


  return (
    <div className="w-[100%] h-[100%] m-5 flex">
      <div className=" w-[25vw] max-w-[25vw] bg-red-400 h-full">
        <div className="mt-3 mb-5">

          <BlockieAvatar address={address??''} size={window?window.innerHeight * 0.35:300} />
          </div>
          <div>

          <h1><span className="font-bold mb-3">Name :</span>{"Anurag"}</h1>
          <h1><span className="font-bold mb-3">Address :</span>{address}</h1>

        </div>

        <div>
        <ProposalsAndBids tokenIds={realEstates?.map((data)=>Number(data.tokenId)) ?? []} />
        </div>
      </div>
      <div className="ml-5 w-[100%] h-[100%]">
        <div className="border-2">
          <h1 className="text-3xl font-bold">Percentage breakdown</h1>
          <div>
          <Networth realEstates={realEstates}/>
          </div>
        </div>
        <div className="border-2">
          <h1 className="text-3xl font-bold">Percentage breakdown</h1>
          <div>
          <PriceHistory tokenIds={realEstates?.map((data)=>Number(data.tokenId)) ?? []}/>
          </div>
        </div>

        <div className="border-2">
          <h1 className="text-3xl font-bold">My real Estates</h1>
          <div>
          <Properties />
          </div>
        </div>
      </div>
    </div>
  );
}

















// 'use client'
// import { useEffect, useState } from "react"
// import axios from 'axios';
// import { useAccount } from "wagmi";
// import Card from "~~/components/custom_components/card";
// import Link from "next/link";
// import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

// export default function MyRealEstates() {
//     const { address } = useAccount();

//     interface RealEstate {
//         tokenId: bigint;
//         priceOf1Token: bigint; // Assuming these are bigint as well
//         noOfTokens: bigint; // Assuming this is bigint as well
//         // Add any other properties that a real estate object might have
//       }

//     // const [realEstates, setRealEstates] = useState<(bigint | undefined)[]>([]);
//     const [realEstates, setRealEstates] = useState<RealEstate[]>([]);


//     // const PropertyDetails = ({ params }: any) => {
//     //     const { data: realEstateArray } = useScaffoldContractRead({
//     //         contractName: "RealEstateERC1155",
//     //         functionName: "getRealEstate",
//     //         args: [params?.id ?? 0],
//     //         watch: true
//     //     });
//     // }


//     // useEffect(() => {
//     //     async function fetchForomDb() {
//     //         try {
//     //             const res = await axios.post('http://localhost:3000/api/getAllRealEstatesWithAddress', { address });
//     //             console.log(res.data.data);
//     //             setRealEstates(res?.data?.data);
//     //         }
//     //         catch (error) {
//     //             console.log(error);

//     //         }


//     //     }
//     //     fetchForomDb();

//     // }, [])

//     useEffect(() => {
//         const { data: ownedRealEstateIds } = useScaffoldContractRead({
//             contractName: "RealEstateERC1155",
//             functionName: "getRealEstatesByOwner",
//             args: [address],
//             watch: true
//         });
    
//         if (ownedRealEstateIds) {
//             // Filter out any undefined values
//             const definedIds = ownedRealEstateIds.filter((id): id is bigint => id !== undefined);
            
//             // Now you can safely map over definedIds
//             const fetchRealEstateDetails = async () => {
//                 const detailsPromises = definedIds.map((tokenId) =>
//                     useScaffoldContractRead({
//                         contractName: "RealEstateERC1155",
//                         functionName: "getRealEstate",
//                         args: [tokenId],
//                         watch: true
//                     })
//                 );
    
//                 const detailsResults = await Promise.all(detailsPromises);
//                 const realEstatesDetails = detailsResults.map((result) => result.data);
//                 setRealEstates(realEstatesDetails);
//             };
    
//             fetchRealEstateDetails();
//         }
//     }, [address]);
    


//     return (

//         <div className="w-full  justify-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
//             {
//                 realEstates?.map((data: any, index) => {
//                     return (
//                         <div>
//             {realEstates.map((property, index) => (
//                  <div key={property?.tokenId || index}>
//                  <h2>Property ID: {property?.tokenId}</h2>
//                  <p>Price per Token: {property?.priceOf1Token}</p>
//                  <p>Total Tokens: {property?.noOfTokens}</p>
//                  {/* Additional property details */}
//              </div>
//             ))}
//         </div>
//                     )
//                 })
//             }

//         </div>
//     )

// }