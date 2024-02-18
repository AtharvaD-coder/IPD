import { Box, Flex, Text } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";
import { CardBox } from "~~/components/custom_components/cardComponent";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";



export default function Ownership({ id, realEstateArray }: any) {
    const { data: ownersAndPercentages } = useScaffoldContractRead({
        contractName: "RealEstateERC1155",
        functionName: "getOwnersAndPercentage",
        args: [id ?? 0],
        watch: true,
    });

    const noOfTokens = (realEstateArray as bigint[] | undefined)?.[0];
    const priceOf1Token = (realEstateArray as bigint[] | undefined)?.[1];
    const tokenId = (realEstateArray as bigint[] | undefined)?.[2];
    const status = (realEstateArray as bigint[] | undefined)?.[3];
    const rentInfo = (realEstateArray as bigint[] | undefined)?.[5];
    const realEstateBalance = (realEstateArray as bigint[] | undefined)?.[6];
    // Extract owners and percentages from ownersAndPercentages data
    const owners: string[] = (ownersAndPercentages?.[0] as unknown as string[]) ?? [];
    const percentages: string[] = (ownersAndPercentages?.[1] as unknown as string[]) ?? [];
    console.log(owners, "owners", percentages, "percentages");

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
                    "#673AB7",
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
                    "#673AB7",
                ],
            },
        ],
    };
    return (
        <CardBox>
            <h1 className="text-3xl font-bold mb-5">Proposals</h1>




            <Pie data={pieChartData} />

        </CardBox>
    )
}