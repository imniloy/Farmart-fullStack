"use client";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LeftSidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const {
        status,
        success,
        message,
      }: { status: number; success: boolean; message: string } = await (
        await fetch(`/api/auth/logout`)
      ).json();
      if (success) {
        dispatch(userLoggedOut());
        toast.success(`${message}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          pauseOnFocusLoss: true,
          draggable: true,
          theme: "light",
        });
        router.replace(`/`);
        return;
      }
      toast.error(`Failed to logout`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: true,
        draggable: true,
        theme: "light",
      });
    } catch (err: any) {
      toast.error(`Failed to logout`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10 xl:mr-10">
      <ul className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
        <li className="py-3 px-2 my-2 flex font-inter items-center rounded-md bg-gray-100 w-full text-[#02b290] group">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="flex-shrink-0 h-4 w-4 group-hover:text-emerald-600"
            aria-hidden="true"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="176"
              height="176"
              x="48"
              y="48"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              rx="20"
              ry="20"
            ></rect>
            <rect
              width="176"
              height="176"
              x="288"
              y="48"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              rx="20"
              ry="20"
            ></rect>
            <rect
              width="176"
              height="176"
              x="48"
              y="288"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              rx="20"
              ry="20"
            ></rect>
            <rect
              width="176"
              height="176"
              x="288"
              y="288"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              rx="20"
              ry="20"
            ></rect>
          </svg>
          <p className="inline-flex items-center font-inter justify-between ml-2 text-sm font-semibold w-full text-[#02b290] cursor-pointer">
            Dashboard
          </p>
        </li>
        {/* <!-- log out --> */}
        <li
          onClick={handleLogout}
          className="py-3 px-2  flex font-inter items-center rounded-md hover:bg-gray-100 active:bg-gray-100  w-full hover:text-[#02b290] active:text-[#02b290] group"
        >
          <span className="mr-2 group-hover:text-emerald-500">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="flex-shrink-0 h-4 w-4"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M336 112a80 80 0 00-160 0v96"
              ></path>
              <rect
                width="320"
                height="272"
                x="96"
                y="208"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="48"
                ry="48"
              ></rect>
            </svg>
          </span>
          <button className="inline-flex items-center justify-between text-sm font-semibold text-color-black w-full group-hover:text-emerald-600">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
