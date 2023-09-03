import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WishProductType = {
  id: number;
  name: string;
  slug: string;
  stock: string;
  image: string;
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
      state.wishListProducts.push(action.payload);
    },

    removeToWishList: (state, action: PayloadAction<number>) => {
      state.wishListProducts = state.wishListProducts.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export default wishListSlice.reducer;
export const { addToWishList, removeToWishList } = wishListSlice.actions;
