import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, ProductQuantity } from "./types";

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
      const { id, oparationType, counter } = action.payload;

      switch (oparationType) {
        case "plus":
          state.cartProducts = state.cartProducts.map((product) => {
            let draftProduct = JSON.parse(JSON.stringify(product));

            if (draftProduct.id === id) {
              return {
                ...draftProduct,
                quantity: draftProduct.quantity + counter,
              };
            }
            return product;
          });
          break;

        case "minus":
          state.cartProducts = state.cartProducts.map((product) => {
            let draftProduct = JSON.parse(JSON.stringify(product));

            if (draftProduct.id === id) {
              // console.log(draftProduct);

              return {
                ...draftProduct,
                quantity: draftProduct.quantity - counter,
              };
            }
            return product;
          });
          break;

        default:
          return state;
      }
    },

    setClearCart: (state) => {
      state.cartProducts = [];
      state.isCartSliderOpen = false;
    },
  },
});

export default cartSliderSlice.reducer;
export const {
  setIsCartSliderOpen,
  addToCart,
  removeToCart,
  handleQuantity,
  setClearCart,
} = cartSliderSlice.actions;
