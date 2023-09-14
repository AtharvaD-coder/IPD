import { Slider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function RangeSlider(){

    const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  function valuetext(value: number) {
    return `${value}`;
  }

    return (
        <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    )

}