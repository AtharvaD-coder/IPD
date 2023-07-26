//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract RealEstateERC1155 is ERC1155 {
	mapping(uint256 => address) public tokenCreators;
	mapping(uint256 => uint256) public tokenSupply;
	mapping(uint256 => uint256) public tokenPrice;
	mapping(uint256 => bool) public tokenForSale;
	mapping(uint256 => bool) public tokenForRent;
	mapping(uint256 => uint256) public tokenRentPrice;
	mapping(uint256 => bool) public tokenRented;
	mapping(uint256 => address) public tokenCurrentRenter;

	constructor() ERC1155("OpenEstate,OE") {}

	function mint(
		address _creator,
		uint256 _tokenId,
		uint256 _initialSupply,
		uint256 _price
	) public {
		require(_creator != address(0), "Creator address cannot be zero.");
		_mint(_creator, _tokenId, _initialSupply, "");
		tokenCreators[_tokenId] = _creator;
		tokenSupply[_tokenId] = _initialSupply;
		tokenPrice[_tokenId] = _price;
		tokenForSale[_tokenId] = true;
	}

	function buyToken(uint256 _tokenId) public payable {
		require(tokenForSale[_tokenId], "Token is not for sale.");
		require(msg.value >= tokenPrice[_tokenId], "Insufficient payment.");
		safeTransferFrom(tokenCreators[_tokenId], msg.sender, _tokenId, 1, "");
		tokenForSale[_tokenId] = false;
		payable(tokenCreators[_tokenId]).transfer(msg.value);
	}

	function setTokenURI(uint256 _tokenId, string memory _tokenURI) public {
		require(
			msg.sender == tokenCreators[_tokenId],
			"Only the creator can set the token URI."
		);
		_setURI(_tokenURI);
	}

	function setTokenRent(uint256 _tokenId, uint256 _rentPrice) public {
		require(
			msg.sender == tokenCreators[_tokenId],
			"Only the creator can set the token for rent."
		);
		tokenForRent[_tokenId] = true;
		tokenRentPrice[_tokenId] = _rentPrice;
	}

	function rentToken(uint256 _tokenId) public payable {
		require(tokenForRent[_tokenId], "Token is not for rent.");
		require(msg.value >= tokenRentPrice[_tokenId], "Insufficient payment.");
		tokenRented[_tokenId] = true;
		tokenCurrentRenter[_tokenId] = msg.sender;
		payable(tokenCreators[_tokenId]).transfer(msg.value);
	}

	function endRent(uint256 _tokenId) public {
		require(tokenRented[_tokenId], "Token is not currently rented.");
		require(
			msg.sender == tokenCurrentRenter[_tokenId],
			"Only the renter can end the rent."
		);
		tokenRented[_tokenId] = false;
		tokenCurrentRenter[_tokenId] = address(0);
	}

	function transferToken(
		uint256 _tokenId,
		address _to,
		uint256 _amount
	) public {
		safeTransferFrom(msg.sender, _to, _tokenId, _amount, "");
	}

	function getCurrentOwner(uint256 _tokenId) public view returns (address) {
		return tokenCreators[_tokenId];
	}
}
