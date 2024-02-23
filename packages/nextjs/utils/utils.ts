export const amenities = ["Gym", "Swimming pool", "Parking", "Security", "Playground", "Common area WiFi", "Laundry"];

export const realEstateStatus = (status: number) => {
  switch (status) {
    case 0:
      return "Listed For Sale";
    case 1:
      return "Rented";
    case 2:
      return "Listed For Rent";
    default:
      return "Sale";
  }
};

export const convertWeiToEther = wei => {
  return Number(wei) / 10 ** 18; // 1 Ether = 10^18 Wei
};


export const Public_Url=process.env.NEXT_PUBLIC_VERCEL_URL;
