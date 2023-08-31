import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isOpen: boolean;
};

const initialState = {
  isOpen: false,
} as InitialState;

const MobileCategorySliderSlice = createSlice({
  name: "mobileCategorySlider",
  initialState,
});
