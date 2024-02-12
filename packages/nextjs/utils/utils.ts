export const amenities = [
    "Gym",
    "Swimming pool",
    "Parking",
    "Security",
    "Playground",
    "Common area WiFi",
    "Laundry"
  ];

export const realEstateStatus=(status:number)=>{
    switch(status){
        case 0:
            return "Listed For Sale"
        case 1:
            return "Rented"
        case 2:
            return "Listed For Rent"
        default:
            return "Sale"
    }
}