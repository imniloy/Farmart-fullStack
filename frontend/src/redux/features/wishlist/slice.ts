import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WishProductType = {
  id: number;
  name: string;
  slug: string;
  stock: number;
};

type InitialState = {
  wishListProducts: WishProductType[];
};

const initialState: InitialState = {
  wishListProducts: [],
};

const wishListSlice = createSlice({
  name: "wishlist" as string,
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<WishProductType>) => {
      //   state.cartProducts.push(action.payload);
    },

    removeToWishList: (state, action: PayloadAction<number>) => {
      //   state.cartProducts.push(action.payload);
    },
  },
});

export default wishListSlice.reducer;
export const { addToWishList, removeToWishList } = wishListSlice.actions;
