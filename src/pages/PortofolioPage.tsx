import React from "react";
import Header from "../components/HeaderPage";
import CryptoList from "../components/CryptoList";

const HomePage: React.FC = () => {
  const demoCoins = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      price: 29750.23,
      change: 2.15,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      price: 1870.56,
      change: -1.25,
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
      price: 0.35,
      change: 0.87,
    },
    {
      id: "cardano1",
      name: "Cardano",
      symbol: "ADA",
      logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
      price: 0.35,
      change: 0.87,
    },
    {
      id: "cardano2",
      name: "Cardano",
      symbol: "ADA",
      logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
      price: 0.35,
      change: 0.87,
    },
    {
      id: "cardano3",
      name: "Cardano",
      symbol: "ADA",
      logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
      price: 0.35,
      change: 0.87,
    },
    {
      id: "cardano4",
      name: "Cardano",
      symbol: "ADA",
      logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
      price: 0.35,
      change: 0.87,
    },
      {
      id: "cardano5",
      name: "Cardano",
      symbol: "ADA",
      logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
      price: 0.35,
      change: 0.87,
    },
  ];

  return (
    <div>
      <Header title="OverView of Situation" count={"152 345 2345 "} />
      <div>
        <CryptoList coins={demoCoins} />
      </div>
    </div>
  );
};
export default HomePage;
