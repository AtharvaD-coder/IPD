import React from "react";
import { amenities } from "../../../utils/utils";
import { CiDumbbell, CiParking1 } from "react-icons/ci";
import { FaSwimmingPool } from "react-icons/fa";
import { BiSolidParking } from "react-icons/bi";
import { MdOutlineSecurity } from "react-icons/md";
import { GiKidSlide } from "react-icons/gi";
import { FaWifi } from "react-icons/fa";
import { MdLocalLaundryService } from "react-icons/md";

import { CardBox } from "~~/components/custom_components/cardComponent";

export default function AmenitySelector({ selectedAmenities, setSelectedAmenities }) {
  const handleAmenityToggle = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((selected) => selected !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <CardBox className={'rounded-[30px] my-5' } >
      <h1 className="font-bold text-xl"> Amenities </h1>
    <div className="flex flex-wrap justify-around">
      {amenities.map((amenity) => (
        <div key={amenity} className="flex flex-col items-center m-2">
          <span className="mb-1 font-bold text-md ">{amenity}</span>
          <button
            type="button"
            onClick={() => handleAmenityToggle(amenity)}
            className={`button ${selectedAmenities.includes(amenity) ? 'bg-secondary' : 'bg-gray-300'} transition duration-300 rounded-full w-[100px] h-[100px] flex justify-center items-center text-2xl m-3 `}
          >
            {
            amenity === "Gym" ? <CiDumbbell color={selectedAmenities.includes(amenity)?'white':'black'} size={50} /> 
            :
            amenity === "Swimming pool" ? <FaSwimmingPool color={selectedAmenities.includes(amenity)?'white':'black'} size={50} />
            :
            amenity === "Parking" ? <BiSolidParking color={selectedAmenities.includes(amenity)?'white':'black'} size={50} />
            :
            amenity === "Security" ? <MdOutlineSecurity color={selectedAmenities.includes(amenity)?'white':'black'} size={50} />
            :
            amenity === "Playground" ? <GiKidSlide color={selectedAmenities.includes(amenity)?'white':'black'} size={50} />
            :
            amenity === "Common area WiFi" ? <FaWifi color={selectedAmenities.includes(amenity)?'white':'black'} size={50} />
            :
            amenity === "Laundry" ? <MdLocalLaundryService color={selectedAmenities.includes(amenity)?'white':'black'} size={50} />
            :
            amenity
              

            
            }
              </button>
        </div>
      ))}
    </div>
    </CardBox>
  );
}
