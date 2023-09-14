import React from 'react';
import Button from '~~/components/custom_components/button';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

// const marks = [
//   {
//     value: 0,
//     label: '0',
//   },
//   {
//     value: 20,
//     label: '20k',
//   },
//   {
//     value: 50,
//     label: '50k',
//   },
//   {
//     value: 10000000,
//     label: '1Cr+',
//   },
// ];

// function valuetext(value: number) {
//   return `${value}`;
// }


const realEstates = () => {
  const containerStyle:React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row', 
    minHeight: '100vh',      
  };

  const sidebarStyle:React.CSSProperties = {
    flex: 1.5,              
    backgroundColor: '#333', 
    color: '#fff',         
    paddingTop: '20px', 
    paddingLeft:'5px',     
    paddingRight:'5px',     
  };

  const contentStyle:React.CSSProperties = {
    flex: 6,               
    padding: '20px', 
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
  
};

const hrStyle = {
  marginTop:'8px',
  width:'100%',
  color:'#c2c7cc'
}

const titleStyle = {
  fontSize:'12px'
}


  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    
    console.log('Button Clicked');
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>

      <Button style={btnstyle} label="Buy" onClick={handleButtonClick} />
      <Button style={btnstyle} label="Rent" onClick={handleButtonClick} />
      <Button style={btnstyle} label="Sold" onClick={handleButtonClick} />
      <input type="text" placeholder="Search..." style={inputStyle} />
      <hr style={hrStyle}/>
      <p style={titleStyle}>Property Type</p>
      <Button style={btnstyle} label="House" onClick={handleButtonClick} />
      <Button style={btnstyle} label="Commercial" onClick={handleButtonClick} />
      <Button style={btnstyle} label="Apartment" onClick={handleButtonClick} />
      <Button style={btnstyle} label="Landplot" onClick={handleButtonClick} />
      <hr style={hrStyle}/>
      <p style={titleStyle}>Price Range</p>
      

      {/* <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Always visible"
        defaultValue={80}
        getAriaValueText={valuetext}
        step={10}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box> */}

    
      <p style={titleStyle}>Bedrooms</p>
      <Button style={bedsnbath} label="1" onClick={handleButtonClick} />
      <Button style={bedsnbath} label="2" onClick={handleButtonClick} />
      <Button style={bedsnbath} label="3" onClick={handleButtonClick} />
      <Button style={bedsnbath} label="4" onClick={handleButtonClick} />
      <Button style={bedsnbath} label="5" onClick={handleButtonClick} />
      <p style={titleStyle}>Bathrooms</p>
      <Button style={bedsnbath} label="1" onClick={handleButtonClick} />
      <Button style={bedsnbath} label="2" onClick={handleButtonClick} />
      <Button style={bedsnbath} label="3" onClick={handleButtonClick} />
      <Button style={bedsnbath} label="4" onClick={handleButtonClick} />
      <Button style={bedsnbath} label="5" onClick={handleButtonClick} />

      <p style={titleStyle}>Amenities</p>
      <input type="checkbox" aria-label="shared" className="btn" />
      <input type="checkbox" aria-label="shared" className="btn" />
      <input type="checkbox" aria-label="shared" className="btn" />
      <button className="btn btn-primary">Button</button>



      </div>
      <div style={contentStyle}>
        {/* Main content goes here */}
        Main Content
      </div>
    </div>
  );
};

export default realEstates;





// import React, { useState } from "react";
// import Card from "../components/custom_components/card";
// import dummyProperties from "../pages/dummyProperties";

// const cardContainerStyle = {
//   display: "flex",
//   justifyContent: "center",
//   gap: "40px",
// };

// const cardStyle = {
//   border: "1px solid #ccc",
//   padding: "16px",
//   borderRadius: "8px",
//   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//   cursor: "pointer",
//   backgroundColor:"#4F709C",

// };

// const headingStyle = {
//   fontSize: "1.5rem",
//   fontWeight: "bold",
//   marginBottom: "0.5rem",
// };

// const textStyle = {
//   fontSize: "1.25rem",
// };

// const inputStyle = {
//   padding: "10px",
//   fontSize: "1rem",
//   border: "1px solid #ccc",
//   borderRadius: "8px",
//   marginLeft: "40rem",
//   marginBottom: "10px",
// };

// const RealEstates: React.FC = () => {
//   const [selectedProperty, setSelectedProperty] = useState<any>(null);

//   const handlePropertyClick = (property: any) => {
//     setSelectedProperty(property);
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Real Estates</h1>
//       <input type="text" placeholder="Search..." style={inputStyle} />
//       <div style={cardContainerStyle}>
//         {dummyProperties.map((property) => (
//           <div
//             key={property.id}
//             style={{ ...cardStyle, backgroundColor: selectedProperty === property ? "#AED2FF" : "#176B87" }}
//             onClick={() => handlePropertyClick(property)}
//           >
//             <h2 style={headingStyle}>{property.name}</h2>
//             <p style={textStyle}>Price: {property.price}</p>
//             <p style={textStyle}>Location: {property.location}</p>
//           </div>
//         ))}
//       </div>
//       {selectedProperty && (
//         <Card style={cardStyle}>
//           <h2 style={headingStyle}>{selectedProperty.name}</h2>
//           <p style={textStyle}>Price: {selectedProperty.price}</p>
//           <p style={textStyle}>Location: {selectedProperty.location}</p>
//           <p style={textStyle}>Description: {selectedProperty.description}</p>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default RealEstates;
