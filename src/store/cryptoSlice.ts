// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface Coin {
//   id: string;
//   symbol: string;
//   name: string;
//   image: string;
//   current_price: number;
//   market_cap?: number;
//   market_cap_rank?: number;
//   total_volume?: number;
//   price_change_percentage_24h?: number;
// }

// interface CryptoState {
//   coins: Coin[];
// }

// const initialState: CryptoState = {
//   coins: [],
// };

// const cryptoSlice = createSlice({
//   name: "crypto",
//   initialState,
//   reducers: {
//     setCoins: (state:any, action: PayloadAction<Coin[]>) => {
//       state.coins = action.payload;
//     },
//   },
// });

// export const { setCoins } = cryptoSlice.actions;
// export default cryptoSlice.reducer;






import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}

interface CryptoState {
  coins: Coin[];
  portfolio: Coin[];   // ➕ portofolio global
}

const initialState: CryptoState = {
  coins: [],
  portfolio: [],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<Coin[]>) => {
      state.coins = action.payload;
    },

    // ➕ Shto coin në portofolio
    addToPortfolio: (state, action: PayloadAction<Coin>) => {
      const exists = state.portfolio.some(
        (c) => c.id === action.payload.id
      );

      if (!exists) {
        state.portfolio.push(action.payload);
      }
    },
       removeFromPortfolio: (state, action: PayloadAction<string>) => {
      state.portfolio = state.portfolio.filter(c => c.id !== action.payload);
    }
  },
});

export const { setCoins, addToPortfolio,removeFromPortfolio } = cryptoSlice.actions;
export default cryptoSlice.reducer;
