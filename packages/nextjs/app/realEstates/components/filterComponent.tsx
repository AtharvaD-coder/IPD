"use client";

import React from "react";
import { setFilterValues } from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import ToggleButtonSizes from "./selectToggle";
import { useDispatch, useSelector } from "react-redux";
import NumberInput from "~~/app/listRealEstate/components/numberInputs";
import RangeSlider from "~~/components/custom_components/rangeSlider";

interface FilterComponentProps {}

const FilterComponent: React.FC<FilterComponentProps> = () => {
  const dispatch = useDispatch();
  const filterValues = useSelector((state: RootState) => state.filterValues);


  const handleFilterChange = (keyValue: string, value: any) => {
    dispatch(setFilterValues({ ...filterValues, [keyValue]: value }));
  };

  const handleButtonClick = (value: string) => {
    dispatch(setFilterValues({ ...filterValues, purpose: value }));
  };

  const handleBathroomsButtonClick = (numBathrooms: number) => {

    if (numBathrooms === 4) {
      dispatch(setFilterValues({ ...filterValues, bathrooms: { min: 4 } }));
    } else {

      dispatch(setFilterValues({ ...filterValues, bathrooms: numBathrooms }));
    }
  };

  const handleBedButtonClick = (numBathrooms: number) => {

    if (numBathrooms === 4) {
      dispatch(setFilterValues({ ...filterValues, bathrooms: { min: 4 } }));
    } else {

      dispatch(setFilterValues({ ...filterValues, bathrooms: numBathrooms }));
    }
  };

  return (
    <div className="w-[20vw] h-[85vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <div className="horizontal-1 p-3">
        <div className="text-sm">Purpose :</div>
        <ToggleButtonSizes
          keyValue={"purpose"}
          setFilterValues={handleFilterChange}
          filterValues={filterValues}
          options={[
            { text: "Buy", value: "for-sale" },
            { text: "Rent", value: "for-rent" },
          ]}
          handleButtonClick={handleButtonClick}
        />
      </div>
      <div className="horizontal-1 p-3">
        <div className="text-sm">Bathrooms :</div>
        <ToggleButtonSizes
          keyValue={"bathrooms"}
          setFilterValues={handleFilterChange}
          filterValues={filterValues}
          options={[
            { text: "1", value: 1 },
            { text: "2", value: 2 },
            { text: "3", value: 3 },
            { text: "4", value: 4 },
          ]}
          handleButtonClick={handleBathroomsButtonClick}
        />
      </div>

      <div className="horizontal-1 p-3">
        <div className="text-sm">Bedrooms :</div>
        <ToggleButtonSizes
          keyValue={"bedrooms"}
          setFilterValues={handleFilterChange}
          filterValues={filterValues}
          options={[
            { text: "1", value: 1 },
            { text: "2", value: 2 },
            { text: "3", value: 3 },
            { text: "4", value: 4 },
          ]}
          handleButtonClick={handleBedButtonClick}
        />
      </div>
     
      <div className="horizontal-1 p-3 ">
        <div className="text-sm">Price :</div>
        <RangeSlider
          value={filterValues.price}
          // SetValue={value => handleFilterChange("price", value)}
          keyValue={"price"}
          onChange={(value)=>{
            console.log(value,"value")
            handleFilterChange("price", value)

          }}
          max={1000}
        />
      </div>
      <div className="horizontal-1 p-3 ">
        <div className="text-sm">Area :</div>
        <RangeSlider
          value={filterValues.area}
          // SetValue={value => handleFilterChange("area", value)}
          onChange={(value) => handleFilterChange("area", value)}
          keyValue={"area"}
          max={2000}
        />
      </div>
      
    </div>
  );
};

export default FilterComponent;
