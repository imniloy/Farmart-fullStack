"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, handleQuantity } from "@/redux/features/cart/slice";
import { CartProduct } from "@/redux/features/cart/types";

const ProductDescription = ({
  id,
  name,
  price,
  originalPrice,
  stock,
  imageUrl,
}: {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null | undefined;
  stock: number;
  imageUrl: string;
}) => {
  const { cartProducts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const alreadyAdded = cartProducts.find((product) => product.id === id);

  // dispatch functions...
  const addProductToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        originalPrice,
        stock,
        quantity: 1,
        imageUrl,
      })
    );
  };

  const cartProductQuantityHandler = (oparationType: string) => {
    console.log(oparationType);
    dispatch(handleQuantity({ id, oparationType }));
  };
  // console.log(alreadyAdded);

  return (
    <div
      className="overflow-hidden mt-1 z-10 space-y-[6px] pb-4 px-3 500px:px-4"
      key={id}
    >
      {/* <!-- name of the products --> */}
      <p className="font-medium text-sm text-gray-600 truncate">{name}</p>

      {/* <!-- price section --> */}
      <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
        {/* <!-- price item --> */}
        <div className="product-price font-bold">
          <span className="inline-block text-xl text-gray-800 truncate">
            ${price}
          </span>

          {originalPrice != null && originalPrice != undefined && (
            <span className="line-through block font-semibold text-sm text-gray-500">
              ${originalPrice}
            </span>
          )}
        </div>

        {alreadyAdded && stock > 0 ? (
          <div>
            {/* <!-- add/delete button --> */}
            <div className="h-full w-auto flex flex-col 500px:flex-row items-center justify-evenly py-[6px] 500px:py-1 px-1 500px:px-2 bg-emerald-500 text-white rounded space-x-[2px] 500px:space-x-[6px]">
              {/* <!-- minus button --> */}
              <button onClick={() => cartProductQuantityHandler("minus")}>
                <span className="text-white bg-red-500 text-base">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="20px"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M400 256H112"
                    ></path>
                  </svg>
                </span>
              </button>
              <p className="text-base text-white px-1 font-inter font-bold">
                {alreadyAdded.quantity}
              </p>
              {/* <!-- plus button --> */}
              <button onClick={() => cartProductQuantityHandler("plus")}>
                <span className="text-dark text-base">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="20px"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M256 112v288m144-144H112"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        ) : (
          //  add to cart button
          <button
            onClick={addProductToCart}
            aria-label="cart"
            className="h-8 sm:h-10 w-8 sm:w-10 flex items-center justify-center border border-gray-200 rounded text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
          >
            <span className="text-xl">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M460 160h-88v-12A116.13 116.13 0 00258.89 32h-5.78A116.13 116.13 0 00140 148v12H52a4 4 0 00-4 4v300a16 16 0 0016 16h384a16 16 0 0016-16V164a4 4 0 00-4-4zm-280-11c0-41.84 33.41-76.56 75.25-77A76.08 76.08 0 01332 148v12H180zm156 187h-64v64h-32v-64h-64v-32h64v-64h32v64h64z"></path>
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
