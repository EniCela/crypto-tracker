// import React from "react";
// import { Box } from "@mui/material";
// import CryptoCard from "./CryptoCard";

// interface CryptoItem {
//   id: string;
//   name: string;
//   symbol: string;
//   logo: string;
//   price: number;
//   change: number;
// }

// interface CryptoListProps {
//   coins: CryptoItem[];
//   portfolio?: boolean;
// }

// const CryptoList: React.FC<CryptoListProps> = ({
//   coins,
//   portfolio = false,
// }) => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexWrap: "wrap",
//         gap: 2,
//         justifyContent: "center",
//         m: 2,
//       }}
//     >
//       {coins.map((coin) => (
//         <Box
//           key={coin.id}
//           sx={{
//             width: { xs: "100%", sm: "48%", md: "31%" },
//             maxWidth: "100%",
//             flexShrink: 0,
//           }}
//         >
//           <CryptoCard
//             id={coin.id}
//             name={coin.name}
//             symbol={coin.symbol}
//             logo={coin.logo}
//             price={coin.price}
//             change={coin.change}
//             portfolio={portfolio}
//             onClick={() => console.log("Clicked", coin.name)}
//           />
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default CryptoList;










import React from "react";
import { Box } from "@mui/material";
import CryptoCard from "./CryptoCard";

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

const CryptoList: React.FC<CryptoListProps> = ({ coins, portfolio = false }) => {
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
            logo={coin.image} // <-- nga API
            price={coin.current_price} // <-- nga API
            change={coin.price_change_percentage_24h || 0} // <-- nga API
            portfolio={portfolio}
            onClick={() => console.log("Clicked", coin.name)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CryptoList;
