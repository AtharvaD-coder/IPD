'use client'
import 'chart.js/auto';
import { Box, Text, Button, Tabs, TabList, TabPanels, Tab, TabPanel,Flex } from "@chakra-ui/react";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Pie } from "react-chartjs-2";
import { stat } from 'fs';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'

// Define types for owners and percentages
type Owner = string;
type Percentage = number;

function getStatusString(status: any): string {
    switch (status) {
        case 0:
            return "Listed";
        case 1:
            return "Rented";
        case 2:
            return "Renting";
        default:
            return "Unknown";
    }
}

const PropertyDetails = ({ params }: any) => {
    const { data: realEstateArray } = useScaffoldContractRead({
        contractName: "RealEstateERC1155",
        functionName: "getRealEstate",
        args: [params?.id ?? 0],
        watch: true
    });

    // Check if realEstateArray is undefined before accessing its elements
    const noOfTokens = (realEstateArray as bigint[] | undefined)?.[0];
    const priceOf1Token = (realEstateArray as bigint[] | undefined)?.[1];
    const tokenId = (realEstateArray as bigint[] | undefined)?.[2];
    const status = (realEstateArray as bigint[] | undefined)?.[3];
    const rentInfo = (realEstateArray as bigint[] | undefined)?.[5];
    const realEstateBalance = (realEstateArray as bigint[] | undefined)?.[6];
    console.log(rentInfo,"rentInfo",status)
    const { data: proposals } = useScaffoldContractRead({
        contractName: "RealEstateERC1155",
        functionName: "getAllProposals",
        args: [params?.id ?? 0],
        watch: true
    });

    const {data:bids}=useScaffoldContractRead({
        contractName: "RealEstateERC1155",
        functionName: "getBids",
        args: [params?.id??0],
        watch: true
    })

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


    console.log(status, "status", )

    // Filter proposals into executed, active, and expired categories
    const executedProposals = proposals?.filter((proposal: any) => proposal.executed);
    const activeProposals = proposals?.filter((proposal: any) => !proposal.executed && Date.now() <= Number(proposal.deadline));
    const expiredProposals = proposals?.filter((proposal: any) => Date.now() > Number(proposal.deadline));
    const activeBids=bids?.filter((bid:any)=>bid.status===0 );
    const executedBids=bids?.filter((bid:any)=>bid.status===1);
    const { data: ownersAndPercentages } = useScaffoldContractRead({
        contractName: "RealEstateERC1155",
        functionName: "getOwnersAndPercentage",
        args: [params?.id ?? 0],
        watch: true
    });

    console.log(rentInfo,"rentInfo",status);

    // Extract owners and percentages from ownersAndPercentages data
    const owners: string[] = (ownersAndPercentages?.[0] as unknown as string[] ) ?? [] ;
    const percentages: string[] = (ownersAndPercentages?.[1] as unknown as string[]) ?? [];
    console.log(owners, "owners", percentages, "percentages")

    // Prepare data for the pie chart
    const pieChartData = {
        labels: owners?.map((owner: any) => owner.toString()),
        datasets: [
            {
                data: percentages.map((percentage: any) => Number(percentage)),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF99CC",
                    "#4CAF50",
                    "#FF5722",
                    "#CDDC39",
                    "#673AB7"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF99CC",
                    "#4CAF50",
                    "#FF5722",
                    "#CDDC39",
                    "#673AB7"
                ]
            }
        ]
    };
    return (
        <Box maxWidth='1000px'  p='7'>
           
           <Flex direction="row" justifyContent="space-between" alignItems="flex-start">
                            <Flex direction="column"  justifyContent="flex-start" maxWidth='180px' >
                    <Box bg="gray.200" borderRadius="lg" p={4} textAlign="center" mb={5} minWidth='200px'>
                        <Text fontSize="lg" fontWeight="bold">
                        No. of Tokens : {Number(noOfTokens)}
                        </Text>
                    </Box>
                    <Box bg="gray.200" borderRadius="lg" p={4} textAlign="center" mb={5} minWidth='200px'>
                        <Text fontSize="lg" fontWeight="bold">
                        Price of  1 Token : {Number(priceOf1Token)}
                        </Text>
                    </Box>
                    <Box bg="gray.200" borderRadius="lg" p={4} textAlign="center" minWidth='200px'>
                        <Text fontSize="lg" fontWeight="bold" color={status?.toString() !== 'listed' ? 'green' : 'red'}>
                        Status : {getStatusString(Number(status))}
                        </Text>
                    </Box>
                    </Flex>





            <Box ml={{ base:  0, md: 'calc(50% -  50px)' }} mb={150}>
                <Text fontSize='3xl' mt='-10px' color="	#404040" >Ownership Percentage</Text>
                <Pie data={pieChartData} />
            </Box>

            </Flex>
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
                                    <Text fontSize="xl" fontWeight="semibold">Proposal ID: {Number(proposal.proposalId)}</Text>
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
                                    <Text fontSize="xl" fontWeight="semibold">Proposal ID: {Number(proposal.proposalId)}</Text>
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
                                    <Text fontSize="xl" fontWeight="semibold">Proposal ID: {Number(proposal.proposalId)}</Text>
                                    <Text>Positive Votes: {Number(proposal.positiveVotes)}</Text>
                                    <Text>Negative Votes: {Number(proposal.negativeVotes)}</Text>
                                    <Button onClick={() => executeProposal({args:[proposal.proposalId,tokenId]})}>Execute</Button>
                                </Box>
                            ))}
                        </Box>
                    </TabPanel>

                </TabPanels>
            </Tabs>

            <Tabs mt={10}>
                <TabList>
                    <Tab>Active Bids</Tab>
                    <Tab>Executed Bids</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Box>
                            <Text>Active Bids - {activeProposals?.length}</Text>
                            {activeBids?.map((bid: any) => (
                                <Box key={bid.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
                                    <Text fontSize="xl" fontWeight="semibold">Proposal ID: {Number(bid.id)}</Text>
                                    <Text>bidAmount: {Number(bid.bidAmount)}</Text>
                                    <Text>numberOfTokens: {Number(bid.numberOfTokens)}</Text>
                                    <Button onClick={() => {selectBid({args:[BigInt(params.id),BigInt(bid.id)]})}}>Select Bid</Button>
                                </Box>
                            ))}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box>
                            <Text>Executed Proposals - {executedProposals?.length}</Text>
                            {executedBids?.map((bid: any) => (
                                <Box key={bid.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
                                    <Text fontSize="xl" fontWeight="semibold">Proposal ID: {Number(bid.id)}</Text>
                                    <Text>bidAmount: {Number(bid.bidAmount)}</Text>
                                    <Text>numberOfTokens: {Number(bid.numberOfTokens)}</Text>
                                   
                                </Box>
                            ))}
                        </Box>
                    </TabPanel>

                </TabPanels>
            </Tabs>

        </Box>
    );
};

export default PropertyDetails;
