import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, ProductQuantity } from "./types";
import { current } from "@reduxjs/toolkit";

type InitialState = {
  isCartSliderOpen: boolean;
  cartProducts: CartProduct[];
};

const initialState: InitialState = {
  isCartSliderOpen: false,
  cartProducts: [],
};

const cartSliderSlice = createSlice({
  name: "cart" as string,
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
      console.log(action.payload);

      switch (oparationType) {
        case "plus":
          state.cartProducts = state.cartProducts.map((product) => {
            let draftProduct = JSON.parse(JSON.stringify(product));

            if (draftProduct.id === id) {
              console.log(draftProduct.quantity);
              return {
                ...draftProduct,
                quantity: draftProduct.quantity + 1,
              };
            }
            return product;
          });
          break;

        case "minus":
          state.cartProducts = state.cartProducts.map((product) => {
            let draftProduct = JSON.parse(JSON.stringify(product));

            if (draftProduct.id === id) {
              console.log(draftProduct.quantity);
              return {
                ...draftProduct,
                quantity: draftProduct.quantity - 1,
              };
            }
            return product;
          });
          break;

        default:
          return state;
      }
    },
  },
});

export default cartSliderSlice.reducer;
export const { setIsCartSliderOpen, addToCart, removeToCart, handleQuantity } =
  cartSliderSlice.actions;
