import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  ScriptableContext,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const PriceHistory = ({ tokenId }) => {
  const { data: priceHistory } = useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "getPriceHistory",
    args: [BigInt(tokenId)],
    watch: false,
  });

  // Function to convert timestamp to date and time label
  const formatDateTimeLabel = timestamp => {
    const date = new Date(Number(timestamp) * 1000); // Convert to milliseconds
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // Function to convert price from Wei to Ether
  const convertWeiToEther = wei => {
    return wei / 10 ** 18; // 1 Ether = 10^18 Wei
  };

  // Extract timestamps and prices from price history
  const labels = priceHistory?.map(entry => formatDateTimeLabel(entry.timestamp));
  const pricesInWei = priceHistory?.map(entry => Number(entry.price));
  const pricesInEther = pricesInWei?.map(convertWeiToEther);

  const data = () => {
    return {
      labels: labels,
      datasets: [
        {
          backgroundColor: context => {
            if (!context.chart.chartArea) {
              return;
            }
            const {
              ctx,
              data,
              chartArea: { top, bottom },
            } = context.chart;
            const gradient = ctx.createLinearGradient(0, top, 0, bottom);
            gradient.addColorStop(0, "rgba(250,174,50,1)");
            gradient.addColorStop(1, "rgba(250,174,50,0)");
            return gradient;
          },
          borderColor: "#ff6c23",
          borderWidth: 2,
          pointColor: "#fff",
          pointStrokeColor: "#ff6c23",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#ff6c23",
          fill: "start",
          data: pricesInEther,
          tension: 0.4, // Adjust the curve tension here
        },
      ],
    };
  };

  var options = {
    responsive: true,
    datasetStrokeWidth: 3,
    pointDotStrokeWidth: 4,
    legend: false, // Remove legend,
  };

  return (
    <div className="w-[100%] ">
      <Line data={data()} options={options} />
    </div>
  );
};

export default PriceHistory;
