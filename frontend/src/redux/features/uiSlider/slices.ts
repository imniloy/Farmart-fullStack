import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  isCategoryOpen: boolean;
  isAuthMadalOpen: boolean;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
};

const initialState = {
  isCategoryOpen: false,
  isAuthMadalOpen: false,
  isLoginOpen: false,
  isRegisterOpen: false,
} as InitialState;

const mobileSliderSlice = createSlice({
  name: "mobileSlider" as string,
  initialState,
  reducers: {
    setIsCategoryOpen: (state, action: PayloadAction<boolean>) => {
      state.isCategoryOpen = action.payload;
    },

    setAuthMadalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAuthMadalOpen = action.payload;
      state.isLoginOpen = action.payload;
    },

    setIsLoginOpen: (state, action: PayloadAction<boolean>) => {
      state.isLoginOpen = action.payload;
      state.isRegisterOpen = !action.payload;
    },

    setIsRegisterOpen: (state, action: PayloadAction<boolean>) => {
      state.isRegisterOpen = action.payload;
      state.isLoginOpen = !action.payload;
    },
  },
});

export default mobileSliderSlice.reducer;
export const {
  setIsCategoryOpen,
  setIsLoginOpen,
  setAuthMadalOpen,
  setIsRegisterOpen,
} = mobileSliderSlice.actions;
