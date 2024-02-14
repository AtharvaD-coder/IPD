//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";

contract RealEstateERC1155 is ERC1155 {
	using Counters for Counters.Counter;
	uint256 public proposalCounter=0;
	Counters.Counter  public  _tokenIdCounter;
	
	

	enum voteStatusEnum {
		notVoted,
		positiveVote,
		negativeVote
	}
	enum voteUserEnum{
		noVote,
		upvote,
		downvote
	}
	

	mapping(uint256 => RealEstate) public realEstates;
	mapping(uint256 => Proposals) public proposals;
	mapping(uint256 => Bid[]) public tokenBids;
	mapping(uint256 => mapping(address => voteStatusEnum)) public voteStatus;
	mapping(uint256 => string) public tokenMetadataURIs; // Mapping to store metadata URI for each token
    mapping(uint256 => PriceHistory[]) public priceHistories;
	struct PriceHistory {
			uint256 timestamp;
			uint256 price;
		}
	mapping(uint256 => uint256) private _rentalIncomes;
	mapping(uint256 => uint256) private _saleIncomes;
	mapping(uint256 => uint256) private _costs;
	mapping(address=>mapping(address=>voteUserEnum)) public userVotes;
	mapping(address => uint256) public upvotes;
	mapping(address => uint256) public downvotes;


	enum RealEstateStatus {
		ListedForSale,
		Rented,
		ListedForRent,
		Sale
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
	enum BidStatus {
		Pending,
		Executed,
		Withdrawn
	}

	struct Bid {
		address bidder;
		uint256 numberOfTokens;
		uint256 bidAmount;
		BidStatus status;
		uint256 id;
	}
	event RealEstateListed(
        uint256 indexed tokenId,
        address[] owners,
        uint256 noOfTokens,
        uint256 priceOf1Token,
        string metadataUri
    );
    event RealEstateUpdated(
        uint256 indexed tokenId,
        address[] owners,
        uint256 noOfTokens,
        uint256 priceOf1Token,
        RealEstateStatus status,
        RentInfo rentInfo,
        uint256 realEstateBalance,
        string metadataUri
    );
	event RealEstateStatusUpdated(
		uint256 indexed tokenId,
		RealEstateStatus status
	);
    event RealEstateRented(
        uint256 indexed tokenId,
        address indexed rentee,
        uint256 noOfMonths,
        uint256 rentof1Month
    );
	struct TokenInfo {
			uint256 tokenId;
			uint256 numberOfTokens;
			uint256 amount;
		}
	event RentalRecorded(uint256 indexed tokenId, uint256 rentalAmount);
	event SaleRecorded(uint256 indexed tokenId, uint256 saleAmount);

	constructor() ERC1155("OpenEstate,OE") {}
	
  function getTokenIdCounter() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
	function listRealEstateForSale(
		uint256 initialAmountOfTokens,
		address owner,
		uint256 priceOf1token,
		string memory metadataUri
	) public {
		uint256 tokenId = _tokenIdCounter.current();
		_mint(owner, tokenId, initialAmountOfTokens, "");
		tokenMetadataURIs[tokenId] = metadataUri; // Store metadata URI for the token

		RealEstate storage newProperty = realEstates[tokenId];
		newProperty.noOfTokens = initialAmountOfTokens;
		newProperty.priceOf1Token = priceOf1token;
		newProperty.tokenId = tokenId;
		newProperty.owners.push(owner);
		newProperty.status = RealEstateStatus.ListedForSale;
		newProperty.balanceofMemebers[owner] += initialAmountOfTokens;

		priceHistories[tokenId].push(PriceHistory({
			timestamp: block.timestamp,
			price: priceOf1token
		}));	

		_tokenIdCounter.increment();
		emit RealEstateListed(
			tokenId,
			newProperty.owners,
			initialAmountOfTokens,
			priceOf1token,
			metadataUri
		);
	}

	// Function to list real estate property for rent with metadata
	function listRealEstateForRent(
		uint256 initialAmountOfTokens,
		address owner,
		uint256 priceOf1token,
		uint256 numberOfMonths,
		uint256 rentof1Month,
		uint256 depositAmount,
		uint256 feesForLateInstallments,
		uint256 deadline,
		string memory metadataUri
	) public {
		require(owner == msg.sender, "You are not the owner of this property");
		require(
			initialAmountOfTokens > 0,
			"Number of tokens must be greater than zero"
		);
		require(
			priceOf1token > 0,
			"Price of 1 token must be greater than zero"
		);
		require(deadline > block.timestamp, "Deadline must be in the future");

		uint256 tokenId = _tokenIdCounter.current();
		_mint(owner, tokenId, initialAmountOfTokens, "");
		tokenMetadataURIs[tokenId] = metadataUri; // Store metadata URI for the token

		RealEstate storage newProperty = realEstates[tokenId];
		newProperty.noOfTokens = initialAmountOfTokens;
		newProperty.priceOf1Token = priceOf1token;
		newProperty.tokenId = tokenId;
		newProperty.owners.push(owner);
		newProperty.status = RealEstateStatus.ListedForRent;
		newProperty.balanceofMemebers[owner] += initialAmountOfTokens;
		newProperty.rentInfo = RentInfo({
			rentee: address(0),
			noOfMonths: numberOfMonths,
			rentof1Month: rentof1Month,
			depositAmount: depositAmount,
			noOfInstallmentsPaid: 0,
			feesForLateInstallments: feesForLateInstallments,
			contractStartTimestamp: 0
		});
		priceHistories[tokenId].push(PriceHistory({
					timestamp: block.timestamp,
					price: priceOf1token
				}));	
		_tokenIdCounter.increment();

		emit RealEstateListed(
			tokenId,
			newProperty.owners,
			initialAmountOfTokens,
			priceOf1token,
			metadataUri
		);
	}

	

	// Function to get metadata URI for a token
	function tokenURI(
		uint256 tokenId
	) public view virtual returns (string memory) {
		return tokenMetadataURIs[tokenId];
	}

	function getPendingBids(
		uint256 tokenId
	) public view returns (Bid[] memory) {
		uint256 pendingBidsCount = 0;
		for (uint256 i = 0; i < tokenBids[tokenId].length; i++) {
			if (tokenBids[tokenId][i].status == BidStatus.Pending) {
				pendingBidsCount++;
			}
		}

		Bid[] memory pendingBids = new Bid[](pendingBidsCount);
		uint256 index = 0;
		for (uint256 i = 0; i < tokenBids[tokenId].length; i++) {
			if (tokenBids[tokenId][i].status == BidStatus.Pending) {
				pendingBids[index] = tokenBids[tokenId][i];
				index++;
			}
		}

		return pendingBids;
	}

	function getAllProposals(
		uint256 tokenId
	) public view returns (Proposals[] memory) {
		uint256 totalProposals = 0;
		for (uint256 i = 0; i < proposalCounter; i++) {
			if (proposals[i].tokenId == tokenId) {
				totalProposals++;
			}
		}

		Proposals[] memory tokenProposals = new Proposals[](totalProposals);
		uint256 index = 0;
		for (uint256 i = 0; i < proposalCounter; i++) {
			if (proposals[i].tokenId == tokenId) {
				tokenProposals[index] = proposals[i];
				index++;
			}
		}

		return tokenProposals;
	}

	

	function getRealEstatesByOwner(address owner) public view returns (TokenInfo[] memory) {
        uint256[] memory ownedTokenIds = new uint256[](getTokenIdCounter());
        uint256[] memory tokenCounts = new uint256[](getTokenIdCounter());
        uint256[] memory amounts = new uint256[](getTokenIdCounter());
        uint256 count = 0;
        for (uint256 i = 0; i < getTokenIdCounter(); i++) {
            if (isOwnerOf(i, owner)) {
                ownedTokenIds[count] = i;
                tokenCounts[count] = balanceOf(owner, i);
                amounts[count] = tokenCounts[count] * realEstates[i].priceOf1Token;
                count++;
            }
        }
        TokenInfo[] memory tokenInfoArray = new TokenInfo[](count);
        for (uint256 i = 0; i < count; i++) {
            tokenInfoArray[i] = TokenInfo({
                tokenId: ownedTokenIds[i],
                numberOfTokens: tokenCounts[i],
                amount: amounts[i]
            });
        }
        return tokenInfoArray;
    }

	function getBids(uint256 tokenId) public view returns (Bid[] memory) {
		uint256 activeBidsCount = 0;
		for (uint256 i = 0; i < tokenBids[tokenId].length; i++) {
			if (tokenBids[tokenId][i].status != BidStatus.Withdrawn) {
				activeBidsCount++;
			}
		}

		Bid[] memory activeBids = new Bid[](activeBidsCount);
		uint256 index = 0;
		for (uint256 i = 0; i < tokenBids[tokenId].length; i++) {
			if (tokenBids[tokenId][i].status != BidStatus.Withdrawn) {
				activeBids[index] = tokenBids[tokenId][i];
				index++;
			}
		}

		return activeBids;
	}

	function placeBidAndPay(
		uint256 tokenId,
		uint256 numberOfTokens
	) public payable {
		require(msg.value > 0, "Bid amount must be greater than zero");
		Bid memory newBid = Bid({
			bidder: msg.sender,
			numberOfTokens: numberOfTokens,
			bidAmount: msg.value,
			status: BidStatus.Pending,
			id: tokenBids[tokenId].length
		});
		tokenBids[tokenId].push(newBid);
	}

	function withdrawBid(uint256 tokenId, uint256 bidIndex) public {
		require(tokenBids[tokenId].length > bidIndex, "Bid index out of range");
		require(
			tokenBids[tokenId][bidIndex].bidder == msg.sender,
			"You cannot withdraw this bid"
		);
		require(
			tokenBids[tokenId][bidIndex].status == BidStatus.Pending,
			"Bid already executed or withdrawn"
		);
		tokenBids[tokenId][bidIndex].status = BidStatus.Withdrawn;
		payable(msg.sender).transfer(tokenBids[tokenId][bidIndex].bidAmount);
	}

	function selectBid(uint256 tokenId, uint256 bidIndex) public {
		require(tokenBids[tokenId].length > bidIndex, "Bid index out of range");
		require(isOwnerOf(tokenId, msg.sender), "You are not the owner");
		require(
			tokenBids[tokenId][bidIndex].status == BidStatus.Pending,
			"Bid already executed or withdrawn"
		);
		tokenBids[tokenId][bidIndex].status = BidStatus.Executed;
		transferTokens(
			tokenId,
			tokenBids[tokenId][bidIndex].bidder,
			msg.sender,
			tokenBids[tokenId][bidIndex].numberOfTokens
		);
		payable(msg.sender).transfer(tokenBids[tokenId][bidIndex].bidAmount);
		priceHistories[tokenId].push(PriceHistory({
			timestamp: block.timestamp,
			price: tokenBids[tokenId][bidIndex].bidAmount/tokenBids[tokenId][bidIndex].numberOfTokens
		}));
	}

	function getPriceHistory(uint256 tokenId) public view returns (PriceHistory[] memory) {
        return priceHistories[tokenId];
    }

	function getPriceHistoriesForTokens(uint256[] memory tokenIds) public view returns (PriceHistory[][] memory) {
    PriceHistory[][] memory allPriceHistories = new PriceHistory[][](tokenIds.length);

    for (uint256 i = 0; i < tokenIds.length; i++) {
        allPriceHistories[i] = getPriceHistory(tokenIds[i]);
    }

    return allPriceHistories;
}

	function getRealEstate(uint256 tokenId) public view returns (uint256, uint256, uint256, RealEstateStatus, address[] memory, RentInfo memory, uint256) {
    require(tokenId < _tokenIdCounter.current(), "Real estate does not exist");

		RealEstate storage realEstate = realEstates[tokenId];
		return (
			realEstate.noOfTokens,
			realEstate.priceOf1Token,
			realEstate.tokenId,
			realEstate.status,
			realEstate.owners,
			realEstate.rentInfo,
			realEstate.realEstateBalance
		);
	}

	function getaddress() public view returns (address) {
		return msg.sender;
	}

	function isSoleOwner(
		uint256 tokenId,
		address owner
	) public view returns (bool) {
		RealEstate storage realEstate = realEstates[tokenId];
		if (balanceOf(owner, tokenId) == 0) {
			return false;
		}

		if (balanceOf(owner, tokenId) == realEstate.noOfTokens) {
			return true;
		}

		return false;
	}

	function updateStatus(
		uint256 tokenId,
		RealEstateStatus _status,
		uint256 deadline
	) public {
		RealEstate storage realEstate = realEstates[tokenId];

			if(balanceOf(msg.sender, tokenId) == realEstate.noOfTokens){
				realEstate.status = _status;
				emit RealEstateStatusUpdated(
					realEstate.tokenId,
					realEstate.status
				);
			}
			else{
				if(_status==RealEstateStatus.ListedForRent){
					createProposal(ProposalType.ListForRent, tokenId, deadline);
				}
				else if(_status==RealEstateStatus.ListedForSale){
					createProposal(ProposalType.UnlistForRent, tokenId, deadline);

				}
		
			}
		



		
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

			proposals[proposalCounter].proposalId = proposalId;
			proposals[proposalCounter].proposalCreator = msg.sender;
			proposals[proposalCounter].positiveVotes = 0;
			proposals[proposalCounter].negativeVotes = 0;
			proposals[proposalCounter].proposalType = ProposalType
				.updateRentInfo;
			proposals[proposalCounter].tokenId = tokenId;
			proposals[proposalCounter].executed = false;
			proposals[proposalCounter].deadline = deadline;
			proposals[proposalCounter].rentProposal = RentProposal({
				rentee: address(0),
				noOfMonths: 0,
				depositBalance: 0
			});
			proposals[proposalCounter].rentInfo = RentInfo({
				rentee: rentinfo.rentee,
				noOfMonths: numberOfMonths,
				rentof1Month: rentof1Month,
				depositAmount: depositAmount,
				noOfInstallmentsPaid: 0,
				feesForLateInstallments: feesForLateInstallments,
				contractStartTimestamp: 0
			});
			realEstate.proposalExists[proposalId] = true;
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
			realEstate.realEstateBalance,
			tokenMetadataURIs[tokenId]
		);
	}

	function getOwners(uint256 tokenId) public view returns (address[] memory) {
		RealEstate storage realEstate = realEstates[tokenId];
		return realEstate.owners;
	}

	function getOwnersAndPercentage(
		uint256 tokenId
	) public view returns (address[] memory, uint256[] memory) {
		RealEstate storage realEstate = realEstates[tokenId];
		address[] memory owners = realEstate.owners;
		uint256[] memory percentages = new uint256[](owners.length);

		uint256 totalTokens = realEstate.noOfTokens;

		for (uint256 i = 0; i < owners.length; i++) {
			percentages[i] =
				(balanceOf(owners[i], tokenId) * 100) /
				totalTokens;
		}

		return (owners, percentages);
	}

	function isOwnerOf(
		uint256 tokenId,
		address owner
	) public view returns (bool) {
		RealEstate storage realEstate = realEstates[tokenId];
		for (uint256 i = 0; i < realEstate.owners.length; i++) {
			if (realEstate.owners[i] == owner) {
				return true;
			}
		}
		return false;
	}

	function createProposal(
		ProposalType proposalType,
		uint256 tokenId,
		uint256 deadline
	) public {
		RealEstate storage realEstate = realEstates[tokenId];
		uint256 proposalId = proposalCounter;

		proposals[proposalId].proposalId = proposalId;
		proposals[proposalId].proposalCreator = msg.sender;
		proposals[proposalId].positiveVotes = 0;
		proposals[proposalId].negativeVotes = 0;
		proposals[proposalId].proposalType = proposalType;
		proposals[proposalId].tokenId = tokenId;
		proposals[proposalId].executed = false;
		proposals[proposalId].deadline = deadline;
		proposals[proposalId].rentProposal = RentProposal({
			rentee: address(0),
			noOfMonths: 0,
			depositBalance: 0
		});
		proposals[proposalId].rentInfo = RentInfo({
			rentee: address(0),
			noOfMonths: 0,
			rentof1Month: 0,
			depositAmount: 0,
			noOfInstallmentsPaid: 0,
			feesForLateInstallments: 0,
			contractStartTimestamp: 0
		});
		realEstate.proposalExists[proposalId] = true;
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
			realEstate.status == RealEstateStatus.ListedForRent,
			"not for rent"
		);
		require(
			msg.value >= realEstate.rentInfo.depositAmount,
			"deposit amount less"
		);

		proposals[proposalId].proposalId = proposalId;
		proposals[proposalId].proposalCreator = msg.sender;
		proposals[proposalId].positiveVotes = 0;
		proposals[proposalId].negativeVotes = 0;
		proposals[proposalId].proposalType = ProposalType.setRentee;
		proposals[proposalId].tokenId = tokenId;
		proposals[proposalId].executed = false;
		proposals[proposalId].deadline = deadline;
		proposals[proposalId].rentProposal = RentProposal({
			rentee: rentee,
			noOfMonths: noOfMonths,
			depositBalance: msg.value
		});
		proposals[proposalId].rentInfo = RentInfo({
			rentee: address(0),
			noOfMonths: 0,
			rentof1Month: 0,
			depositAmount: 0,
			noOfInstallmentsPaid: 0,
			feesForLateInstallments: 0,
			contractStartTimestamp: 0
		});
		realEstate.proposalExists[proposalId] = true;
		proposalCounter++;
	}

	function canVoteUser(address user) public view returns (bool){
		TokenInfo[] memory tokenIds=getRealEstatesByOwner(user);
		for(uint256 i=0;i<tokenIds.length;i++){
			if(isOwnerOf(tokenIds[i].tokenId, msg.sender)){
				return true;
			}
		}

		return false;
	}




	function voteUser(address user,voteUserEnum voteValue) public{
		require(canVoteUser(user),"no property in common");
		require(voteValue==userVotes[user][msg.sender],"Already Voted");
		userVotes[user][msg.sender]=voteValue;
		
	}

	function upvoteUser(address user) public {
		require(canVoteUser(user), "No property in common");
		require(userVotes[user][msg.sender] != voteUserEnum.upvote  , "Already upvoted");
		if(userVotes[user][msg.sender]==voteUserEnum.downvote){
			downvotes[user]--;
		}
		upvotes[user]++;
		userVotes[user][msg.sender] = voteUserEnum.upvote;
	}

	function downvoteUser(address user) public {
		require(canVoteUser(user), "No property in common");
		require(userVotes[user][msg.sender] != voteUserEnum.downvote, "Already downvoted");
		if(userVotes[user][msg.sender]==voteUserEnum.upvote){
			upvotes[user]--;
		}
		downvotes[user]++;
		userVotes[user][msg.sender] = voteUserEnum.downvote;
	}

	function getUserVotesCount(address user) public view returns (uint256 upvoteCount, uint256 downvoteCount) {
		return (upvotes[user], downvotes[user]);
	}


	function getProposalVotes(
		uint256 proposalId
	) public view returns (uint256 positiveVotes, uint256 negativeVotes) {
		require(proposalId < proposalCounter, "Proposal does not exist");

		return (
			proposals[proposalId].positiveVotes,
			proposals[proposalId].negativeVotes
		);
	}

	 function getProposalsForTokenIds(uint256[] memory tokenIds) public view returns (RealEstateERC1155.Proposals[][] memory) {
        RealEstateERC1155.Proposals[][] memory allProposals = new RealEstateERC1155.Proposals[][](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            allProposals[i] = getAllProposals(tokenIds[i]);
        }

        return allProposals;
    }

    function getBidsForTokenIds(uint256[] memory tokenIds) public view returns (RealEstateERC1155.Bid[][] memory) {
        RealEstateERC1155.Bid[][] memory allBids = new RealEstateERC1155.Bid[][](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            allBids[i] = getBids(tokenIds[i]);
        }

        return allBids;
    }

	function vote(uint256 proposalId, bool isPositiveVote) public {
		Proposals storage proposal = proposals[proposalId];
		RealEstate storage realEstate = realEstates[proposal.tokenId];
		require(block.timestamp <= proposal.deadline, "Proposal Expired");
		require(
			realEstate.proposalExists[proposalId] == true,
			"proposal does not exits"
		);

		require(balanceOf(msg.sender, proposal.tokenId) > 0, "you cant vote");
		require(proposal.executed == false, "Proposal already executed");
		require(
			!(voteStatus[proposalId][msg.sender] ==
				voteStatusEnum.positiveVote &&
				isPositiveVote),
			"Already Voted"
		);
		require(
			!(voteStatus[proposalId][msg.sender] ==
				voteStatusEnum.negativeVote &&
				!isPositiveVote),
			"Already Voted"
		);

		if (isPositiveVote) {
			if (
				voteStatus[proposalId][msg.sender] ==
				voteStatusEnum.negativeVote
			) {
				proposal.negativeVotes -= 1;
			}
			voteStatus[proposalId][msg.sender] = voteStatusEnum.positiveVote;
			proposal.positiveVotes += 1;
		} else {
			if (
				voteStatus[proposalId][msg.sender] ==
				voteStatusEnum.positiveVote
			) {
				proposal.positiveVotes -= 1;
			}
			voteStatus[proposalId][msg.sender] = voteStatusEnum.negativeVote;
			proposal.negativeVotes += 1;
		}

		emit ProposalUpserted(
			proposalId,
			proposal.proposalCreator,
			proposal.positiveVotes,
			proposal.negativeVotes,
			proposal.proposalType,
			proposal.tokenId,
			proposal.executed,
			proposal.rentProposal,
			proposal.deadline,
			proposal.rentInfo
		);
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

		bool isApproved = proposal.positiveVotes > proposal.negativeVotes ||
			realEstate.owners.length == 1;

		require(isApproved, "not approved");
		if (proposal.proposalType == ProposalType.ListForRent) {
			realEstate.status = RealEstateStatus.ListedForRent;
			emit RealEstateStatusUpdated(
			realEstate.tokenId,
			realEstate.status
		);
		} else if (proposal.proposalType == ProposalType.UnlistForRent) {
			realEstate.status = RealEstateStatus.ListedForSale;
			emit RealEstateStatusUpdated(
			realEstate.tokenId,
			realEstate.status
		);
		} else if (proposal.proposalType == ProposalType.setRentee) {
			require(
				realEstate.status == RealEstateStatus.ListedForRent,
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
			emit RealEstateStatusUpdated(
			realEstate.tokenId,
			realEstate.status
		);
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
			realEstate.realEstateBalance,
			tokenMetadataURIs[tokenId]
		);
	}

	function recordRentalIncome(uint256 tokenId, uint256 rentalAmount) public {
		require(
			isOwnerOf(tokenId, msg.sender),
			"Only the owner can record income."
		);

		_rentalIncomes[tokenId] += rentalAmount;
		emit RentalRecorded(tokenId, rentalAmount);
	}

	function recordSaleIncome(uint256 tokenId, uint256 saleAmount) public {
		require(
			isOwnerOf(tokenId, msg.sender),
			"Only the owner can record income."
		);

		_saleIncomes[tokenId] += saleAmount;
		emit SaleRecorded(tokenId, saleAmount);
	}

	// 	function recordCosts(uint256 tokenId, uint256 costAmount) public {
	//     require(isOwnerOf(tokenId, msg.sender), "Only the owner can record costs.");

	//     _costs[tokenId] += costAmount;
	//     emit CostRecorded(tokenId, costAmount);
	// }

	function calculateNetProfit(address owner) public view returns (uint256) {
		uint256 totalIncome = 0;

		// Iterate over all real estates owned by the owner
		for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
			if (isOwnerOf(i, owner)) {
				totalIncome += _rentalIncomes[i] + _saleIncomes[i];
			}
		}

		return totalIncome;
	}
}
