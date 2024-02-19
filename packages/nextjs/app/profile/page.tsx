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
            <BlockieAvatar address={address ?? ""} size={typeof window !== "undefined" ? window.innerHeight * 0.35 : 300} />
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

