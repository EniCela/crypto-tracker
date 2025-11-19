import React from "react";
import { Box } from "@mui/material";
import CryptoCard from "./CryptoCard";

interface CryptoItem {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change: number;
}

interface CryptoListProps {
  coins: CryptoItem[];
}

const CryptoList: React.FC<CryptoListProps> = ({ coins }) => {
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
            id={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            logo={coin.logo}
            price={coin.price}
            change={coin.change}
            onClick={() => console.log("Clicked", coin.name)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CryptoList;
