import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  isOpen: boolean;
  isAuthMadalOpen: boolean;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
};

const initialState = {
  isOpen: false,
  isAuthMadalOpen: true,
  isLoginOpen: false,
  isRegisterOpen: false,
} as InitialState;

const mobileSliderSlice = createSlice({
  name: "mobileSlider" as string,
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },

    setAuthMadalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAuthMadalOpen = action.payload;
      // state.isLoginOpen = action.payload;
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
  setIsOpen,
  setIsLoginOpen,
  setAuthMadalOpen,
  setIsRegisterOpen,
} = mobileSliderSlice.actions;
