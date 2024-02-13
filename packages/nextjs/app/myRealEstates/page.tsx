'use client'

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import Card from "~~/components/custom_components/card";

interface RealEstate {
  tokenId: bigint;
  priceOf1Token: bigint;
  noOfTokens: bigint;
  // Add any other properties that a real estate object might have
}

export default function MyRealEstates() {
  const { address } = useAccount();
  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);

  useEffect(() => {
    const fetchRealEstateDetails = async () => {
      const { data: ownedRealEstateIds } = useScaffoldContractRead({
        contractName: "RealEstateERC1155",
        functionName: "getRealEstatesByOwner",
        args: [address],
        watch: true
      });

      if (ownedRealEstateIds) {
        const definedIds = ownedRealEstateIds.filter((id): id is bigint => id !== undefined);

        const detailsPromises = definedIds.map((tokenId) =>
          useScaffoldContractRead({
            contractName: "RealEstateERC1155",
            functionName: "getRealEstate",
            args: [tokenId],
            watch: true
          })
        );

        const detailsResults = await Promise.all(detailsPromises);
        const realEstatesDetails = detailsResults.map((result) => result.data);
        setRealEstates(realEstatesDetails as any);
      }
    };

    fetchRealEstateDetails();
  }, [address]);

  return (
    <div className="w-full justify-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
      {realEstates.map((property, index) => (
        <Card key={property.tokenId.toString()} >
          <h2>Property ID: {property.tokenId.toString()}</h2>
          <p>Price per Token: {property.priceOf1Token.toString()}</p>
          <p>Total Tokens: {property.noOfTokens.toString()}</p>
          {/* Additional property details */}
        </Card>
      ))}
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