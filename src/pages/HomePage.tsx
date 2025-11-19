import React, { useEffect, useState } from "react";
import Header from "../components/HeaderPage";
import CryptoChart from "../components/CryptoChart";
import CryptoList from "../components/CryptoList";
import ChartFilter from "../components/ChartFilter";
import CryptoImage from "../assets/cryptoimg.jpg";
import { Box } from "@mui/material";
import { getApi } from "../services/getApi";
import { useDispatch, useSelector } from "react-redux";
import { setCoins } from "../store/cryptoSlice";
import { AppDispatch, RootState } from "../store";
import { CoinGeckoCoin } from "../types/CoinType";

const HomePage: React.FC = () => {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const prices = [33000, 34000, 33500, 36000, 37000];
  const [selectedFilter, setSelectedFilter] = useState("1D");
  const [coinsData, setCoinsData] = useState<CoinGeckoCoin[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  // const coins = useSelector((state: RootState) => state.crypto.coins);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await getApi(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        console.log("CoinGecko Response:", response);
        setCoinsData(response);
        dispatch(setCoins(response));
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    fetchCryptoData();
  }, [dispatch]);

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    console.log("Filter:", value);
  };

  // const demoCoins = [
  //   {
  //     id: "bitcoin",
  //     name: "Bitcoin",
  //     symbol: "BTC",
  //     logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  //     price: 29750.23,
  //     change: 2.15,
  //   },
  //   {
  //     id: "ethereum",
  //     name: "Ethereum",
  //     symbol: "ETH",
  //     logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  //     price: 1870.56,
  //     change: -1.25,
  //   },
  //   {
  //     id: "cardano",
  //     name: "Cardano",
  //     symbol: "ADA",
  //     logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  //     price: 0.35,
  //     change: 0.87,
  //   },
  //   {
  //     id: "cardano1",
  //     name: "Cardano",
  //     symbol: "ADA",
  //     logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  //     price: 0.35,
  //     change: 0.87,
  //   },
  //   {
  //     id: "cardano2",
  //     name: "Cardano",
  //     symbol: "ADA",
  //     logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  //     price: 0.35,
  //     change: 0.87,
  //   },
  //   {
  //     id: "cardano3",
  //     name: "Cardano",
  //     symbol: "ADA",
  //     logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  //     price: 0.35,
  //     change: 0.87,
  //   },
  //   {
  //     id: "cardano4",
  //     name: "Cardano",
  //     symbol: "ADA",
  //     logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  //     price: 0.35,
  //     change: 0.87,
  //   },
  //   {
  //     id: "cardano5",
  //     name: "Cardano",
  //     symbol: "ADA",
  //     logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  //     price: 0.35,
  //     change: 0.87,
  //   },
  // ];

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
            mt: -3,
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
        <CryptoList coins={coinsData} portfolio={true} />
      </div>
    </div>
  );
};
export default HomePage;
