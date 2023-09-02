import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, ProductQuantity } from "./types";

type InitialState = {
  isCartSliderOpen: boolean;
  cartProducts: CartProduct[];
};

const initialState: InitialState = {
  isCartSliderOpen: true,
  cartProducts: [],
};

const cartSliderSlice = createSlice({
  name: "cartSlider" as string,
  initialState,
  reducers: {
    setIsCartSliderOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartSliderOpen = action.payload;
    },

    addToCart: (state, action: PayloadAction<CartProduct>) => {
      state.cartProducts.push(action.payload);
    },

    removeToCart: (state, action: PayloadAction<number>) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product?.id !== action.payload
      );
    },

    handleQuantity: (state, action: PayloadAction<ProductQuantity>) => {
      const { id, oparationType } = action.payload;

      switch (oparationType) {
        case "plus":
          state.cartProducts = state.cartProducts.map((product) => {
            if (product?.id === id) {
              return {
                ...product,
                quantity: product?.quantity + 1,
              };
            }
            return product;
          });

        case "minus":
          state.cartProducts = state.cartProducts.map((product) => {
            if (product?.id === id) {
              return {
                ...product,
                quantity: product?.quantity - 1,
              };
            }
            return product;
          });

        default:
          return state;
      }
    },
  },
});

export default cartSliderSlice.reducer;
export const { setIsCartSliderOpen } = cartSliderSlice.actions;
