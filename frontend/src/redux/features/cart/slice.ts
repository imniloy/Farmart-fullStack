import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  isCartSliderOpen: boolean;
};

const initialState: InitialState = {
  isCartSliderOpen: true,
};

const cartSliderSlice = createSlice({
  name: "cartSlider" as string,
  initialState,
  reducers: {
    setIsCartSliderOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartSliderOpen = action.payload;
    },
  },
});

export default cartSliderSlice.reducer;
export const { setIsCartSliderOpen } = cartSliderSlice.actions;
