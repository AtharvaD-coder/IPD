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
    console.log(value,"valllaa")
    dispatch(setFilterValues({ ...filterValues, [keyValue]: value }));
  };

  const handleButtonClick = (value: string) => {
    dispatch(setFilterValues({ ...filterValues, purpose: value }));
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
          onChange={(value) => handleFilterChange("area", value)}
          keyValue={"area"}
          max={5000}
        />
      </div>
      <div className="horizontal-1 p-4 ">
        <NumberInput label={"Minimum Rooms"} labelStyle={"text-sm"} />
      </div>
    </div>
  );
};

export default FilterComponent;
