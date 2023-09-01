"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FarmartLogo from "./assets/svg/framart-logo-header.svg";
import { setAuthMadalOpen } from "@/redux/features/uiSlider/slices";
import { useAppDispatch } from "@/redux/hooks";
import { setIsCartSliderOpen } from "@/redux/features/cart/slice";

function Header() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const dispatch = useAppDispatch();

  const openCartModal = () => {
    dispatch(setIsCartSliderOpen(true));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    searchText
      ? router.replace(`/products?query=${searchText}`)
      : router.replace("/");

    setSearchText("");
  };

  return (
    <header className="bg-brand-color w-full py-4 sticky top-0 left-0 right-0 z-20">
      <div className="flex mx-2 500px:mx-6 xl:mx-auto xl:max-w-[1200px] 2xl:max-w-[1420px] items-center justify-between">
        <div className="logo-continer">
          <Link href="/">
            <Image
              src={FarmartLogo}
              height={56}
              width={157}
              className="mr-6"
              alt="FarmartLogo"
              priority={true}
            />
          </Link>
        </div>

        {/* search bar */}
        <div className="hidden lg:flex lg:w-[520px] xl:w-[650px] 2xl:w-[830px]">
          <form
            onSubmit={handleSubmit}
            className="flex items-center flex-grow bg-white rounded-md overflow-hidden"
          >
            <input
              id="product-search"
              type="search"
              value={searchText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target.value)
              }
              placeholder="I'm searching for"
              className="flex-grow py-[10px] px-4 outline-none focus:outline-none rounded-md"
            />
            <button type="submit" className="h-full px-4 bg-[#FFB531]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* right Icons */}
        <ul
          className={`flex items-center space-x-3 500px:space-x-4 lg:space-x-2 xl:space-x-5`}
        >
          <li className="cursor-pointer flex lg:hidden">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </li>

          <li>
            <Link href="/wishlist" className="flex items-center">
              <div className="relative lg:ml-1">
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

                <span className="absolute font-bold -top-[10px] -right-[10px] text-xs h-5 w-5 flex justify-center items-center rounded-lg z-20 bg-[#FFB531]">
                  2
                </span>
              </div>
              <span className="lg:pr-3 lg:pl-2 hidden lg:inline-block">
                Wishlist
              </span>
            </Link>
          </li>

          <li
            className="flex items-center cursor-pointer"
            onClick={openCartModal}
          >
            <div className="relative lg:ml-1">
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              <span className="absolute font-bold -top-[10px] -right-3 text-xs h-5 w-5 flex justify-center items-center rounded-lg z-20 bg-[#FFB531]">
                2
              </span>
            </div>
            <span className="lg:pr-3 lg:pl-2 hidden lg:inline-block">Cart</span>
          </li>

          {/* <!-- sign in button --> */}
          <li
            className="cursor-pointer"
            onClick={() => {
              dispatch(setAuthMadalOpen(true));
            }}
          >
            <div className="flex items-center">
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
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <span
                className="text-sm font-normal lg:text-15px text-brand-dark focus:outline-none pl-1 xl:px-2 hidden lg:inline-block"
                aria-label="Authentication"
              >
                Sign In
              </span>
            </div>

            {/* <div className="flex items-center" onClick={() => {}}>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[url('https://kachabazar-store.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1681765867%2Fbv2qwqmbdhqvslykpniy.jpg&w=32&q=75')]"></div>
              <p className="font-bold px-2 hidden lg:inline-block">
                Niloy
              </p>
            </div> */}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
