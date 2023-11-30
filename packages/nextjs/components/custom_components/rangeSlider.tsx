'use client'
import { Slider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function RangeSlider({value,SetValue,keyValue,step=1,min=0,max=100}:any){


  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue as number[],"newvalue")
    SetValue((prevVal:any)=>({...prevVal,[keyValue]:newValue as number[]}))
  };
  function valuetext(value: number) {
    return `${value}`;
  }

    return (
        <Box sx={{ width: "100%" ,padding:2 }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          step={step}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          
      min={min}
          max={max}
        />
      </Box>
    )

}