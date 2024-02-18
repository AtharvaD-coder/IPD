import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonSizes() {
  const [alignment, setAlignment] = React.useState('left');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const children = [
    <ToggleButton value="left" key="left">
      Sale
    </ToggleButton>,
    
    <ToggleButton value="right" key="right">
      Rent
    </ToggleButton>,
   
  ];

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <Stack spacing={2} alignItems="center">
      <ToggleButtonGroup size="large" {...control} aria-label="Large sizes">
        {children}
      </ToggleButtonGroup>
    </Stack>
  );
}