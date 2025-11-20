import React, { useEffect, useState } from "react";
import Header from "../components/HeaderPage";
import CryptoChart from "../components/CryptoChart";
import CryptoList from "../components/CryptoList";
import ChartFilter from "../components/ChartFilter";
import CryptoImage from "../assets/cryptoimg.jpg";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Coin } from "../types/CoinType";

const HomePage: React.FC = () => {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const prices = [33000, 34000, 33500, 36000, 37000];
  const [selectedFilter, setSelectedFilter] = useState("All");

  const portfolioCoins = useSelector(
    (state: RootState) => state.crypto.portfolio
  );

  useEffect(() => {
    console.log("Portfolio Coins:", portfolioCoins);
  }, [portfolioCoins]);

  const filterCoins = (coins: Coin[], selected: string) => {
    switch (selected) {
      case "1D":
        return coins.filter(
          (c) =>
            c.price_change_percentage_24h !== undefined &&
            c.price_change_percentage_24h > 0
        );
      case "All":
        return coins;
      default:
        return coins;
    }
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    console.log("Filter:", value);
  };

  return (
    <div>
      <Header title="OverView of Situation" count={"152 345 2345 "} />
      {/* <div style={{ margin: "30px" }}>
        <CryptoChart labels={labels} dataPoints={prices} />
      </div> */}
      <Box
        sx={{
          display: {
            xs: "block",
            md: "grid",
          },
          gridTemplateColumns: {
            md: "1fr 1fr",
          },
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
          <CryptoChart labels={labels} dataPoints={prices} />
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
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
        <CryptoList
          coins={filterCoins(portfolioCoins, selectedFilter)}
          portfolio={true}
        />
      </div>
    </div>
  );
};
export default HomePage;
