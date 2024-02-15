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
        const res = await axios.post("http://localhost:3000/api/getAllRealEstatesWithAddress", { address });
        console.log(res.data.data, "sadfsdfdsfdsfdf");
        setRealEstates(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchForomDb();
  }, [address]);
  return (
    <CardBox>
      <h1 className="text-3xl font-bold">My real Estates</h1>
    <div className="w-full flex justify-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">

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
