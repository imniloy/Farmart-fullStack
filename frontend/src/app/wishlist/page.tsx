"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeToWishList } from "@/redux/features/wishlist/slice";

const page = () => {
  const { wishListProducts } = useAppSelector((state) => state.wish);
  const dispatch = useAppDispatch();
  // remove whishList...
  const removeWishList = (id: number): void => {
    dispatch(removeToWishList(id));
  };

  return (
    <section className="lg:py-12 py-10 bg-white">
      <div className="section-container space-y-4 xl:space-y-8">
        {/* products */}
        <p className="text-2xl font-inter font-medium">My Wishlist</p>
        <ul className="space-y-4">
          {wishListProducts.map((product) => (
            <li className="w-full h-full flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 bg-gray-100 p-[10px] rounded-lg group overflow-hidden">
              <div className="flex items-center pb-2 border-b border-gray-300 sm:border-none sm:pb-0">
                <div className="relative w-[80px] h-[80px] md:h-[120px] md:w-[120px] overflow-hidden rounded-lg">
                  <Image
                    className="group-hover:scale-110 transition-all duration-200 ease-in-out"
                    src={`http://127.0.0.1:1337${product.image}`}
                    alt={product.name}
                    fill
                  />
                </div>
                <div className="mx-2 500px:mx-4 sm:mx-5 lg:ml-8 grow">
                  <Link href={`/${product.slug}`}>
                    <span className="font-semibold truncate hover:underline block text-md sm:text-base md:text-lg leading-tight text-brand-color w-[180px] 500px:w-[320px] sm:w-[280px] md:w-[360px] lg:w-[580px] xl:w-[800px]">
                      {product.name}
                    </span>
                  </Link>
                  <span className="text-xs sm:text-sm leading-tight text-gray-600 font-medium">
                    {parseInt(product.stock) > 0 ? "In stock" : "Out of stock"}
                  </span>
                </div>
              </div>
              <div className="ml-auto flex items-center space-x-1 500px:space-x-2 md:space-x-4">
                <button
                  onClick={() => removeWishList(product.id)}
                  className="p-2 bg-brand-color rounded-md text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
