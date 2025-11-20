/**
 * PortofolioPage displays the user's crypto portfolio overview.
 * It calculates the total portfolio value, generates chart data based on selected time filter,
 * and renders the portfolio coins in a list. Users can filter their portfolio with timeframes
 * like "1D" or view all coins. The chart dynamically updates when portfolio data or filter changes.
 */

import React, { useEffect, useState } from "react";
import Header from "../components/header/HeaderPage";
import CryptoChart from "../components/CryptoChart";
import CryptoList from "../components/CryptoList";
import ChartFilter from "../components/ChartFilter";
import CryptoImage from "../assets/cryptoimg.jpg";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Coin } from "../types/CoinType";

const PortofolioPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("1D");
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);

  const portfolioCoins = useSelector(
    (state: RootState) => state.crypto.portfolio
  );

  // Total portfolio value
  const totalPortfolioValue = portfolioCoins.reduce(
    (sum, coin) => sum + (coin.current_price || 0),
    0
  );

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  // generate  chart data
  const generatePortfolioChartData = (coins: Coin[], filter: string) => {
    if (!coins || coins.length === 0) return { labels: ["Now"], data: [0] };

    if (filter === "1D") {
      const labels = ["0h", "6h", "12h", "18h", "24h"];
      const data = labels.map((_, i) =>
        coins.reduce((sum, coin) => {
          const changePct = coin.price_change_percentage_24h || 0;
          const factor = i / (labels.length - 1);
          const price = coin.current_price || 0;
          return sum + price * (1 + (changePct / 100) * factor);
        }, 0)
      );
      return { labels, data };
    }
    const labels = ["Total"];
    const data = [
      coins.reduce((sum, coin) => sum + (coin.current_price || 0), 0),
    ];
    return { labels, data };
  };

  useEffect(() => {
    const { labels, data } = generatePortfolioChartData(
      portfolioCoins,
      selectedFilter
    );
    setChartLabels(labels);
    setChartData(data);
  }, [portfolioCoins, selectedFilter]);

  // Filter for CryptoList
  const filterCoins = (coins: Coin[], selected: string) => {
    switch (selected) {
      case "1D":
        return coins.filter(
          (c) =>
            c.price_change_percentage_24h !== undefined &&
            c.price_change_percentage_24h !== null
        );
      case "All":
        return coins;
      default:
        return coins;
    }
  };

  return (
    <div>
      <Header
        title="Overview of Situation"
        count={totalPortfolioValue.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      />
      <Box
        sx={{
          display: { xs: "block", md: "grid" },
          gridTemplateColumns: { md: "1fr 1fr" },
          gap: "20px",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            mx: 2,
            justifyContent: "center",
            alignItems: "center",
            flex: { xs: 1 },
          }}
        >
          <CryptoChart labels={chartLabels} dataPoints={chartData} />
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            mt: -5,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={CryptoImage}
            alt="Chart illustration"
            style={{ width: "40%", borderRadius: "12px" }}
          />
        </Box>
      </Box>
      <div>
        <ChartFilter selected={selectedFilter} onChange={handleFilterChange} />
        {filterCoins(portfolioCoins, selectedFilter).length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              mt: 3,
              fontSize: "18px",
              fontWeight: 500,
              opacity: 0.7,
            }}
          >
            There are no coins at the moment. Your portfolio is currently empty.
          </Box>
        ) : (
          <CryptoList
            coins={filterCoins(portfolioCoins, selectedFilter)}
            portfolio={true}
          />
        )}
      </div>
    </div>
  );
};

export default PortofolioPage;
