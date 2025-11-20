import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coin } from "../types/CoinType";

interface CryptoState {
  coins: Coin[];
  portfolio: Coin[];
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

    addToPortfolio: (state, action: PayloadAction<Coin>) => {
      const exists = state.portfolio.some((c) => c.id === action.payload.id);

      if (!exists) {
        state.portfolio.push(action.payload);
      }
    },
    removeFromPortfolio: (state, action: PayloadAction<string>) => {
      state.portfolio = state.portfolio.filter((c) => c.id !== action.payload);
    },
  },
});

export const { setCoins, addToPortfolio, removeFromPortfolio } =
  cryptoSlice.actions;
export default cryptoSlice.reducer;
