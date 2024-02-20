import React, { useEffect, useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { convertWeiToEther } from "~~/utils/utils";
import { CardBox } from "~~/components/custom_components/cardComponent";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
const colors = [
  ["rgba(255, 99, 132, 0.7)", "rgba(255, 99, 132, 0)", "rgba(255, 99, 132, 1)"], // Red
  ["rgba(54, 162, 235, 0.7)", "rgba(54, 162, 235, 0)", "rgba(54, 162, 235, 1)"], // Blue
  ["rgba(255, 206, 86, 0.7)", "rgba(255, 206, 86, 0)", "rgba(255, 206, 86, 1)"], // Yellow
  ["rgba(75, 192, 192, 0.7)", "rgba(75, 192, 192, 0)", "rgba(75, 192, 192, 1)"], // Green
  ["rgba(153, 102, 255, 0.7)", "rgba(153, 102, 255, 0)", "rgba(153, 102, 255, 1)"], // Purple
  ["rgba(255, 159, 64, 0.7)", "rgba(255, 159, 64, 0)", "rgba(255, 159, 64, 1)"], // Orange
  ["rgba(255, 99, 132, 0.7)", "rgba(255, 99, 132, 0)", "rgba(255, 99, 132, 1)"], // Red (Duplicate for variation)
  ["rgba(54, 162, 235, 0.7)", "rgba(54, 162, 235, 0)", "rgba(54, 162, 235, 1)"], // Blue (Duplicate for variation)
  ["rgba(255, 206, 86, 0.7)", "rgba(255, 206, 86, 0)", "rgba(255, 206, 86, 1)"], // Yellow (Duplicate for variation)
  ["rgba(75, 192, 192, 0.7)", "rgba(75, 192, 192, 0)", "rgba(75, 192, 192, 1)"], // Green (Duplicate for variation)
];

const PriceHistory = ({ tokenIds }) => {
  // State to hold combined price history
  const [chartData, setChartData] = useState({ datasets: [], labels: [] });

  const { data: priceHistories } = useScaffoldContractRead({
    contractName: "RealEstateERC1155",
    functionName: "getPriceHistoriesForTokens",
    args: [tokenIds],
    watch: true,
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

  useEffect(() => {
    if (!priceHistories) return;

    const datasets = priceHistories.map((priceHistory, index) => ({
      label: `Token ${tokenIds[index]}`,
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
        gradient.addColorStop(0, colors[index % colors.length][0]);
        gradient.addColorStop(1, colors[index % colors.length][1]);
        return gradient;
      },
      borderColor: colors[index % colors.length][2],
      borderWidth: 2,
      pointColor: "#fff",
      pointStrokeColor: colors[index % colors.length][2],
      pointHighlightFill: "#fff",
      pointHighlightStroke: colors[index % colors.length][2],
      fill: "start",
      data: priceHistory.map(entry => ({
        x: formatDateTimeLabel(entry.timestamp),
        y: convertWeiToEther(entry.price),
      })),
      tension: 0.4, // Adjust the curve tension here
    }));

    const labels = priceHistories
      .flatMap(priceHistory => priceHistory.map(entry => formatDateTimeLabel(entry.timestamp)))
      .sort((a, b) => new Date(a) - new Date(b));

    setChartData({ datasets, labels });
  }, [priceHistories, tokenIds]);

  const options = {
    responsive: true,
    datasetStrokeWidth: 3,
    pointDotStrokeWidth: 4,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
        beginAtZero: true, // Start x-axis at zero
      },
      y: {
        beginAtZero: true, // Start y-axis at zero
        title: {
          display: true,
          text: "Price (Ether)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <CardBox>
    <h1 className="text-3xl font-bold">Price History</h1>

      <Line data={chartData} options={options} />
    </CardBox>
  );
};

export default PriceHistory;
