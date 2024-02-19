import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonSizes({ value=0, setValue }: any) {

  const handleChange = (
  value: any,
  ) => {
    setValue(value);
  };

  const children = [
    <ToggleButton
      className='w-[150px] rounded-full'
      value="left"
      key="left"
      sx={{ bgcolor: value === 0 ? 'primary.main' : 'default' }} // Change color based on value
    >
      Sale
    </ToggleButton>,

    <ToggleButton
      className='w-[150px] rounded-full'
      value="right"
      key="right"
      sx={{ bgcolor: value === 1 ? 'bg-secondary' : 'default' }} // Change color based on value
    >
      Rent
    </ToggleButton>,
  ];



  return (
    <div className='flex justify-center'>
    <div
      onClick={() => { handleChange(0) }}
      className={`${value == 0 ? "bg-secondary text-white" : ""} transition-colors duration-300 border-2 border-black w-[200px] h-[50px] rounded-s-full items-center justify-center flex items-center font-bold text-xl cursor-pointer`}
    >
      Sale
    </div>
    <div
      onClick={() => { handleChange(1) }}
      className={`${value == 1 ? "bg-secondary text-white" : "text-black"} transition-colors duration-300 border-2 border-black w-[200px] h-[50px] rounded-e-full items-center justify-center flex items-center font-bold text-xl cursor-pointer`}
    >
      Rent
    </div>
  </div>
  );
}
