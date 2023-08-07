pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol"; 

contract RealEstateERC1155 is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => RealEstate) public realEstates;
    mapping(uint256 => Proposals) public proposals;

    enum RealEstateStatus { Listed, Rented, Renting }
    enum ProposalType { ListForRent, UnlistForRent,setRentee }
     struct RentInfo {
        address rentee;
        uint256 noOfMonths;
        uint256 depositAmount;
        uint256 noOfInstallmentsPaid;
        uint256 feesForLateInstallments;
        
        
    }

    struct RentProposal{
         address rentee;
        uint256 noOfMonths;
    }


    struct Proposals {
        uint256 proposalId;
        address proposalCreator;
        uint256 positiveVotes;
        uint256 negativeVotes;
        ProposalType proposalType;
        uint256 tokenId;
        bool executed;
        RentProposal rentProposal;
    }
    

    struct RealEstate {
        uint256 noOfTokens;
        uint256 priceOf1Token;
        uint256 tokenId;
        RealEstateStatus status;
        address rentee;
        address[] owners;
        RentInfo rentInfo;
        mapping(address => uint256) balance;
        mapping(uint256=>bool) proposalExists;
    }

   

    constructor() ERC1155("OpenEstate,OE") {}

    function listRealEstate(uint256 initialAmountOfTokens, address owner, uint256 priceOf1token) public {
        uint256 tokenId = _tokenIdCounter.current();
        _mint(owner, tokenId, initialAmountOfTokens, "");

        RealEstate storage newProperty = realEstates[tokenId];
        newProperty.noOfTokens = initialAmountOfTokens;
        newProperty.priceOf1Token = priceOf1token;
        newProperty.tokenId = tokenId;
        newProperty.owners.push(owner);
        newProperty.status =  RealEstateStatus.Listed;

        _tokenIdCounter.increment();
    }

    function createProposal(ProposalType proposalType, uint256 tokenId) public {
        uint256 proposalId = proposals[tokenId].proposalId + 1;
        proposals[tokenId] = Proposals({
            proposalId: proposalId,
            proposalCreator: msg.sender,
            positiveVotes: 0,
            negativeVotes: 0,
            proposalType: proposalType,
            tokenId: tokenId,
            executed: false,
            rentProposal: RentProposal({rentee:address(0),noOfMonths:0})
        });
    }

    function createRenteeProposal(uint256 tokenId,address rentee,uint256 noOfMonths)public{
        uint256 proposalId = proposals[tokenId].proposalId + 1;
        proposals[tokenId] = Proposals({
            proposalId: proposalId,
            proposalCreator: msg.sender,
            positiveVotes: 0,
            negativeVotes: 0,
            proposalType: ProposalType.setRentee,
            tokenId: tokenId,
            executed: false,
            rentProposal: RentProposal({rentee:rentee,noOfMonths:noOfMonths})
           
        });

    }

    function vote(uint256 proposalId,uint256 tokenId, bool isPositiveVote) public {
        Proposals storage proposal = proposals[proposalId];
        RealEstate storage realEstate=realEstates[tokenId];
        require(realEstate.proposalExists[proposalId]==true,'proposal does not exits');
        require(proposal.proposalCreator != address(0), "Proposal does not exist");
        require(!proposal.executed, "Proposal already executed");

        if (isPositiveVote) {
            proposal.positiveVotes += 1;
        } else {
            proposal.negativeVotes += 1;
        }
    }

    function executeProposal(uint256 proposalId,uint256 tokenId) public {
        Proposals storage proposal = proposals[proposalId];
         RealEstate storage realEstate=realEstates[tokenId];
        require(proposal.proposalCreator != address(0), "Proposal does not exist");
        require(!proposal.executed, "Proposal already executed");

        
        bool isApproved = proposal.positiveVotes > proposal.negativeVotes;

        require(isApproved,"not approved");
            if (proposal.proposalType == ProposalType.ListForRent) {
                realEstate.status=RealEstateStatus.Renting;
            } else if (proposal.proposalType == ProposalType.UnlistForRent) {
             realEstate.status=RealEstateStatus.Listed;
            }
            else if(proposal.proposalType == ProposalType.setRentee){
                require(realEstate.status==RealEstateStatus.Renting,'not for rent');
                realEstate.status=RealEstateStatus.Rented;
                realEstate.rentInfo=RentInfo({rentee:proposal.rentProposal.rentee,noOfMonths:proposal.rentProposal.noOfMonths,depositAmount:realEstate.rentInfo.depositAmount,noOfInstallmentsPaid:0,feesForLateInstallments:realEstate.rentInfo.feesForLateInstallments});
                
                
               
            }
        

        proposal.executed = true;
    }
}
