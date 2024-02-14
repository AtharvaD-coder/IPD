import { Box, Text } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS } from "chart.js";
import { Pie } from "react-chartjs-2";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

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
    <div className="w-[300px] m-3 ">
      <Box mt={8}>
        <Text>Ownership Percentage</Text>
        <Pie data={pieChartData} />
      </Box>
    </div>
  );
}
