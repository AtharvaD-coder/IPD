import React from "react";
import { Slider } from "@mui/material";
import { Box } from "@mui/system";

interface RangeSliderProps {
  value: number | number[]; // Adjust the type based on your use case
  // SetValue: (value: Record<string, any>) => void;
  onChange:any
  keyValue: string;
  step?: number;
  min?: number;
  max?: number;
}

export default function RangeSlider({ value, onChange, keyValue, step = 1, min = 0, max = 100 }: RangeSliderProps) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue as number[], "newvalue");
   

    onChange(newValue)

  };

  function valuetext(value: number) {
    return `${value}`;
  }

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        step={step}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={min}
        max={max}

        sx={{
          '& .MuiSlider-thumb': {
            borderColor: '#495464', // Set the thumb's border color
            backgroundColor: '#495464', // Set the thumb's background color
          },
          '& .MuiSlider-active': {
            color: '#495464', // This adjusts the color of the active track
          },
        }}
      />
    </Box>
  );
}
