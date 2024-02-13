import { Box, Button, Text } from "@chakra-ui/react";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function ProposalsAndBids({ tokenIds }) {

    const { data: proposals } = useScaffoldContractRead({
        contractName: "RealEstateERC1155",
        functionName: "getProposalsForTokenIds",
        args: [tokenIds ?? []],
        watch: false
    });

    const { data: bids } = useScaffoldContractRead({
        contractName: "RealEstateERC1155",
        functionName: "getBidsForTokenIds",
        args: [tokenIds ?? []],
        watch: false
    });

    console.log(bids, "bids", proposals, "proposals");

    const { writeAsync: vote } = useScaffoldContractWrite({
        contractName: "RealEstateERC1155",
        functionName: "vote",
        args: [BigInt(0), true],
    });

    const { writeAsync: executeProposal } = useScaffoldContractWrite({
        contractName: "RealEstateERC1155",
        functionName: "executeProposal",
        args: [BigInt(0), BigInt(0)],
    });

    const { writeAsync: selectBid } = useScaffoldContractWrite({
        contractName: "RealEstateERC1155",
        functionName: "selectBid",
        args: [BigInt(0), BigInt(0)],
    });

    console.log(status, "status");

    const flattenedProposals = proposals?.flatMap((proposalsArray, index) => proposalsArray.map((proposal) => ({ ...proposal, tokenId: tokenIds[index] })));
    const flattenedBids = bids?.flatMap((bidsArray, index) => bidsArray.map((bid) => ({ ...bid, tokenId: tokenIds[index] })));

    console.log(flattenedBids, "flattened bids");

    // Filter proposals into executed, active, and expired categories
    const executedProposals = flattenedProposals?.filter((proposal) => proposal.executed);
    const activeProposals = flattenedProposals?.filter((proposal) => !proposal.executed && Date.now() <= Number(proposal.deadline));
    const expiredProposals = flattenedProposals?.filter((proposal) => Date.now() > Number(proposal.deadline));
    const activeBids = flattenedBids?.filter((bid) => bid.status === 0);
    const executedBids = flattenedBids?.filter((bid) => bid.status === 1);

    console.log(activeBids, "activeBids", executedBids, "executedBids");

    return (
        <div>
            <div>
                <h1 className="text-3xl"> Proposals</h1>

                {activeProposals?.map((proposal: any) => (
                    <Box key={proposal.proposalId} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
                        <Text fontSize="xl" fontWeight="semibold">Proposal ID: {Number(proposal.proposalId)}</Text>
                        <Text>Positive Votes: {Number(proposal.positiveVotes)}</Text>
                        <Text>Negative Votes: {Number(proposal.negativeVotes)}</Text>
                        <Button onClick={() => vote({ args: [proposal.proposalId, true] })}>Yes</Button>
                        <Button onClick={() => vote({ args: [proposal.proposalId, false] })}>No</Button>
                    </Box>
                ))}
            </div>
            <div>
            <h1 className="text-3xl"> Bids</h1>

                {activeBids?.map((bid: any) => (
                    <Box key={bid.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
                        <Text fontSize="xl" fontWeight="semibold">Bid ID: {Number(bid.id)}</Text>
                        <Text>Bid Amount: {Number(bid.bidAmount)}</Text>
                        <Text>Token ID: {Number(bid.tokenId)}</Text>
                        <Text>Number of Tokens: {Number(bid.numberOfTokens)}</Text>
                        <Button onClick={() => { selectBid({ args: [BigInt(params.id), BigInt(bid.id)] }) }}>Select Bid</Button>
                    </Box>
                ))}

            </div>
        </div>
    );
}
