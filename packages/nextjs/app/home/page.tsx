"use client";

import React from "react";
import { NextPage } from "next";
import RentComponent from "~~/components/custom_components/RentComponent";
import Button from "~~/components/custom_components/button";

const btnstyle = {
  marginLeft: "10px",
  marginRight: "10px",
  gap: "10px",
};

const Page: NextPage = () => {
  const handleButtonClick = () => {
    RentComponent({ tokenId: 1 });
  };

  return (
    <div>
      {/* Pass the handleButtonClick function to the onClick prop of the Button component */}
      <Button style={btnstyle} label="List estate for Rent" onClick={handleButtonClick} />
    </div>
  );
};

export default Page;
