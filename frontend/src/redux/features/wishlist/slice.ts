import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, ProductQuantity } from "./types";

type InitialState = {
  isCartSliderOpen: boolean;
  cartProducts: CartProduct[];
};

const initialState: InitialState = {
  isCartSliderOpen: false,
  cartProducts: [],
};

const cartSliderSlice = createSlice({
  name: "cart" as string,
  initialState,
  reducers: {},
});

export default cartSliderSlice.reducer;
export const {} = cartSliderSlice.actions;
