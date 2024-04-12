import { Box, Text } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useAccount } from "wagmi";
import { CardBox } from "~~/components/custom_components/cardComponent";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { convertWeiToEther } from "~~/utils/utils";

ChartJS.register([ArcElement, Tooltip, Legend]);

export default function Networth({ realEstates }) {
  const { address } = useAccount();

  // Function to calculate the total amount of tokens
  const getTotalAmount = realEstates => {
    return realEstates?.reduce((total, estate) => Number(total) + convertWeiToEther(Number(estate.amount)), 0);
  };

  // Prepare data for the pie chart
  const pieChartData = {
    labels: realEstates?.map(estate => `Token ID ${Number(estate.tokenId)}`) || [],
    datasets: [
      {
        data: realEstates?.map(estate => convertWeiToEther(Number(estate.amount))) || [],
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

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;

            return [
              ` Token ID : ${realEstates[index].tokenId}`,
              `Amount : ${convertWeiToEther(realEstates[index].amount)}`,
              `Number of Tokens : ${realEstates[index].numberOfTokens}`,
            ];
          },
        },
      },
    },
  };

  return (
    <CardBox>
      <div className="w-[100%]   flex items-center  ">
        <div className="mt-8">
          <h1 className="text-3xl font-bold">Percentage breakdown</h1>
          <Pie data={pieChartData} options={options} />
        </div>
        <div>
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                {/* <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path> */}
              </svg>
            </div>
            <div className="stat-title">Total Networth</div>
            <div className="stat-value text-primary">{getTotalAmount(realEstates)} eth</div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>
        </div>
      </div>
    </CardBox>
  );
}
