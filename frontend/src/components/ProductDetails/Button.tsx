"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, handleQuantity } from "@/redux/features/cart/slice";
import { product } from "@/types/products";
import { CartProduct } from "@/redux/features/cart/types";
import { toast } from "react-toastify";
import {
  addToWishList,
  removeToWishList,
} from "@/redux/features/wishlist/slice";
import ShareOptions from "./ShareOptions";

const Button = ({ product }: { product: product }) => {
  const { id, attributes } = product;
  const { name, slug, stock, price, original_price } = attributes;
  const imageUrl = attributes.thumbnail.data.attributes.url;
  const [counter, setCounter] = useState<number>(1);
  const {
    cartProducts,
  }: { isCartSliderOpen: boolean; cartProducts: CartProduct[] } =
    useAppSelector((state) => state.cart);

  const { wishListProducts } = useAppSelector((state) => state.wish);
  const dispatch = useAppDispatch();

  const alreadyAdded = cartProducts.find(
    (seletedProduct) => seletedProduct.id === id
  );

  const alreadyAddedToWishList = wishListProducts.find(
    (product) => product.id === id
  );

  // dispatch functions...
  const addProductToCart = (): void => {
    if (parseInt(stock) < counter) {
      toast.error("Insufficient stock!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    dispatch(
      addToCart({
        id,
        name,
        price,
        originalPrice: original_price,
        stock: parseInt(stock),
        quantity: counter,
        imageUrl,
        slug,
      })
    );

    toast.success(`${counter} ${name} Added To Cart!`, {
      position: toast.POSITION.TOP_CENTER,
    });

    setCounter(1);
  };

  const cartProductQuantityHandler = (oparationType: string): void => {
    if (
      alreadyAdded &&
      oparationType === "plus" &&
      parseInt(stock) < counter + alreadyAdded?.quantity
    ) {
      toast.error("Insufficient stock!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    dispatch(handleQuantity({ id, oparationType, counter }));

    toast.success(`${counter} ${name} Added To Cart!`, {
      position: toast.POSITION.TOP_CENTER,
    });

    setCounter(1);
  };

  // this handleCart is responsible for updating the cart product...
  const handleCart = (): void => {
    if (alreadyAdded) {
      cartProductQuantityHandler("plus");
      return;
    }
    addProductToCart();
  };

  // add whishList...
  const handleWishList = (): void => {
    if (alreadyAddedToWishList) {
      dispatch(removeToWishList(id));
      toast.success(`${name} Remove To Wishlist!`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    dispatch(addToWishList({ id, name, slug, stock, image: imageUrl }));
    toast.success(`${name} Add To Wishlist!`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="relative space-y-2.5 md:space-y-3 my-6 500px:my-8 lg:my-10 xl:mt-16 mb-8">
      {/* counter button */}
      <div className="flex justify-center items-center rounded-md w-full space-x-6 border border-gray-300 px-4 md:px-6 lg:px-8 py-2">
        {/* minus */}
        <button
          disabled={counter <= 1}
          onClick={() => setCounter((prev) => prev - 1)}
          className="cursor-pointer p-1 text-color-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15"
            />
          </svg>
        </button>
        {/* amount */}
        <span className="font-semibold text-color-black text-base">
          {counter}
        </span>
        {/* plus */}
        <button
          onClick={() => setCounter((prev) => prev + 1)}
          className="cursor-pointer p-1 text-color-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      {/* add to cart button */}
      <button
        onClick={handleCart}
        className="text-base leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white hover:text-white bg-brand-color hover:bg-[#06c7a1] w-full space-x-3 px-4 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-4"
      >
        <span className="inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </span>
        <span className="capitalize text-base 2xl:text-lg font-medium inline-block">
          Add to Cart
        </span>
      </button>
      {/* wishlist&share */}
      <div className="relative w-full space-x-4 flex justify-between items-center">
        {/* wishlist button */}
        <button
          onClick={handleWishList}
          className="w-1/2 flex items-center justify-center space-x-2 border border-gray-300 px-4 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-4 rounded-md text-color-black"
        >
          {alreadyAddedToWishList ? (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6  text-[#02b290]"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </span>
          ) : (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </span>
          )}
          <span className="text-base font-medium">Wishlist</span>
        </button>
        {/* share button */}
        <button className="w-1/2 flex items-center justify-center space-x-2 border border-gray-300 px-4 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-4 rounded-md text-color-black">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </span>
          <span className="text-base font-medium">Share</span>
        </button>
      </div>
      {/* share */}
      <ShareOptions name={name} />
    </div>
  );
};
export default Button;
