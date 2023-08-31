import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  isOpen: boolean;
};

const initialState = {
  isOpen: false,
} as InitialState;

const mobileCategorySliderSlice = createSlice({
  name: "mobileCategorySlider" as string,
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export default mobileCategorySliderSlice.reducer;
export const { setIsOpen } = mobileCategorySliderSlice.actions;
