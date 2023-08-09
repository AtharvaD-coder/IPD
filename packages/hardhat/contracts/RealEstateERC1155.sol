pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract RealEstateERC1155 is ERC1155 {
	using Counters for Counters.Counter;
	Counters.Counter public _tokenIdCounter;
	event RealEstateListed(
		uint256 indexed tokenId,
		address[] owners,
		uint256 noOfTokens,
		uint256 priceOf1Token
	);
	event RealEstateRented(
		uint256 indexed tokenId,
		address indexed rentee,
		uint256 noOfMonths,
		uint256 rentof1Month
	);

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
		setRentee
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
	}

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

		_tokenIdCounter.increment();
		emit RealEstateListed(
			tokenId,
			newProperty.owners,
			initialAmountOfTokens,
			priceOf1token
		);
	}

	function createProposal(
		ProposalType proposalType,
		uint256 tokenId,
		uint256 deadline
	) public {
		uint256 proposalId = proposals[tokenId].proposalId + 1;
		proposals[tokenId] = Proposals({
			proposalId: proposalId,
			proposalCreator: msg.sender,
			positiveVotes: 0,
			negativeVotes: 0,
			proposalType: proposalType,
			tokenId: tokenId,
			executed: false,
			deadline: deadline,
			rentProposal: RentProposal({
				rentee: address(0),
				noOfMonths: 0,
				depositBalance: 0
			})
		});
	}

	function createRenteeProposal(
		uint256 tokenId,
		address rentee,
		uint256 noOfMonths,
		uint256 deadline
	) public payable {
		uint256 proposalId = proposals[tokenId].proposalId + 1;
		RealEstate storage realEstate = realEstates[tokenId];

		require(
			msg.value >= realEstate.rentInfo.depositAmount,
			"deposit amount less"
		);
		proposals[tokenId] = Proposals({
			proposalId: proposalId,
			proposalCreator: msg.sender,
			positiveVotes: 0,
			negativeVotes: 0,
			proposalType: ProposalType.setRentee,
			tokenId: tokenId,
			executed: false,
			deadline: deadline,
			rentProposal: RentProposal({
				rentee: rentee,
				noOfMonths: noOfMonths,
				depositBalance: msg.value
			})
		});
	}

	function vote(
		uint256 proposalId,
		uint256 tokenId,
		bool isPositiveVote
	) public {
		Proposals storage proposal = proposals[proposalId];
		RealEstate storage realEstate = realEstates[tokenId];
		require(block.timestamp <= proposal.deadline, "Proposal Expired");
		require(
			realEstate.proposalExists[proposalId] == true,
			"proposal does not exits"
		);
		require(
			proposal.proposalCreator != address(0),
			"Proposal does not exist"
		);
		require(!proposal.executed, "Proposal already executed");

		if (isPositiveVote) {
			proposal.positiveVotes += 1;
		} else {
			proposal.negativeVotes += 1;
		}
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
		uint256 receiverBalance = balanceOf(to, tokenId);

		if (receiverBalance == 0) {
			realEstate.owners.push(to);
		}

		_safeTransferFrom(from, to, tokenId, amount, "");
		realEstate.balanceofMemebers[from] -= amount;
		realEstate.balanceofMemebers[to] += amount;
		if (realEstate.balanceofMemebers[from] == 0) {
			// Find the index of the 'from' address in the owners array
			uint256 indexToRemove = findIndex(realEstate.owners, from);
			if (indexToRemove < realEstate.owners.length - 1) {
				// Move the last element to the index to remove (to avoid gaps in the array)
				realEstate.owners[indexToRemove] = realEstate.owners[
					realEstate.owners.length - 1
				];
			}
			// Remove the last element (which is a duplicate after the previous move)
			realEstate.owners.pop();
		}
	}
}
