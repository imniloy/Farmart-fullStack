import Link from "next/link";
import React from "react";

const BreadCum = (): React.ReactNode => {
  return (
    <div className="Breadcrumbs-container-element w-full py-4 sm:py-6">
      <ol className="flex items-center space-x-1">
        <li className="text-sm transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-medium">
          <Link href="" className="text-xs 500px:text-sm sm:text-base">
            Home
          </Link>
        </li>
        {/* arrow Icon */}
        <li className="text-sm">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </li>
        {/* category wise sorting */}
        <li className="text-sm transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-medium">
          <Link href="" className="text-xs 500px:text-sm sm:text-base">
            Fresh Vegetable
          </Link>
        </li>
        {/* arrow Icon */}
        <li className="text-sm">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </li>
        {/* product */}
        <li className="text-sm transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-medium">
          <Link href="" className="text-xs 500px:text-sm sm:text-base">
            Rainbow Chard
          </Link>
        </li>
      </ol>
    </div>
  );
};

export default BreadCum;
