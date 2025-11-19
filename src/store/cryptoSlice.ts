import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap?: number;
  market_cap_rank?: number;
  total_volume?: number;
  price_change_percentage_24h?: number;
}

interface CryptoState {
  coins: Coin[];
}

const initialState: CryptoState = {
  coins: [],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCoins: (state:any, action: PayloadAction<Coin[]>) => {
      state.coins = action.payload;
    },
  },
});

export const { setCoins } = cryptoSlice.actions;
export default cryptoSlice.reducer;
