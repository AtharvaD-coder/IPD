import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { motion } from "framer-motion";
import {useEffect,useState} from 'react'

export default function ToggleButtonSizes({ options,setFilterValues,filterValues,keyValue }: any) {
   console.log(filterValues,"fv")
   function handleClick(value: any) {
    console.log("clicked");
  
    if (filterValues[keyValue]) {
      if (filterValues[keyValue] === options[value].value) {
        // Reset the specific key (keyValue) in the state
        const updatedFilterValues = { ...filterValues, [keyValue]: null };
        setFilterValues(updatedFilterValues);
      } else {
        // Update the specific key (keyValue) in the state
        const updatedFilterValues = { ...filterValues, [keyValue]: options[value].value };
        setFilterValues(updatedFilterValues);
      }
    } else {
      // Set the specific key (keyValue) in the state
      setFilterValues({ ...filterValues, [keyValue]: options[value].value });
    }
  }
  

  return (
    <div className="flex w-full flex-wrap ">
      {options &&
        options?.map((data: any, index: any) => {
            
                return (
                    <motion.button
                    whileTap={{ scale: 0.95 }}
                    style={{
                      backgroundColor: filterValues&&(filterValues[keyValue] === options[index].value) ? "#000000" : "#495464",
                    }}
                    onTap={resul=>console.log(resul)}
                    whileHover={{ scale: 1.1, backgroundColor: "#000000" }}
                    onClick={async () => {await handleClick(index)}}
                    className="border-solid border-2 p-3 m-3 rounded-3xl text-white"
                  >
                    <div className="text-sm">{data.text}</div>
                  </motion.button>
                  );
        
            
          
        })}
    </div>
  );
}
