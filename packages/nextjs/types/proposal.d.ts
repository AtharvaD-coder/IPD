import { RentInfo } from "./rentInfo";
import { RealEstate } from "./realEstate";
import { Address } from "viem";
import { ProposalType } from "~~/utils/enums";
import { RentProposal } from "./rentProposal";
interface Proposal {
    _id:number;
    proposalId:number;
    Rentinfo:RentInfo;
    deadline:number;
    executed:boolean;
    negativeVotes:number;
    positiveVotes:number;
    proposalCreator:Address
    proposalType:ProposalType
    rentproposal:RentProposal
    tokenId:number

}

export { Proposal };
