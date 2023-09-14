import { Address } from "viem";

interface RentProposal {
    rentee:Address;
    noOfMonths:number;
    depositBalance:number;

}

export { RentProposal };
