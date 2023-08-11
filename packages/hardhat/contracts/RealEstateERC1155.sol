pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract RealEstateERC1155 is ERC1155 {
	using Counters for Counters.Counter;
	uint256 public proposalCounter=0;
	Counters.Counter public _tokenIdCounter;
	event RealEstateListed(
		uint256 indexed tokenId,
		address[] owners,
		uint256 noOfTokens,
		uint256 priceOf1Token
	);
	event RealEstateUpdated(
		uint256 indexed tokenId,
		address[] owners,
		uint256 noOfTokens,
		uint256 priceOf1Token,
		RealEstateStatus status,
		RentInfo rentInfo,
		uint256 realEstateBalance
	);
	event RealEstateRented(
		uint256 indexed tokenId,
		address indexed rentee,
		uint256 noOfMonths,
		uint256 rentof1Month
	);
	enum voteStatusEnum{
			 notVoted,
		 positiveVote,
		 negativeVote
	
	}

	mapping(uint256 => RealEstate) public realEstates;
	mapping(uint256 => Proposals) public proposals;
	

	enum RealEstateStatus {
		Listed,
		Rented,
		Renting
	}
	enum ProposalType {
		ListForRent,
		UnlistForRent,
		setRentee,
		updateRentInfo
	}
	struct RentInfo {
		address rentee;
		uint256 noOfMonths;
		uint256 rentof1Month;
		uint256 depositAmount;
		uint256 noOfInstallmentsPaid;
		uint256 feesForLateInstallments;
		uint256 contractStartTimestamp;
	}

	struct RentProposal {
		address rentee;
		uint256 noOfMonths;
		uint256 depositBalance;
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
		uint256 deadline;
		RentInfo rentInfo;
		mapping(address => voteStatusEnum)  voteStatus;
	}
	event ProposalUpserted(
		uint256 proposalId,
		address proposalCreator,
		uint256 positiveVotes,
		uint256 negativeVotes,
		ProposalType proposalType,
		uint256 tokenId,
		bool executed,
		RentProposal rentProposal,
		uint256 deadline,
		RentInfo rentInfo
	);

	struct RealEstate {
		uint256 noOfTokens;
		uint256 priceOf1Token;
		uint256 tokenId;
		RealEstateStatus status;
		address[] owners;
		RentInfo rentInfo;
		mapping(address => uint256) balanceofMemebers;
		mapping(uint256 => bool) proposalExists;
		uint256 realEstateBalance;
	}

	constructor() ERC1155("OpenEstate,OE") {}

	function listRealEstate(
		uint256 initialAmountOfTokens,
		address owner,
		uint256 priceOf1token
	) public {
		uint256 tokenId = _tokenIdCounter.current();
		_mint(owner, tokenId, initialAmountOfTokens, "");

		RealEstate storage newProperty = realEstates[tokenId];
		newProperty.noOfTokens = initialAmountOfTokens;
		newProperty.priceOf1Token = priceOf1token;
		newProperty.tokenId = tokenId;
		newProperty.owners.push(owner);
		newProperty.status = RealEstateStatus.Listed;
		newProperty.balanceofMemebers[owner] += initialAmountOfTokens;

		_tokenIdCounter.increment();
		emit RealEstateListed(
			tokenId,
			newProperty.owners,
			initialAmountOfTokens,
			priceOf1token
		);
	}



	function getaddress() public view returns(address){
		return msg.sender;
	}
	function isSoleOwner(uint256 tokenId,address owner) public view returns (bool) {
		 RealEstate storage realEstate = realEstates[tokenId];
		 if(balanceOf(owner,tokenId)==0){
			return false;
		 }
    
    if (balanceOf(owner, tokenId) == realEstate.noOfTokens) {
        return true;
    }
    
    return false;
	}

	function updateStatus(uint256 tokenId, RealEstateStatus _status,uint256 deadline) public {
		RealEstate storage realEstate = realEstates[tokenId];

			if(balanceOf(msg.sender, tokenId) == realEstate.noOfTokens){
				realEstate.status = _status;

			}
			else{
				if(_status==RealEstateStatus.Renting){
					createProposal(ProposalType.ListForRent, tokenId, deadline);
				}
				else if(_status==RealEstateStatus.Listed){
					createProposal(ProposalType.UnlistForRent, tokenId, deadline);

				}
		
			}
		



		emit RealEstateUpdated(
			realEstate.tokenId,
			realEstate.owners,
			realEstate.noOfTokens,
			realEstate.priceOf1Token,
			realEstate.status,
			realEstate.rentInfo,
			realEstate.realEstateBalance
		);
	}

	function updateRentinfo(
		uint256 tokenId,
		uint256 numberOfMonths,
		uint256 rentof1Month,
		uint256 depositAmount,
		uint256 feesForLateInstallments,
		uint256 deadline
	) public {
		RentInfo storage rentinfo = realEstates[tokenId].rentInfo;
		RealEstate storage realEstate = realEstates[tokenId];
		if (balanceOf(msg.sender, tokenId) == realEstate.noOfTokens) {
			rentinfo.noOfMonths = numberOfMonths;
			rentinfo.rentof1Month = rentof1Month;
			rentinfo.depositAmount = depositAmount;
			rentinfo.feesForLateInstallments = feesForLateInstallments;
		} else {
			uint256 proposalId = proposalCounter;

			
				proposals[proposalCounter].proposalId=proposalId;
				proposals[proposalCounter].proposalCreator=msg.sender;
				proposals[proposalCounter].positiveVotes=0;
				proposals[proposalCounter].negativeVotes=0;
				proposals[proposalCounter].proposalType=ProposalType.updateRentInfo;
				proposals[proposalCounter].tokenId=tokenId;
				proposals[proposalCounter].executed=false;
				proposals[proposalCounter].deadline=deadline;
				proposals[proposalCounter].rentProposal=RentProposal({
					rentee: address(0),
					noOfMonths: 0,
					depositBalance: 0
				});
				proposals[proposalCounter].rentInfo=RentInfo({
					rentee: rentinfo.rentee,
					noOfMonths: numberOfMonths,
					rentof1Month: rentof1Month,
					depositAmount: depositAmount,
					noOfInstallmentsPaid: 0,
					feesForLateInstallments: feesForLateInstallments,
					contractStartTimestamp: 0
				});
					realEstate.proposalExists[proposalId]=true;
					proposalCounter++;
				
		

			emit ProposalUpserted(
				proposalId,
				msg.sender,
				0,
				0,
				ProposalType.updateRentInfo,
				tokenId,
				false,
				RentProposal({
					rentee: address(0),
					noOfMonths: 0,
					depositBalance: 0
				}),
				deadline,
				RentInfo({
					rentee: rentinfo.rentee,
					noOfMonths: proposals[tokenId].rentInfo.noOfMonths,
					rentof1Month: rentof1Month,
					depositAmount: depositAmount,
					noOfInstallmentsPaid: 0,
					feesForLateInstallments: feesForLateInstallments,
					contractStartTimestamp: 0
				})
			);
		}

		emit RealEstateUpdated(
			realEstate.tokenId,
			realEstate.owners,
			realEstate.noOfTokens,
			realEstate.priceOf1Token,
			realEstate.status,
			realEstate.rentInfo,
			realEstate.realEstateBalance
		);
	}

	function getOwners(uint256 tokenId) public view returns (address[] memory) {
		RealEstate storage realEstate = realEstates[tokenId];
		return realEstate.owners;
	}

	function createProposal(
		ProposalType proposalType,
		uint256 tokenId,
		uint256 deadline
	) public {
			RealEstate storage realEstate = realEstates[tokenId];
		uint256 proposalId = proposalCounter;

			proposals[proposalId].proposalId= proposalId;
			proposals[proposalId].proposalCreator=msg.sender;
			proposals[proposalId].positiveVotes=0;
			proposals[proposalId].negativeVotes=0;
			proposals[proposalId].proposalType=proposalType;
			proposals[proposalId].tokenId=tokenId;
			proposals[proposalId].executed=false;
			proposals[proposalId].deadline=deadline;
			proposals[proposalId].rentProposal=RentProposal({
				rentee: address(0),
				noOfMonths: 0,
				depositBalance: 0
			});
			proposals[proposalId].rentInfo=RentInfo({
				rentee: address(0),
				noOfMonths: 0,
				rentof1Month: 0,
				depositAmount: 0,
				noOfInstallmentsPaid: 0,
				feesForLateInstallments: 0,
				contractStartTimestamp: 0
			});
			realEstate.proposalExists[proposalId]=true;
			proposalCounter++;
		
	}

	function createRenteeProposal(
		uint256 tokenId,
		address rentee,
		uint256 noOfMonths,
		uint256 deadline
	) public payable {
		uint256 proposalId = proposalCounter;
		RealEstate storage realEstate = realEstates[tokenId];

		require(
			msg.value >= realEstate.rentInfo.depositAmount,
			"deposit amount less"
		);
	
			proposals[tokenId].proposalId=proposalId;
			proposals[tokenId].proposalCreator=msg.sender;
			proposals[tokenId].positiveVotes= 0;
			proposals[tokenId].negativeVotes= 0;
			proposals[tokenId].proposalType=ProposalType.setRentee;
			proposals[tokenId].tokenId= tokenId;
			proposals[tokenId].executed=false;
			proposals[tokenId].deadline= deadline;
			proposals[tokenId].rentProposal= RentProposal({
				rentee: rentee,
				noOfMonths: noOfMonths,
				depositBalance: msg.value
			});
			proposals[tokenId].rentInfo=RentInfo({
				rentee: address(0),
				noOfMonths: 0,
				rentof1Month: 0,
				depositAmount: 0,
				noOfInstallmentsPaid: 0,
				feesForLateInstallments: 0,
				contractStartTimestamp: 0
			});
				realEstate.proposalExists[proposalId]=true;
				proposalCounter++;

	}

	function vote(
		uint256 proposalId,
		bool isPositiveVote
	) public {
		Proposals storage proposal = proposals[proposalId];
		RealEstate storage realEstate = realEstates[proposal.tokenId];
		require(block.timestamp <= proposal.deadline, "Proposal Expired");
		require(
			realEstate.proposalExists[proposalId] == true,
			"proposal does not exits"
		);

		require(balanceOf(msg.sender,proposal.tokenId)>0,'you cant vote');
		require(proposal.executed==false, "Proposal already executed");
		require(!(proposal.voteStatus[msg.sender]==voteStatusEnum.positiveVote && isPositiveVote),'Already Voted');
		require(!(proposal.voteStatus[msg.sender]==voteStatusEnum.negativeVote && !isPositiveVote),'Already Voted');

		
	

		if (isPositiveVote) {
			if(proposal.voteStatus[msg.sender]==voteStatusEnum.negativeVote){
				proposal.negativeVotes -= 1;
			}
			proposal.voteStatus[msg.sender]=voteStatusEnum.positiveVote;
			proposal.positiveVotes += 1;
		} else {
			if(proposal.voteStatus[msg.sender]==voteStatusEnum.positiveVote){
				proposal.positiveVotes -= 1;
			}
			proposal.voteStatus[msg.sender]=voteStatusEnum.negativeVote;
			proposal.negativeVotes += 1;
		}

		emit ProposalUpserted(proposalId, proposal.proposalCreator, proposal.positiveVotes, proposal.negativeVotes, proposal.proposalType, proposal.tokenId, proposal.executed, proposal.rentProposal, proposal.deadline, proposal.rentInfo);
	}

	function executeProposal(uint256 proposalId, uint256 tokenId) public {
		Proposals storage proposal = proposals[proposalId];
		RealEstate storage realEstate = realEstates[tokenId];
		require(block.timestamp <= proposal.deadline, "Proposal Expired");
		require(
			proposal.proposalCreator != address(0),
			"Proposal does not exist"
		);
		require(!proposal.executed, "Proposal already executed");

		bool isApproved = proposal.positiveVotes > proposal.negativeVotes;

		require(isApproved, "not approved");
		if (proposal.proposalType == ProposalType.ListForRent) {
			realEstate.status = RealEstateStatus.Renting;
		} else if (proposal.proposalType == ProposalType.UnlistForRent) {
			realEstate.status = RealEstateStatus.Listed;
		} else if (proposal.proposalType == ProposalType.setRentee) {
			require(
				realEstate.status == RealEstateStatus.Renting,
				"not for rent"
			);
			realEstate.status = RealEstateStatus.Rented;
			realEstate.rentInfo = RentInfo({
				rentee: proposal.rentProposal.rentee,
				noOfMonths: proposal.rentProposal.noOfMonths,
				depositAmount: realEstate.rentInfo.depositAmount,
				noOfInstallmentsPaid: 0,
				feesForLateInstallments: realEstate
					.rentInfo
					.feesForLateInstallments,
				rentof1Month: realEstate.rentInfo.rentof1Month,
				contractStartTimestamp: block.timestamp
			});
		}

		proposal.executed = true;
	}

	function payRent(uint256 tokenId) public payable {
		RealEstate storage realEstate = realEstates[tokenId];
		uint256 noOfMonthsRemaining = ((block.timestamp -
			realEstate.rentInfo.contractStartTimestamp) / 30 days) % 12;

		uint256 fee = (noOfMonthsRemaining - 1) *
			realEstate.rentInfo.feesForLateInstallments;
		require(realEstate.status == RealEstateStatus.Rented);
		require(msg.sender == realEstate.rentInfo.rentee, "You are not rentee");
		require(
			msg.value >= realEstate.rentInfo.rentof1Month + fee,
			"no enough Amount"
		);

		for (uint256 i = 0; i < realEstate.owners.length; i++) {
			realEstate.balanceofMemebers[realEstate.owners[i]] +=
				(balanceOf(realEstate.owners[i], tokenId) /
					realEstate.noOfTokens) *
				realEstate.rentInfo.rentof1Month;
		}
	}

	function findIndex(
		address[] storage array,
		address element
	) internal view returns (uint256) {
		for (uint256 i = 0; i < array.length; i++) {
			if (array[i] == element) {
				return i;
			}
		}
		return array.length;
	}

	function transferTokens(
		uint256 tokenId,
		address from,
		address to,
		uint256 amount
	) public {
		RealEstate storage realEstate = realEstates[tokenId];

		require(
			realEstate.status != RealEstateStatus.Rented,
			"Cannot transfer tokens of a rented property"
		);

		uint256 senderBalance = balanceOf(from, tokenId);
		require(senderBalance >= amount, "Not enough balance to transfer");

		// Update sender and receiver balances
		realEstate.balanceofMemebers[from] -= amount;
		realEstate.balanceofMemebers[to] += amount;

		if (realEstate.balanceofMemebers[from] == 0) {
			uint256 indexToRemove = findIndex(realEstate.owners, from);
			if (indexToRemove < realEstate.owners.length - 1) {
				realEstate.owners[indexToRemove] = realEstate.owners[
					realEstate.owners.length - 1
				];
			}
			
			realEstate.owners.pop();
		}

		uint256 receiverBalance = balanceOf(to, tokenId);
		if (receiverBalance == 0) {
			realEstate.owners.push(to);
		}

		_safeTransferFrom(from, to, tokenId, amount, "");

		emit RealEstateUpdated(
			realEstate.tokenId,
			realEstate.owners,
			realEstate.noOfTokens,
			realEstate.priceOf1Token,
			realEstate.status,
			realEstate.rentInfo,
			realEstate.realEstateBalance
		);
	}
}
