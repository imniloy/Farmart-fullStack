import React from "react";
import Link from "next/link";

const CustomError = ({
  status,
  message,
}: {
  status: number;
  message: string;
}) => {
  return (
    <div className="px-2 500px:px-6 py-20 sm:py-20 lg:py-40 bg-emerald-50 flex justify-center items-center">
      <div className="text-slate-700">
        <h1 className="text-[140px] sm:text-[160px] lg:text-[200px] font-semibold">
          {status}
        </h1>
        <div className="text-center">
          <h2 className="font-bold text-gray-700 text-2xl sm:text-3xl leading-normal lg:text-4xl lg:leading-6 mb-2 md:mb-4">
            {message}
          </h2>
          <p className="block text-center text-base font-inter text-gray-600 my-2">
            Sorry! Something went worng.
          </p>

          <Link href={`/`}>
            <div className="bg-emerald-500 w-fit mx-auto py-3 sm:py-4 px-10 sm:px-12 rounded-lg font-semibold mt-4 sm:mt-6 text-sm hover:bg-emerald-600 text-gray-100">
              Back to Home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomError;
