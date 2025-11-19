import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  ChartData,
} from "chart.js";
import { Box } from "@mui/material";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

interface CryptoChartProps {
  labels: string[];
  dataPoints: number[];
}

const CryptoChart: React.FC<CryptoChartProps> = ({ labels, dataPoints }) => {
  const firstValue = dataPoints[0];
  const lastValue = dataPoints[dataPoints.length - 1];

  const chartData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "",
        data: dataPoints,
        borderColor: "#1976d2", // blu
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
      },
      y: {
        display: false,
        grid: { display: false },
      },
    },
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
      }}
    >

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1, 
          fontSize: 12,
          color: "#555",
        }}
      >
        <span>{firstValue.toFixed(2)} USD</span>
        <span>{lastValue.toFixed(2)} USD</span>
      </Box>

      {/* Grafiku */}
      <Box sx={{ height: 300 }}>
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default CryptoChart;
