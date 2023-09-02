"use client";
import React, { useState } from "react";

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
  const [showCartButton, setShowCartButton] = useState<boolean>(true);

  return (
    <div className="overflow-hidden mt-3 z-10 space-y-[6px]" key={id}>
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

        {showCartButton && stock > 0 ? (
          //  add to cart button
          <button
            onClick={() => setShowCartButton(false)}
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
        ) : (
          <div>
            {/* <!-- add/delete button --> */}
            <div className="h-full w-auto flex flex-col 500px:flex-row items-center justify-evenly py-[6px] 500px:py-1 px-1 500px:px-2 bg-emerald-500 text-white rounded space-x-[2px] 500px:space-x-[6px]">
              {/* <!-- minus button --> */}
              <button>
                <span className="text-white text-base">
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
                1
              </p>
              {/* <!-- plus button --> */}
              <button>
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
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
