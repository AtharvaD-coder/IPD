'use client'
import React, {useEffect, useState} from 'react';
import Button from '~~/components/custom_components/button';
import RangeSlider from '~~/components/custom_components/rangeSlider';
import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Select, cookieStorageManager } from '@chakra-ui/react';
import Property from '../../components/custom_components/Property';
import { baseUrl, fetchApi } from '../../app/utils/fetchApi';
import {filterData,getFilterValues } from '../../app/utils/filterData';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import FilterComponent from './components/filterComponent';

interface HomeProps {
  propertiesForSale: Array<any>;
  propertiesForRent: Array<any>;
}

const realEstates: React.FC<HomeProps> = () => {
  

  const containerStyle:React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row', 
    minHeight: '90vh',      
  };

  const sidebarStyle:React.CSSProperties = {
    flex: 1.5,              
    backgroundColor: '#9bb0c4', 
    color: '#333',         
    paddingTop: '20px', 
    paddingLeft:'5px',     
    paddingRight:'5px',     
  };

  const btnstyle = {
    marginLeft:'10px',
    marginRight:'10px',
    gap:'10px',
  };

  const bedsnbath = {
    marginLeft:'10px',
    marginRight:'10px',
    gap:'10px',
  };

  const inputStyle = {
  padding: "10px",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "8px",
  // marginLeft: "40rem",
  marginTop: "20px",
  width:'300px',
  backgroundColor: '#c5d4e3',
  color: '#333',  
  boxShadow: "3px 0px 14px -3px rgba(110,123,179,0.73)",
  "::placeholder": {
    color: "#333",
    
  },
};

const hrStyle = {
  marginTop:'8px',
  width:'100%',
  color:'#c2c7cc'
}

const titleStyle = {
  fontSize:'12px'
}

const applyStyle = {
  marginTop: '10px'
}


  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    
    console.log('Button Clicked');
  };

  const cardContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "80px",
    flex: 6,
    padding: '20px',
    flexWrap: 'wrap',
    overflowY: 'scroll',
    height: '80vh',
    width: '100%',
    // margin: 3,
    margin: '3px 3px 3px 83px',
    paddingRight: '15px', // Adjust as needed based on your design
  };
  
  // For Webkit browsers like Chrome and Safari
  

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    backgroundColor:"#4F709C",
    height:'150px',
    // margin: '0 10px 10px 0',
    marginRight:'20px'
  
  };
  
  const headingStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  };
  
  const textStyle = {
    fontSize: "1.25rem",
  };
  
    const [properties, setProperties] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [filterValues, setFilterValues] = useState<any>({price:[0,100],area:[0,100]});
    const [filters,setFilters] = useState(filterData);

    const searchParams =  useSearchParams();
    // console.log(searchParams)
    useEffect(() => {
      
      // console.log(searchParams.entries())
      // You can now use the current URL
      // ...
    }, [ searchParams])
    // useEffect(()=>{
    //   filterValues?.map((fv:any)=>{

    //     const newData=properties.filter((property:any)=>property[fv.fv]===fv.value)
    //     console.log(newData);
    //   })
    //   console.log(filterValues,'filterValues')
    // },[filterValues])

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { properties } = await getData();
          setProperties(properties);
   
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>; 
    }

    const searchProperties = (fv: any) => {

      // setFilterValues((prevVal:any)=>[...prevVal,fv]);
      console.log(filterValues,fv);
    }

    
   
  return (
    <div style={containerStyle} >
 
       <FilterComponent filterValues={filterValues} setFilterValues={setFilterValues} />
      <div style={cardContainerStyle} className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ">
        <Flex>
        <Flex flexWrap='wrap'>
            {properties && properties.map((property: any) => (
              <Box key={property._id} width={['100%', '48%', '30%']} mb="20px">
                <Property property={property} />
              </Box>
            ))}
          </Flex>
        </Flex>
      </div>
      
     </div>

  );
};



export async function getData() {
  try { 
    const properties=await axios.get('http://localhost:3000/api/getAllRealEstates')
    console.log(properties.data.data,"properties")
    return {
      properties:properties.data.data
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
}

export default realEstates;



















