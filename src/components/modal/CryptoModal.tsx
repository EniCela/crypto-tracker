// CryptoModal is a modal dialog component that displays detailed information for a selected coin.

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { Coin } from "../../types/CoinType";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

interface CryptoModalProps {
  coin: Coin | null;
  open: boolean;
  onClose: () => void;
}

const CryptoModal: React.FC<CryptoModalProps> = ({ coin, open, onClose }) => {
  if (!coin) return null;

  const previousPrice = coin.current_price / (1 + coin.price_change_percentage_24h / 100);

  const priceData = [
    previousPrice,
    previousPrice + (coin.current_price - previousPrice) * 0.25,
    previousPrice + (coin.current_price - previousPrice) * 0.5,
    previousPrice + (coin.current_price - previousPrice) * 0.75,
    coin.current_price,
  ];

  const labels = ["24h Ago", "", "", "", "Now"];

  const borderColor = coin.price_change_percentage_24h >= 0 ? "#4caf50" : "#f44336";

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: priceData,
        borderColor: borderColor,
        backgroundColor: "rgba(0,0,0,0)", 
        tension: 0.4, 
        pointRadius: 3,
        pointBackgroundColor: borderColor,
        pointHoverRadius: 5,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            return `$${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md"  fullWidth >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={coin.image} alt={coin.name} />
          <Typography variant="h6">
            {coin.name} ({coin.symbol.toUpperCase()})
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Current Price: ${coin.current_price.toLocaleString()}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          color={coin.price_change_percentage_24h >= 0 ? "success.main" : "error.main"}
        >
          24h Change: {coin.price_change_percentage_24h >= 0 ? "+" : ""}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </Typography>
        <Box sx={{ mt: 2, mb: 2, height: 120 }}>
          <Line data={data} options={options} />
        </Box>
        <Typography variant="body2" gutterBottom>
          Market Cap: ${coin.market_cap.toLocaleString()}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Total Volume: ${coin.total_volume.toLocaleString()}
        </Typography>
        <Typography variant="body2" gutterBottom>
          High 24h: ${coin.high_24h.toLocaleString()}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Low 24h: ${coin.low_24h.toLocaleString()}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CryptoModal;
