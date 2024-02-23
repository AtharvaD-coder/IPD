import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { formatEther } from "viem";
import { CardBox } from "~~/components/custom_components/cardComponent";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";




export default function Bids({ id }: any) {
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
                // <Box className="bg-secondary" key={bid.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
                //   <Text fontSize="xl" fontWeight="semibold">
                //     Proposal ID: {Number(bid.id)}
                //   </Text>
                //   <Text>bidAmount: {Number(bid.bidAmount)}</Text>
                //   <Text>numberOfTokens: {Number(bid.numberOfTokens)}</Text>
                //   <Button
                //     onClick={() => {
                //       selectBid({ args: [BigInt(id), BigInt(bid.id)] });
                //     }}
                //   >
                //     Select Bid
                //   </Button>
                // </Box>

                <div className="bg-secondary flex flex-col    w-[100%] rounded-2xl  ">
                  <div className="w-[100%] flex justify-between ">
                    <div className=" p-5 m-3 rounded-lg flex flex-col items-center ">
                      <div className="text-white text-2xl font-bold">
                        Proposal ID
                      </div>
                      <div className="text-white text-2xl font-bold"  >
                        {Number(bid.id)}
                      </div>

                    </div>
                    <div className="p-5 m-3 items-center flex flex-col ">
                      <div className="text-white text-2xl font-bold" ><span className="text-lg  opacity-70">Bid Amount</span> : {Number(formatEther(bid.bidAmount))}</div>
                      <div className="text-white text-2xl font-bold"><span className="text-lg  opacity-70">Number of tokens </span>: {Number(bid.numberOfTokens)}</div>

                    </div>
                  </div>

                  <div className="flex self-end items-center m-3 mr-6">
                    <Button
                      onClick={() => {
                        selectBid({ args: [BigInt(id), BigInt(bid.id)] });
                      }}

                    >
                      Select Bid
                    </Button>
                  </div>

                </div>
              ))}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
              <Text>Executed Bids - {executedBids?.length}</Text>
              {executedBids?.map((bid: any) => (
                <div className="bg-secondary flex flex-col    w-[100%] rounded-2xl  ">
                  <div className="w-[100%] flex justify-between ">
                    <div className=" p-5 m-3 rounded-lg flex flex-col items-center ">
                      <div className="text-white text-2xl font-bold">
                        Proposal ID
                      </div>
                      <div className="text-white text-2xl font-bold"  >
                        {Number(bid.id)}
                      </div>

                    </div>
                    <div className="p-5 m-3 items-center flex flex-col ">
                      <div className="text-white text-2xl font-bold" ><span className="text-lg  opacity-70">Bid Amount</span> : {Number(formatEther(bid.bidAmount))}</div>
                      <div className="text-white text-2xl font-bold"><span className="text-lg  opacity-70">Number of tokens </span>: {Number(bid.numberOfTokens)}</div>

                    </div>
                  </div>



                </div>
              ))}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CardBox>
  )
}