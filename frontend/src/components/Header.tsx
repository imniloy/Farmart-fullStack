"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Avatar from "react-avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FarmartLogo from "./assets/svg/framart-logo-header.svg";
import { setAuthMadalOpen } from "@/redux/features/uiSlider/slices";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsCartSliderOpen } from "@/redux/features/cart/slice";
import { userLoggedIn, userLoggedOut } from "@/redux/features/auth/authSlice";
import { verifyAuthOnClient } from "@/services/verifyAuth";
import Cookies from "js-cookie";

const Header = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const { cartProducts } = useAppSelector((state) => state.cart);
  const { wishListProducts } = useAppSelector((state) => state.wish);
  const { user: loggedOnUser } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  let totalCartProducts: number = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );

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

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const userCookie = Cookies.get("farmart_client_token");
    (async () => {
      if (userToken && userCookie) {
        const verifyUser = userToken && (await verifyAuthOnClient(userToken));
        if (verifyUser) {
          dispatch(
            userLoggedIn({
              userToken,
              user: {
                id: verifyUser.user.id,
                username: verifyUser.user.username,
                email: verifyUser.user.email,
                user_type: verifyUser.user.user_type,
              },
            })
          );
        } else {
          dispatch(userLoggedOut());
        }
      }
    })();
  }, [dispatch]);

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

          {(loggedOnUser && loggedOnUser.user_type === "user") ||
            (!loggedOnUser && (
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
                      {wishListProducts.length}
                    </span>
                  </div>
                  <span className="lg:pr-3 lg:pl-2 hidden lg:inline-block">
                    Wishlist
                  </span>
                </Link>
              </li>
            ))}

          {(loggedOnUser && loggedOnUser.user_type === "user") ||
            (!loggedOnUser && (
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
                    {totalCartProducts}
                  </span>
                </div>
                <span className="lg:pr-3 lg:pl-2 hidden lg:inline-block">
                  Cart
                </span>
              </li>
            ))}

          {loggedOnUser && loggedOnUser.user_type === "admin" && (
            <li className="flex items-center cursor-pointer space-x-1 bg-emerald-300 text-color-black px-2 sm:px-4 py-2 rounded-md">
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="inline-block uppercase font-semibold">
                Upload
              </span>
            </li>
          )}

          {/* <!-- sign in button --> */}
          {loggedOnUser ? (
            <li
              className="cursor-pointer ml-8 lg:ml-0"
              onClick={() => {
                router.replace(`/users/account/${loggedOnUser.id}`);
              }}
            >
              <div className="flex items-center" onClick={() => {}}>
                <Avatar
                  size="26"
                  name={loggedOnUser.username.split(" ")[0]}
                  textSizeRatio={2}
                  round={true}
                />
                <p className="font-semibold px-[6px] hidden lg:inline-block">
                  {loggedOnUser.username.split(" ")[0]}
                </p>
              </div>
            </li>
          ) : (
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
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
