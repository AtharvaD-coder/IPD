import React, { useEffect, useRef, useState } from "react";
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
import { letterSpacing } from "@mui/system";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const PriceHistory = ({ tokenId }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const chartRef = useRef(null);
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
    return (wei / 10 ** 18); // 1 Ether = 10^18 Wei
  };

  // Extract timestamps and prices from price historylet label
  
  

  const pricesInWei = priceHistory?.map(entry => Number(entry.price));
  let  pricesInEther = [0];
  if(pricesInWei){
    pricesInEther.push(...pricesInWei.map(convertWeiToEther));
   
  }

  useEffect(()=>{
    const chart = chartRef.current;
    if (chart) {
      let labels = ['start'];

  if (priceHistory) {
      labels.push(...priceHistory.map(entry => formatDateTimeLabel(entry.timestamp)));
  }
      const data =  {
        labels: labels,
        datasets: [
          {
            backgroundColor: context => {
              if (!context.chart.chartArea) {
                return;
              }
              const {
                ctx,
                chartArea: { top, bottom },
              } = context.chart;
              const gradient = ctx.createLinearGradient(0, top, 0, bottom);
              gradient.addColorStop(0, "rgba(250,174,50,1)");
              // gradient.addColorStop(0.2, "rgba(250,174,50,0.8)");
              // gradient.addColorStop(0.4, "rgba(250,174,50,0.6)");
              // gradient.addColorStop(0.6, "rgba(250,174,50,0.4)");
              // gradient.addColorStop(0.8, "rgba(250,174,50,0.2)");
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
            
           
          },
        ],
      };

      console.log(data, "datasaaaa")
      setChartData(data)
    }

  },[priceHistory])

  
  

  var options = {
    responsive: true,
    datasetStrokeWidth: 3,
    pointDotStrokeWidth: 4,
    plugins: {
      legend: {
          display: false
      },
    },
    elements: {
      line: {
          tension: 0.4
      }
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Price of 1 Token'
      }
    },
    x:{
      title:{
        display: true,
        text: 'Time'
      }
    }
  }
  
    
  };

  return (
    
      <Line ref={chartRef} height={'200px'} width={'400px'} data={chartData} options={options} />
  
  );
};

export default PriceHistory;
