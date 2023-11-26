import React from 'react';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import CameraRearOutlinedIcon from '@mui/icons-material/CameraRearOutlined';

const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
};

const headerStyle: React.CSSProperties = {
  fontSize: '60px',
  textAlign: 'center',
};

const contentContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: '20px',
};

const imageStyle = {
  border: '1px solid #ccc',
  marginRight: '10px',
  marginLeft: '10px',
  height: '500px',
  width: '500px',
};

const textContainerStyle: React.CSSProperties = {
  flex: 1,
};

const infoContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column', 
  marginLeft: '20px',
};

const infoRowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap:'100px'
};

const infoStyle: React.CSSProperties = {
  marginRight: '20px',
  fontSize: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const iconStyle = {
  marginRight: '10px',
};

const agentDetails = {
  display:'flex',

}

const page = () => {
  return (
    <div style={pageStyle}>
      <div>
        <h1 style={headerStyle}>Property Name</h1>
      </div>
      <div style={contentContainerStyle}>
        <div style={imageStyle}>
          The image goes here
        </div>
        <div style={textContainerStyle}>
          <h1>Description:</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>
          <div style={infoContainerStyle}>
            <div style={infoRowStyle}>
              <div style={infoStyle}>
                
                <p><SellOutlinedIcon style={iconStyle} />Price:</p>
                <p>12345</p>
              </div>
              <div style={infoStyle}>
                
                <p><CalendarMonthOutlinedIcon style={iconStyle} />Rent:</p>
                <p>6789</p>
              </div>
              <div style={infoStyle}>
                
                <p><HistoryToggleOffOutlinedIcon style={iconStyle} />Built:</p>
                <p>1990</p>
              </div>
            </div>
            <div style={infoRowStyle}>
              <div style={infoStyle}>
                
                <p><BedOutlinedIcon style={iconStyle} />Bedrooms:</p>
                <p>4</p>
              </div>
              <div style={infoStyle}>
                
                <p><ShowerOutlinedIcon style={iconStyle} />Bathrooms:</p>
                <p>2</p>
              </div>
              <div style={infoStyle}>
                
                <p><CameraRearOutlinedIcon style={iconStyle} />Area(sq ft):</p>
                <p>2000</p>
              </div>
            </div>
            <h1>Listing Agent's Details:</h1>
            <div style={agentDetails}>
              <p>Phone Number: </p>
              <p>Email: </p>
            </div>
          </div>
          <div style={imageStyle}>
          Map Showing the estate location
        </div>
        </div>
      </div>
    </div>
  );
}

export default page;
