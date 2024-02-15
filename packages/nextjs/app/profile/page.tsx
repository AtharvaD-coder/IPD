"use client";

import { useEffect, useState } from "react";
import PriceHistory from "./components/PriceHistory";
import Properties from "./components/myRealEstates";
import NameModal from "./components/nameeModal";
import Networth from "./components/netWorth";
import ProposalsAndBids from "./components/proposalsAndBids";
import VotesComponent from "./components/votes";
import { useAccount } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import axios from "axios";
import { CardBox } from "~~/components/custom_components/cardComponent";

export default function MyRealEstates() {
  const [modalOpen, setModalOpen] = useState(0);
  const { address } = useAccount();
  const { data: realEstates } = useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "getRealEstatesByOwner",
    args: [address ?? ""],
    watch: false,
  });


  const [name, setName] = useState(address);
  useEffect(() => {
    async function fetchName() {
      try {
        const res = await axios.post("http://localhost:3000/api/getUserName", { address });
        console.log(res.data.name, "pleaseee pleasee")
        setName(res?.data?.name);

      } catch (error) {
        console.log("im done")
        console.error(error);
      }
    }
    if (address)
      fetchName();
  }, [address])


  return (
    <div className="w-[100%] h-[100%] m-5 flex">
      <NameModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className=" w-[25vw] max-w-[25vw]  h-full">
        <CardBox>
          <div className="mt-3 mb-5">
            <BlockieAvatar address={address ?? ""} size={window ? window.innerHeight * 0.35 : 300} />
          </div>
          <div>
            <h1>
              <span className="font-bold mb-3">Name :</span>
              {name}
            </h1>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary m-3 align-end">Edit</button>

            <h1>
              <span className="font-bold mb-3">Address :</span>
              {address}
            </h1>

          </div>
        </CardBox>

        <div>
          <ProposalsAndBids tokenIds={realEstates?.map(data => Number(data.tokenId)) ?? []} />
        </div>
      </div>
      <div className="ml-5 w-[100%] h-[100%]">
        <div className="flex">
          <div className="w-fit">

            <div>
              <Networth realEstates={realEstates} />
            </div>
          </div>
          <div className="m-3">
            <VotesComponent address={address} />
          </div>
        </div>
        <div >

          <PriceHistory tokenIds={realEstates?.map(data => Number(data.tokenId)) ?? []} />

        </div>



        <div>
          <Properties />
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
