"use client";

import React, { useEffect, useState } from "react";
import Property from "../../components/custom_components/Property";
import { setFilterValues, setLoading } from "../redux/actions";
import { setPropertiesForRent, setPropertiesForSale } from "../redux/actions";
import { RootState } from "../redux/reducers";
import FilterComponent from "./components/filterComponent";
import { Box, Flex, Select, Text, cookieStorageManager } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce, useFetch, useLocalStorage } from "usehooks-ts";
import { Salsa } from "next/font/google";
import { formatEther } from "viem";


const realEstates = () => {
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(()=>{
    async function a() {
      const api_key = '23e8773154c7058e89e5cd814c46adf13122c90253a00c486d98f6905899dd0b';

      const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${api_key} `);
      const data = await response.json();
    
      // Extract the exchange rate from the API response
      const exchangeRate = data.USD;
      setConversionRate(exchangeRate);
    
    }
    a();
  },[])
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    minHeight: "95vh",
  };

  const sidebarStyle: React.CSSProperties = {
    flex: 1.5,
    backgroundColor: "#9bb0c4",
    color: "#333",
    paddingTop: "20px",
    paddingLeft: "5px",
    paddingRight: "5px",
  };

  const btnstyle = {
    marginLeft: "10px",
    marginRight: "10px",
    gap: "10px",
  };

  const bedsnbath = {
    marginLeft: "10px",
    marginRight: "10px",
    gap: "10px",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    // marginLeft: "40rem",
    marginTop: "20px",
    width: "300px",
    backgroundColor: "#c5d4e3",
    color: "#333",
    boxShadow: "3px 0px 14px -3px rgba(110,123,179,0.73)",
    "::placeholder": {
      color: "#333",
    },
  };

  const hrStyle = {
    marginTop: "8px",
    width: "100%",
    color: "#c2c7cc",
  };

  const titleStyle = {
    fontSize: "12px",
  };

  const applyStyle = {
    marginTop: "10px",
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, purpose: string) => {
    dispatch(setFilterValues({ ...filterValues, purpose }));
  };

  const cardContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "80px",
    flex: 6,
    padding: "20px",
    flexWrap: "wrap",
    overflowY: "scroll",
    height: "80vh",
    width: "100%",
    margin: 3,
    paddingRight: "15px", // Adjust as needed based on your design
  };

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    backgroundColor: "#4F709C",
    height: "150px",
  };

  const headingStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  };

  const textStyle = {
    fontSize: "1.25rem",
  };
  const filterPropertiesByPrice = (properties: any[], price: any) => {
    return properties.filter((property: any) => (Number(formatEther(property.price))*Number(conversionRate)) <= price[1] && (Number(formatEther(property.price))*Number(conversionRate))>= price[0]);  }
  const filterPropertiesByArea = (properties: any[], area: any) => {
    return properties.filter((property: any) => (property.area <= area[1] && property.area >= area[0]));
  }
  const filterPropertiesByBathrooms = (properties: any[], selectedBathrooms: number): any[] => {
    if(selectedBathrooms===0){
      return properties
    }
    else if (selectedBathrooms === 4) {
      return properties.filter((property: any) => property.noOfBathrooms >= 4);
    } else {
      return properties.filter((property: any) => property.noOfBathrooms === selectedBathrooms);
    }
  };

  const filterPropertiesByBeds = (properties: any[], selectedBedrooms: number): any[] => {
    if(selectedBedrooms===0){
      return properties
    }
    else if (selectedBedrooms === 4) {
      return properties.filter((property: any) => property.noOfBedrooms >= 4);
    } else {
      return properties.filter((property: any) => property.noOfBedrooms === selectedBedrooms);
    }
  };
  const dispatch = useDispatch();

  const filterValues = useSelector((state: RootState) => state.filterValues);
  const loading = useSelector((state: RootState) => state.loading);
  const propertiesForSale = useSelector((state: RootState) => state.propertiesForSale);
  const propertiesForRent = useSelector((state: RootState) => state.propertiesForRent);
  const debouncedFilterValues = useDebounce(filterValues, 300); // 300ms debounce time
  console.log(debouncedFilterValues.beds,"bedsssssss")
  // const { data, error } = useFetch<any>(`${process.env.NEXT_PUBLIC_URLL}/api/getAllRealEstates`);
  const [data, setData] = useState<any>([]);

  useEffect(()=>{
    async function a() {
      try{
        
        const res= await fetch(`${process.env.NEXT_PUBLIC_URLL}/api/getAllRealEstates`,{
          cache: "no-cache",
        });
        const data = await res.json();
        if(data){
          console.log(data,"dataaaasdasdasdasd")
          setData(data);
        }
      }
      catch (error){
        console.log("no data", error.toString())


      }
    }
    a()
  },[])

  
  console.log(data, process.env.NEXT_PUBLIC_URLL, process.env.NEXT_PUBLIC_VERCEL_URL, "dataaawww");

  useEffect(() => {
    dispatch(setLoading(true));
    if (data?.data?.length > 0) {
      let propertiesForSale = data.data.filter((property: any) => property.purpose === "for-sale");
      let propertiesForRent = data.data.filter((property: any) => property.purpose === "for-rent");
      console.log(data.data, "aaaaaaaaaaadddddddddddd")


      dispatch(setPropertiesForSale(propertiesForSale));
      dispatch(setPropertiesForRent(propertiesForRent));

      // Set default filter for properties for sale
      dispatch(setFilterValues({ ...filterValues, purpose: "for-sale" }));
    }

    dispatch(setLoading(false));
  }, [data, dispatch]);
  useEffect(() => {
    if (data?.data?.length > 0) {
      console.log("whoooo", debouncedFilterValues.price);
      let propertiesForSale = data.data.filter((property: any) => property.purpose === "for-sale");
      let propertiesForRent = data.data.filter((property: any) => property.purpose === "for-rent");

      // let pRent = filterPropertiesByPrice(propertiesForRent, debouncedFilterValues.price);
      // let pSale = filterPropertiesByPrice(propertiesForSale, debouncedFilterValues.price);
      let pRent=propertiesForRent;
      let pSale=propertiesForSale;
      console.log(propertiesForSale,"saleee")

      pRent = filterPropertiesByArea(pRent, debouncedFilterValues.area);
      pSale = filterPropertiesByArea(pSale, debouncedFilterValues.area);
      // console.log(pRent, "propertiesForSale");

      pRent = filterPropertiesByBathrooms(pRent, debouncedFilterValues.bathrooms);
      pSale = filterPropertiesByBathrooms(pSale, debouncedFilterValues.bathrooms);
      // // console.log(pRent,"its baths yaaay!");
  
  
      pRent = filterPropertiesByBeds(pRent, debouncedFilterValues.beds);
      pSale = filterPropertiesByBeds(pSale, debouncedFilterValues.beds);
      console.log(pRent,"its beds yaaay!");

      dispatch(setPropertiesForSale(pSale));
      dispatch(setPropertiesForRent(pRent));
    }
  }, [debouncedFilterValues, data, dispatch]);

 

  return (
    <div style={containerStyle}>
      <FilterComponent />
      {!loading ? (
        <div
          style={cardContainerStyle}
          className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] justify-center"
        >

          <div className="flex flex-wrap w-[100%] justify-around">
            {filterValues.purpose === "for-sale"
              ? propertiesForSale.map((property: any) => <Property property={property} key={property.tokenId} />)
              : propertiesForRent.map((property: any) => <Property property={property} key={property.tokenId} />)}
          </div>

        </div>
      ) : (
        <div className="flex justify-center items-center">Loading...</div>
      )}
    </div>
  );
};

export default realEstates;

