import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { CardBox } from "~~/components/custom_components/cardComponent";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";




export default function Bids({id}:any){
    const { data: bids } = useScaffoldContractRead({
        contractName: "RealEstateERC1155",
        functionName: "getBids",
        args: [id ?? 0],
        watch: true,
      });
      const { writeAsync: selectBid } = useScaffoldContractWrite({
        contractName: "RealEstateERC1155",
        functionName: "selectBid",
        args: [BigInt(0), BigInt(0)],
      });
    
      const activeBids = bids?.filter((bid: any) => bid.status === 0);
      const executedBids = bids?.filter((bid: any) => bid.status === 1);
    return (
        <CardBox>
            <h1 className="text-3xl font-bold mb-5">Bids</h1>
      <Tabs mt={10}>
        <TabList>
          <Tab>Active Bids</Tab>
          <Tab>Executed Bids</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box>
              <Text>Active Bids - {activeBids?.length}</Text>
              {activeBids?.map((bid: any) => (
                <Box key={bid.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
                  <Text fontSize="xl" fontWeight="semibold">
                    Proposal ID: {Number(bid.id)}
                  </Text>
                  <Text>bidAmount: {Number(bid.bidAmount)}</Text>
                  <Text>numberOfTokens: {Number(bid.numberOfTokens)}</Text>
                  <Button
                    onClick={() => {
                      selectBid({ args: [BigInt(id), BigInt(bid.id)] });
                    }}
                  >
                    Select Bid
                  </Button>
                </Box>
              ))}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
              <Text>Executed Bids - {executedBids?.length}</Text>
              {executedBids?.map((bid: any) => (
                <Box key={bid.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
                  <Text fontSize="xl" fontWeight="semibold">
                    Proposal ID: {Number(bid.id)}
                  </Text>
                  <Text>bidAmount: {Number(bid.bidAmount)}</Text>
                  <Text>numberOfTokens: {Number(bid.numberOfTokens)}</Text>
                </Box>
              ))}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </CardBox>
    )
}