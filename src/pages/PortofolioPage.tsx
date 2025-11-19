import React, { useEffect, useState } from "react";
import Header from "../components/HeaderPage";
import CryptoList from "../components/CryptoList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getApi } from "../services/getApi";
import { setCoins } from "../store/cryptoSlice";
import { CoinGeckoCoin } from "../types/CoinType";

const PortofolioPage: React.FC = () => {
  // const [selectedFilter, setSelectedFilter] = useState("1D");
  const [coinsData, setCoinsData] = useState<CoinGeckoCoin[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  // const coins = useSelector((state: RootState) => state.crypto.coins);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await getApi(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1"
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
      <div>
        <CryptoList coins={coinsData} portfolio={false} />
      </div>
    </div>
  );
};
export default PortofolioPage;
