import { RealEstate } from "./realEstate";
import { RentInfo } from "./rentInfo";
import { RentProposal } from "./rentProposal";
import { Address } from "viem";
import { ProposalType } from "~~/utils/enums";

interface Proposal {
  _id: number;
  proposalId: number;
  Rentinfo: RentInfo;
  deadline: number;
  executed: boolean;
  negativeVotes: number;
  positiveVotes: number;
  proposalCreator: Address;
  proposalType: ProposalType;
  rentproposal: RentProposal;
  tokenId: number;
}

export { Proposal };
