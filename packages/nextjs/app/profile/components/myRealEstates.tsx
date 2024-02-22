import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAccount } from "wagmi";
import Property from "~~/components/custom_components/Property";
import Card from "~~/components/custom_components/card";
import { CardBox } from "~~/components/custom_components/cardComponent";

export default function Properties() {
  const { address } = useAccount();
  const [realEstates, setRealEstates] = useState([]);

  useEffect(() => {
    async function fetchForomDb() {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_URLL}/api/getAllRealEstatesWithAddress`, { address });
        console.log(res.data.data, "sadfsdfdsfdsfdf");
        setRealEstates(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchForomDb();
  }, [address]);
  return (
    <CardBox className={"w-[100%]"}>
      <h1 className="text-3xl font-bold">My real Estates</h1>
    <div className="w-[100%] flex flex-wrap justify-around">

      {realEstates?.map((data: any, index) => {
        return (
          <div key={index}>
            <Property key={index} property={data} />
          </div>
        );
      })}
    </div>
    </CardBox>
  );
}
