import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import mobileSliderSlice from "./features/uiSlider/slices";

export const store = configureStore({
  reducer: {
    mobileSlider: mobileSliderSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// https://codevoweb.com/learn-nextjs-server-actions-and-mutations-with-examples/
