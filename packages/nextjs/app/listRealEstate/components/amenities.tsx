import React, { useState } from "react";
import { amenities } from "../../../utils/utils";

export default function AmenitySelector({ selectedAmenities, setSelectedAmenities }) {
  const handleAmenityToggle = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(selected => selected !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <div className="flex flex-wrap">
      {amenities.map(amenity => (
        <div key={amenity} className="flex flex-col items-center m-2">
          <span className="mb-1 font-bold text-sm ">{amenity}</span>
          <input
            type="checkbox"
            checked={selectedAmenities.includes(amenity)}
            onChange={() => handleAmenityToggle(amenity)}
            className="checkbox checkbox-primary"
          />
        </div>
      ))}
    </div>
  );
}
