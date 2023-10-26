// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import mobileSliderSlice from "./features/uiSlider/slices";
// import wishListSlice from "./features/wishlist/slice";
// import cartSliderSlice from "./features/cart/slice";
// import authSlice from "./features/auth/authSlice";

// export const store = configureStore({
//   reducer: {
//     mobileSlider: mobileSliderSlice,
//     cart: cartSliderSlice,
//     wish: wishListSlice,
//     auth: authSlice,
//   },
//   devTools: process.env.NODE_ENV !== "production",
//   middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
// });

// setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import mobileSliderSlice from "./features/uiSlider/slices";
import wishListSlice from "./features/wishlist/slice";
import cartSliderSlice from "./features/cart/slice";
import authSlice from "./features/auth/authSlice";

// type StorageType = typeof window !== 'undefined' ? storage : null;
// const isClient = typeof window !== "undefined";

const cartPersistConfig = {
  key: "persist-cart", // Unique key for the cart slice
  storage,

  // storage: typeof window !== "undefined" ? storage : null,
};

const wishListPersistConfig = {
  key: "persist-wishlist", // Unique key for the wishList slice
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartSliderSlice);
const persistedWishListReducer = persistReducer(
  wishListPersistConfig,
  wishListSlice
);

export const store = configureStore({
  reducer: {
    mobileSlider: mobileSliderSlice,
    cart: persistedCartReducer,
    wish: persistedWishListReducer,
    auth: authSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persist = persistStore(store);
