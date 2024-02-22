"use client";

import React, { useEffect, useState } from "react";
import Property from "../../components/custom_components/Property";
import { setFilterValues, setLoading } from "../redux/actions";
import { setPropertiesForRent, setPropertiesForSale } from "../redux/actions";
import { RootState } from "../redux/reducers";
import FilterComponent from "./components/filterComponent";
import { Box, Flex, Select, Text, cookieStorageManager } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch, useLocalStorage } from "usehooks-ts";
import { CardBox } from "~~/components/custom_components/cardComponent";

interface HomeProps {
  propertiesForSale: Array<any>;
  propertiesForRent: Array<any>;
}

const realEstates: React.FC<HomeProps> = () => {
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
    return properties.filter((property: any) => property.price/10**18 <= price[1] && property.price/10**18  >= price[0]);
  }
  const filterPropertiesByArea = (properties: any[], area:any) => {
    return properties.filter((property: any) => (property.area <= area[1] && property.area >= area[0])  );
  }




  const dispatch = useDispatch();





  const filterPropertiesByBathrooms = (properties: any[], selectedBathrooms: number): any[] => {
    if (selectedBathrooms === 4) {
      return properties.filter((property: any) => property.bathrooms >= 4);
    } else {
      return properties.filter((property: any) => property.bathrooms === selectedBathrooms);
    }
  };

  const filterPropertiesByBeds = (properties: any[], selectedBathrooms: number): any[] => {
    if (selectedBathrooms === 4) {
      return properties.filter((property: any) => property.bathrooms >= 4);
    } else {
      return properties.filter((property: any) => property.bathrooms === selectedBathrooms);
    }
  };
  

  const filterValues = useSelector((state: RootState) => state.filterValues);
  const loading = useSelector((state: RootState) => state.loading);
  const propertiesForSale = useSelector((state: RootState) => state.propertiesForSale);
  const propertiesForRent = useSelector((state: RootState) => state.propertiesForRent);

 const { data, error } = useFetch<any>(`${process.env.NEXT_PUBLIC_URLL}/api/getAllRealEstates`);
  console.log(data, "dataaawww");

  useEffect(() => {
    dispatch(setLoading(true));
    if (data?.data?.length > 0) {
      let propertiesForSale = data.data.filter((property: any) => property.purpose === "for-sale");
      let propertiesForRent = data.data.filter((property: any) => property.purpose === "for-rent");
        console.log(data.data,"aaaaaaaaaaadddddddddddd")

      dispatch(setPropertiesForSale(propertiesForSale));
      dispatch(setPropertiesForRent(propertiesForRent));

      // Set default filter for properties for sale
      dispatch(setFilterValues({ ...filterValues, purpose: "for-sale" }));
    }

    dispatch(setLoading(false));
  }, [data, dispatch]);
 
  useEffect(() => {
    if (data?.data?.length > 0) {
    console.log("whoooo",filterValues.price)
    let propertiesForSale = data.data.filter((property: any) => property.purpose === "for-sale");
      let propertiesForRent = data.data.filter((property: any) => property.purpose === "for-rent");

   let  pRent = filterPropertiesByPrice(propertiesForRent,filterValues.price );
    let pSale = filterPropertiesByPrice(propertiesForSale,filterValues.price );


    pRent=filterPropertiesByArea(pRent,filterValues.area);
    pSale=filterPropertiesByArea(pSale,filterValues.area);
    console.log(pRent,"propertiesForSale");

    pRent = filterPropertiesByBathrooms(pRent, filterValues.bathrooms);
    pSale = filterPropertiesByBathrooms(pSale, filterValues.bathrooms);
    console.log(pRent,"its baths yaaay!");


    pRent = filterPropertiesByBeds(pRent, filterValues.beds);
    pSale = filterPropertiesByBeds(pSale, filterValues.beds);
    console.log(pRent,"its beds yaaay!");

    dispatch(setPropertiesForSale(pSale));
    dispatch(setPropertiesForRent(pRent));
    }
  }
  , [filterValues])

  return (
    <div style={containerStyle}>
      <CardBox>
      <FilterComponent />
      </CardBox>
      {!loading ? (
        <div
          style={cardContainerStyle}
          className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          <Flex>
            <Flex flexWrap="wrap" className="w-[70vw] flex justify-between">
              {filterValues.purpose === "for-sale"
                ? propertiesForSale.map((property: any) => <Property property={property} key={property._id} />)
                : propertiesForRent.map((property: any) => <Property property={property} key={property._id} />)}
            </Flex>
          </Flex>
        </div>
      ) : (
        <div className="flex justify-center items-center">Loading...</div>
      )}
    </div>
  );
};

export default realEstates;




// "use client";

// import React, { useEffect, useState } from "react";
// import Property from "../../components/custom_components/Property";
// import { setFilterValues, setLoading } from "../redux/actions";
// import { setPropertiesForRent, setPropertiesForSale } from "../redux/actions";
// import { RootState } from "../redux/reducers";
// import FilterComponent from "./components/filterComponent";
// import { Box, Flex, Select, Text, cookieStorageManager } from "@chakra-ui/react";
// import { useDispatch, useSelector } from "react-redux";
// import { useFetch, useLocalStorage } from "usehooks-ts";
// import { CardBox } from "~~/components/custom_components/cardComponent";

// interface HomeProps {
//   propertiesForSale: Array<any>;
//   propertiesForRent: Array<any>;
// }

// const realEstates: React.FC<HomeProps> = () => {
//   const containerStyle: React.CSSProperties = {
//     display: "flex",
//     flexDirection: "row",
//     minHeight: "95vh",
//   };

//   const sidebarStyle: React.CSSProperties = {
//     flex: 1.5,
//     backgroundColor: "#9bb0c4",
//     color: "#333",
//     paddingTop: "20px",
//     paddingLeft: "5px",
//     paddingRight: "5px",
//   };

//   const btnstyle = {
//     marginLeft: "10px",
//     marginRight: "10px",
//     gap: "10px",
//   };

//   const bedsnbath = {
//     marginLeft: "10px",
//     marginRight: "10px",
//     gap: "10px",
//   };

//   const inputStyle = {
//     padding: "10px",
//     fontSize: "1rem",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     // marginLeft: "40rem",
//     marginTop: "20px",
//     width: "300px",
//     backgroundColor: "#c5d4e3",
//     color: "#333",
//     boxShadow: "3px 0px 14px -3px rgba(110,123,179,0.73)",
//     "::placeholder": {
//       color: "#333",
//     },
//   };

//   const hrStyle = {
//     marginTop: "8px",
//     width: "100%",
//     color: "#c2c7cc",
//   };

//   const titleStyle = {
//     fontSize: "12px",
//   };

//   const applyStyle = {
//     marginTop: "10px",
//   };

//   const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>, purpose: string) => {
//     dispatch(setFilterValues({ ...filterValues, purpose }));
//   };

//   const cardContainerStyle: React.CSSProperties = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "80px",
//     flex: 6,
//     padding: "20px",
//     flexWrap: "wrap",
//     overflowY: "scroll",
//     height: "80vh",
//     width: "100%",
//     margin: 3,
//     paddingRight: "15px", // Adjust as needed based on your design
//   };

//   const cardStyle = {
//     border: "1px solid #ccc",
//     padding: "16px",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//     cursor: "pointer",
//     backgroundColor: "#4F709C",
//     height: "150px",
//   };

//   const headingStyle = {
//     fontSize: "1.5rem",
//     fontWeight: "bold",
//     marginBottom: "0.5rem",
//   };

//   const textStyle = {
//     fontSize: "1.25rem",
//   };

//   const dispatch = useDispatch();

//   const filterPropertiesByBathrooms = (properties: any[], selectedBathrooms: number): any[] => {
//     if (selectedBathrooms === 4) {
//       // Filter properties with 4 or more bathrooms
//       return properties.filter((property: any) => property.bathrooms >= 4);
//     } else {
//       // Filter properties with the exact number of bathrooms
//       return properties.filter((property: any) => property.bathrooms === selectedBathrooms);
//     }
//   };
  

//   const filterValues = useSelector((state: RootState) => state.filterValues);
//   const loading = useSelector((state: RootState) => state.loading);
//   const propertiesForSale = useSelector((state: RootState) => state.propertiesForSale);
//   const propertiesForRent = useSelector((state: RootState) => state.propertiesForRent);

//   const { data, error } = useFetch<any>("http://localhost:3000/api/getAllRealEstates");
//   console.log(data, "dataaawww");

//   useEffect(() => {
//     dispatch(setLoading(true));
//     if (data?.data?.length > 0) {
//       const propertiesForSale = data.data.filter((property: any) => property.purpose === "for-sale");
//       const propertiesForRent = data.data.filter((property: any) => property.purpose === "for-rent");

//       dispatch(setPropertiesForSale(propertiesForSale));
//       dispatch(setPropertiesForRent(propertiesForRent));

//       // Set default filter for properties for sale
//       dispatch(setFilterValues({ ...filterValues, purpose: "for-sale" }));
//     }

//     dispatch(setLoading(false));
//   }, [data, dispatch]);
//   // useEffect(() => {
//   //   dispatch(setLoading(true));
//   //   if (data?.data?.length > 0) {
//   //     dispatch(setFilterValues(data.data));
//   //   }

//   //   dispatch(setLoading(false));
//   // }, [data, dispatch]);

//   return (
//     <div style={containerStyle}>
//       <CardBox>
//       <FilterComponent />
//       </CardBox>
//       {!loading ? (
//         <div
//           style={cardContainerStyle}
//           className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
//         >
//           <Flex>
//             <Flex flexWrap="wrap" className="w-[70vw] flex justify-between">
//               {filterValues.purpose === "for-sale"
//                 ? propertiesForSale.map((property: any) => <Property property={property} key={property._id} />)
//                 : propertiesForRent.map((property: any) => <Property property={property} key={property._id} />)}
//             </Flex>
//           </Flex>
//         </div>
//       ) : (
//         <div className="flex justify-center items-center">Loading...</div>
//       )}
//     </div>
//   );
// };

// export default realEstates;




















// 'use client'
// import React, {useEffect, useState} from 'react';
// import Button from '~~/components/custom_components/button';
// import RangeSlider from '~~/components/custom_components/rangeSlider';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Flex, Box, Text, Select, cookieStorageManager } from '@chakra-ui/react';
// import Property from '../../components/custom_components/Property';
// import { baseUrl, fetchApi } from '../../app/utils/fetchApi';
// import {filterData,getFilterValues } from '../../app/utils/filterData';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import axios from 'axios';
// import FilterComponent from './components/filterComponent';
// import { useFetch, useLocalStorage } from 'usehooks-ts';

// interface HomeProps {
//   propertiesForSale: Array<any>;
//   propertiesForRent: Array<any>;
// }

// const realEstates: React.FC<HomeProps> = () => {

//   const containerStyle:React.CSSProperties = {
//     display: 'flex',
//     flexDirection: 'row',
//     minHeight: '95vh',
//   };

//   const sidebarStyle:React.CSSProperties = {
//     flex: 1.5,
//     backgroundColor: '#9bb0c4',
//     color: '#333',
//     paddingTop: '20px',
//     paddingLeft:'5px',
//     paddingRight:'5px',
//   };

//   const btnstyle = {
//     marginLeft:'10px',
//     marginRight:'10px',
//     gap:'10px',
//   };

//   const bedsnbath = {
//     marginLeft:'10px',
//     marginRight:'10px',
//     gap:'10px',
//   };

//   const inputStyle = {
//   padding: "10px",
//   fontSize: "1rem",
//   border: "1px solid #ccc",
//   borderRadius: "8px",
//   // marginLeft: "40rem",
//   marginTop: "20px",
//   width:'300px',
//   backgroundColor: '#c5d4e3',
//   color: '#333',
//   boxShadow: "3px 0px 14px -3px rgba(110,123,179,0.73)",
//   "::placeholder": {
//     color: "#333",

//   },
// };

// const hrStyle = {
//   marginTop:'8px',
//   width:'100%',
//   color:'#c2c7cc'
// }

// const titleStyle = {
//   fontSize:'12px'
// }

// const applyStyle = {
//   marginTop: '10px'
// }

//   const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {

//     console.log('Button Clicked');
//   };

//   const cardContainerStyle: React.CSSProperties = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "80px",
//     flex: 6,
//     padding: '20px',
//     flexWrap: 'wrap',
//     overflowY: 'scroll',
//     height: '80vh',
//     width: '100%',
//     margin: 3,
//     paddingRight: '15px', // Adjust as needed based on your design
//   };

//   // For Webkit browsers like Chrome and Safari

//   const cardStyle = {
//     border: "1px solid #ccc",
//     padding: "16px",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//     cursor: "pointer",
//     backgroundColor:"#4F709C",
//     height:'150px'

//   };

//   const headingStyle = {
//     fontSize: "1.5rem",
//     fontWeight: "bold",
//     marginBottom: "0.5rem",
//   };

//   const textStyle = {
//     fontSize: "1.25rem",
//   };

//   const { data, error } = useFetch<any>('http://localhost:3000/api/getAllRealEstates')
//   console.log(data);
//    const [loading, setLoading] = useState(true);
//     const [filterValues, setFilterValues] = useState<any>({price:[0,100],area:[0,100]});
//     const [filters,setFilters] = useState(filterData);
//     useEffect(()=>{
//       if(data?.data?.length>0){
//         setLoading(false)
//       }
//     },[data])

//     const searchParams =  useSearchParams();
//     // console.log(searchParams)
//     useEffect(() => {

//       // console.log(searchParams.entries())
//       // You can now use the current URL
//       // ...
//     }, [ searchParams])
//     // useEffect(()=>{
//     //   filterValues?.map((fv:any)=>{

//     //     const newData=properties.filter((property:any)=>property[fv.fv]===fv.value)
//     //     console.log(newData);
//     //   })
//     //   console.log(filterValues,'filterValues')
//     // },[filterValues])

//     // useEffect(() => {
//     //   const fetchData = async () => {
//     //     console.log(Properties)
//     //     try {
//     //       if(Properties.length>0){
//     //         return
//     //       }
//     //       const { properties } = await getData();
//     //       setProperties(properties);

//     //       setLoading(false);
//     //     } catch (error) {
//     //       console.error('Error fetching data:', error);
//     //       setLoading(false);
//     //     }
//     //   };

//     //   fetchData();
//     // }, []);

//     const searchProperties = (fv: any) => {

//       // setFilterValues((prevVal:any)=>[...prevVal,fv]);
//       console.log(filterValues,fv);
//     }

//   return (
//     <div style={containerStyle} >

//        <FilterComponent filterValues={filterValues} setFilterValues={setFilterValues} />
//       { !loading?<div style={cardContainerStyle} className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
//         <Flex>
//           <Flex flexWrap='wrap' className='w-[70vw] flex justify-between'>

//             {data?.data  && data.data?.map((property:any) => <Property property={property} key={property._id} />)}

//           </Flex>
//         </Flex>
//       </div>
//       :
//       <div className='flex justify-center items-center'>
//         Loading...
//       </div>
// }

//      </div>

//   );
// };

// // export async function getData() {
// //   try {
// //     const properties=await axios.get('http://localhost:3000/api/getAllRealEstates')
// //     console.log(properties.data.data,"properties")
// //     return {
// //       properties:properties.data.data
// //     };
// //   } catch (error) {
// //     console.error('Error fetching data:', error);
// //     throw error;
// //   }
// // }

// export default realEstates;

