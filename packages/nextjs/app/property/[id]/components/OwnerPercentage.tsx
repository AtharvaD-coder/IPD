import { Box, Text } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS } from "chart.js";
import { Pie } from "react-chartjs-2";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { CardBox } from "~~/components/custom_components/cardComponent";

ChartJS.register(ArcElement);

export default function OwnerShip({ id }) {
  const { data: ownersAndPercentages } = useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "getOwnersAndPercentage",
    args: [id ?? 0],
    watch: true,
  });

  // Extract owners and percentages from ownersAndPercentages data
  const owners: Owner[] = ownersAndPercentages?.[0] ?? [];
  const percentages: Percentage[] = ownersAndPercentages?.[1] ?? [];

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
    <CardBox
      className='w-[100%] '
    >
      <h1 className="text-3xl font-bold">Ownership Percentage</h1>
      <div className="w-[310px] m-3 ">
        <Box mt={8}>

          <Pie data={pieChartData} />
        </Box>
      </div>
    </CardBox>
  );
}
