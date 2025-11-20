import React, { useState } from "react";
import { Box } from "@mui/material";
import CryptoCard from "./CryptoCard";
import CryptoModal from "./modal/CryptoModal";
import { Coin } from "../types/CoinType";

interface CryptoAPIItem {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h?: number;
}

interface CryptoListProps {
  coins: CryptoAPIItem[];
  portfolio?: boolean;
}

const mapToCoin = (coin: CryptoAPIItem): Coin => ({
  id: coin.id,
  symbol: coin.symbol,
  name: coin.name,
  image: coin.image,
  current_price: coin.current_price,
  market_cap: 0,
  market_cap_rank: 0,
  fully_diluted_valuation: null,
  total_volume: 0,
  high_24h: 0,
  low_24h: 0,
  price_change_24h: 0,
  price_change_percentage_24h: coin.price_change_percentage_24h || 0,
  market_cap_change_24h: 0,
  market_cap_change_percentage_24h: 0,
  circulating_supply: 0,
  total_supply: null,
  max_supply: null,
  ath: 0,
  ath_change_percentage: 0,
  ath_date: "",
  atl: 0,
  atl_change_percentage: 0,
  atl_date: "",
  roi: null,
  last_updated: new Date().toISOString(),
});

const CryptoList: React.FC<CryptoListProps> = ({
  coins,
  portfolio = false,
}) => {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (coin: CryptoAPIItem) => {
    setSelectedCoin(mapToCoin(coin));
    setModalOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
        m: 2,
      }}
    >
      {coins.map((coin) => (
        <Box
          key={coin.id}
          sx={{
            width: { xs: "100%", sm: "48%", md: "31%" },
            maxWidth: "100%",
            flexShrink: 0,
          }}
        >
          <CryptoCard
            {...coin}
            id={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            logo={coin.image}
            price={coin.current_price}
            change={coin.price_change_percentage_24h || 0}
            portfolio={portfolio}
            onClick={() => handleCardClick(coin)}
          />
        </Box>
      ))}

      {/* Modal */}
      <CryptoModal
        coin={selectedCoin}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
};

export default CryptoList;
