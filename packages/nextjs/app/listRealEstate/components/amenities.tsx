import React, { useState } from "react";
import { amenities } from "../../../utils/utils";

export default function AmenitySelector({ selectedAmenities, setSelectedAmenities }) {
  const handleAmenityToggle = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(selected => selected !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }

    // setSelectedAmenities(prevSelected => {
    //   if (prevSelected.includes(amenity)) {
    //     return prevSelected.filter(selected => selected !== amenity);
    //   } else {
    //     return [...prevSelected, amenity];
    //   }
    // });
  };

  return (
    <div className="flex flex-wrap ">
      {amenities.map(amenity => (
        <div key={amenity} className="items-center flex justify-center m-2">
          <input
            type="checkbox"
            checked={selectedAmenities.includes(amenity)}
            onChange={() => handleAmenityToggle(amenity)}
            className="checkbox checkbox-primary m-2 "
          />
          {amenity}
        </div>
      ))}
    </div>
  );
}
