const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        RealEstateERC1155: {
          address: "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "proposalId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "proposalCreator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "positiveVotes",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "negativeVotes",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "enum RealEstateERC1155.ProposalType",
                  name: "proposalType",
                  type: "uint8",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "executed",
                  type: "bool",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "rentee",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "noOfMonths",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "depositBalance",
                      type: "uint256",
                    },
                  ],
                  indexed: false,
                  internalType: "struct RealEstateERC1155.RentProposal",
                  name: "rentProposal",
                  type: "tuple",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "rentee",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "noOfMonths",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "rentof1Month",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "depositAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "noOfInstallmentsPaid",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "feesForLateInstallments",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "contractStartTimestamp",
                      type: "uint256",
                    },
                  ],
                  indexed: false,
                  internalType: "struct RealEstateERC1155.RentInfo",
                  name: "rentInfo",
                  type: "tuple",
                },
              ],
              name: "ProposalUpserted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address[]",
                  name: "owners",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "noOfTokens",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "priceOf1Token",
                  type: "uint256",
                },
              ],
              name: "RealEstateListed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "rentee",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "noOfMonths",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "rentof1Month",
                  type: "uint256",
                },
              ],
              name: "RealEstateRented",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "address[]",
                  name: "owners",
                  type: "address[]",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "noOfTokens",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "priceOf1Token",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "enum RealEstateERC1155.RealEstateStatus",
                  name: "status",
                  type: "uint8",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "rentee",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "noOfMonths",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "rentof1Month",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "depositAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "noOfInstallmentsPaid",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "feesForLateInstallments",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "contractStartTimestamp",
                      type: "uint256",
                    },
                  ],
                  indexed: false,
                  internalType: "struct RealEstateERC1155.RentInfo",
                  name: "rentInfo",
                  type: "tuple",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "realEstateBalance",
                  type: "uint256",
                },
              ],
              name: "RealEstateUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "ids",
                  type: "uint256[]",
                },
                {
                  indexed: false,
                  internalType: "uint256[]",
                  name: "values",
                  type: "uint256[]",
                },
              ],
              name: "TransferBatch",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "TransferSingle",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "value",
                  type: "string",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "URI",
              type: "event",
            },
            {
              inputs: [],
              name: "_tokenIdCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_value",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "accounts",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "ids",
                  type: "uint256[]",
                },
              ],
              name: "balanceOfBatch",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "enum RealEstateERC1155.ProposalType",
                  name: "proposalType",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "createProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "rentee",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "noOfMonths",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "createRenteeProposal",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "proposalId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "executeProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getAllProposals",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "proposalId",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "proposalCreator",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "positiveVotes",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "negativeVotes",
                      type: "uint256",
                    },
                    {
                      internalType: "enum RealEstateERC1155.ProposalType",
                      name: "proposalType",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "tokenId",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "executed",
                      type: "bool",
                    },
                    {
                      components: [
                        {
                          internalType: "address",
                          name: "rentee",
                          type: "address",
                        },
                        {
                          internalType: "uint256",
                          name: "noOfMonths",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256",
                          name: "depositBalance",
                          type: "uint256",
                        },
                      ],
                      internalType: "struct RealEstateERC1155.RentProposal",
                      name: "rentProposal",
                      type: "tuple",
                    },
                    {
                      internalType: "uint256",
                      name: "deadline",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "address",
                          name: "rentee",
                          type: "address",
                        },
                        {
                          internalType: "uint256",
                          name: "noOfMonths",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256",
                          name: "rentof1Month",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256",
                          name: "depositAmount",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256",
                          name: "noOfInstallmentsPaid",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256",
                          name: "feesForLateInstallments",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256",
                          name: "contractStartTimestamp",
                          type: "uint256",
                        },
                      ],
                      internalType: "struct RealEstateERC1155.RentInfo",
                      name: "rentInfo",
                      type: "tuple",
                    },
                  ],
                  internalType: "struct RealEstateERC1155.Proposals[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getBids",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "bidder",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "numberOfTokens",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bidAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "enum RealEstateERC1155.BidStatus",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct RealEstateERC1155.Bid[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getOwners",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getOwnersAndPercentage",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getPendingBids",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "bidder",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "numberOfTokens",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "bidAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "enum RealEstateERC1155.BidStatus",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct RealEstateERC1155.Bid[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "proposalId",
                  type: "uint256",
                },
              ],
              name: "getProposalVotes",
              outputs: [
                {
                  internalType: "uint256",
                  name: "positiveVotes",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "negativeVotes",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getRealEstate",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "enum RealEstateERC1155.RealEstateStatus",
                  name: "",
                  type: "uint8",
                },
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "rentee",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "noOfMonths",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "rentof1Month",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "depositAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "noOfInstallmentsPaid",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "feesForLateInstallments",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "contractStartTimestamp",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct RealEstateERC1155.RentInfo",
                  name: "",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "getRealEstatesByOwner",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getaddress",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "isOwnerOf",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "isSoleOwner",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "initialAmountOfTokens",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "priceOf1token",
                  type: "uint256",
                },
              ],
              name: "listRealEstate",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "payRent",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "numberOfTokens",
                  type: "uint256",
                },
              ],
              name: "placeBidAndPay",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "proposalCounter",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "proposals",
              outputs: [
                {
                  internalType: "uint256",
                  name: "proposalId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "proposalCreator",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "positiveVotes",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "negativeVotes",
                  type: "uint256",
                },
                {
                  internalType: "enum RealEstateERC1155.ProposalType",
                  name: "proposalType",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "executed",
                  type: "bool",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "rentee",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "noOfMonths",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "depositBalance",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct RealEstateERC1155.RentProposal",
                  name: "rentProposal",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "rentee",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "noOfMonths",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "rentof1Month",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "depositAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "noOfInstallmentsPaid",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "feesForLateInstallments",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "contractStartTimestamp",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct RealEstateERC1155.RentInfo",
                  name: "rentInfo",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "realEstates",
              outputs: [
                {
                  internalType: "uint256",
                  name: "noOfTokens",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "priceOf1Token",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "enum RealEstateERC1155.RealEstateStatus",
                  name: "status",
                  type: "uint8",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "rentee",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "noOfMonths",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "rentof1Month",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "depositAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "noOfInstallmentsPaid",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "feesForLateInstallments",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "contractStartTimestamp",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct RealEstateERC1155.RentInfo",
                  name: "rentInfo",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "realEstateBalance",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256[]",
                  name: "ids",
                  type: "uint256[]",
                },
                {
                  internalType: "uint256[]",
                  name: "amounts",
                  type: "uint256[]",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeBatchTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "bidIndex",
                  type: "uint256",
                },
              ],
              name: "selectBid",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "tokenBids",
              outputs: [
                {
                  internalType: "address",
                  name: "bidder",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "numberOfTokens",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "bidAmount",
                  type: "uint256",
                },
                {
                  internalType: "enum RealEstateERC1155.BidStatus",
                  name: "status",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "numberOfMonths",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "rentof1Month",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "depositAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "feesForLateInstallments",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "updateRentinfo",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "enum RealEstateERC1155.RealEstateStatus",
                  name: "_status",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
              ],
              name: "updateStatus",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "uri",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "proposalId",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isPositiveVote",
                  type: "bool",
                },
              ],
              name: "vote",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "voteStatus",
              outputs: [
                {
                  internalType: "enum RealEstateERC1155.voteStatusEnum",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "bidIndex",
                  type: "uint256",
                },
              ],
              name: "withdrawBid",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
