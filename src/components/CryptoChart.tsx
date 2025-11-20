import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface CryptoChartProps {
  labels: string[];
  dataPoints: number[];
}

const CryptoChart: React.FC<CryptoChartProps> = ({ labels, dataPoints }) => {
  const sanitizedData = dataPoints?.map(d => (typeof d === "number" ? d : 0)) || [0];
  const sanitizedLabels = labels?.length ? labels : [""];

  const data = {
    labels: sanitizedLabels,
    datasets: [
      {
        label: "Portfolio Value",
        data: sanitizedData,
        borderColor: "#4facfe", 
        borderWidth: 2,
        pointRadius: 4,    
        pointBackgroundColor: "#4facfe",
        fill: false,       
        tension: 0.3,        
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: true, 
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          display: false, 
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false, 
        },
        ticks: {
          display: false, 
        },
        border: {
          display: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default CryptoChart;
