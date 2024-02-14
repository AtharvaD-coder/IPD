// types.d.ts
import { RentInfo } from "./rentInfo";

interface RealEstate {
  noOfTokens: number;
  priceOf1Token: number;
  tokenId: number;
  status: number;
  rentInfo: RentInfo;
  realEstateBalance: number;
}

export { RealEstate };
