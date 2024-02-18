import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { CardBox } from "~~/components/custom_components/cardComponent";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";




export default function Proposals({ id, tokenId }: any) {
    const { data: proposals } = useScaffoldContractRead({
        contractName: "RealEstateERC1155",
        functionName: "getAllProposals",
        args: [id ?? 0],
        watch: true,
    });
    const { writeAsync: executeProposal } = useScaffoldContractWrite({
        contractName: "RealEstateERC1155",
        functionName: "executeProposal",
        args: [BigInt(0), BigInt(0)],
    });
    const { writeAsync: vote } = useScaffoldContractWrite({
        contractName: "RealEstateERC1155",
        functionName: "vote",
        args: [BigInt(0), true],
    });

    const expiredProposals = proposals?.filter((proposal: any) => Date.now() > Number(proposal.deadline));
    const executedProposals = proposals?.filter((proposal: any) => proposal.executed);
    const activeProposals = proposals?.filter(
        (proposal: any) => !proposal.executed && Date.now() <= Number(proposal.deadline),
    );

    return (
        <CardBox>
            <h1 className="text-3xl font-bold mb-5">Proposals</h1>

            <Tabs>
                <TabList>

                    <Tab>Active Proposals</Tab>
                    <Tab>Executed Proposals</Tab>
                    <Tab>Expired Proposals</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Box>
                            <Text>Active Proposals - {activeProposals?.length}</Text>
                            {activeProposals?.map((proposal: any) => (
                                <Box key={proposal.proposalId} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
                                    <Text fontSize="xl" fontWeight="semibold">
                                        Proposal ID: {Number(proposal.proposalId)}
                                    </Text>
                                    <Text>Positive Votes: {Number(proposal.positiveVotes)}</Text>
                                    <Text>Negative Votes: {Number(proposal.negativeVotes)}</Text>
                                    <Button onClick={() => vote({ args: [proposal.proposalId, true] })}>Yes</Button>
                                    <Button onClick={() => vote({ args: [proposal.proposalId, false] })}>No</Button>
                                </Box>
                            ))}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box>
                            <Text>Executed Proposals - {executedProposals?.length}</Text>
                            {executedProposals?.map((proposal: any) => (
                                <Box key={proposal.proposalId} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
                                    <Text fontSize="xl" fontWeight="semibold">
                                        Proposal ID: {Number(proposal.proposalId)}
                                    </Text>
                                    <Text>Positive Votes: {Number(proposal.positiveVotes)}</Text>
                                    <Text>Negative Votes: {Number(proposal.negativeVotes)}</Text>
                                </Box>
                            ))}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box>
                            <Text>Expired Proposals - {expiredProposals?.length}</Text>
                            {expiredProposals?.map((proposal: any) => (
                                <Box key={proposal.proposalId} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
                                    <Text fontSize="xl" fontWeight="semibold">
                                        Proposal ID: {Number(proposal.proposalId)}
                                    </Text>
                                    <Text>Positive Votes: {Number(proposal.positiveVotes)}</Text>
                                    <Text>Negative Votes: {Number(proposal.negativeVotes)}</Text>
                                    <Button onClick={() => executeProposal({ args: [proposal.proposalId, tokenId] })}>Execute</Button>
                                </Box>
                            ))}
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </CardBox>
    )
}