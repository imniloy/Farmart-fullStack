"use client";
import React from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <section className="px-2 500px:px-6 py-14 sm:py-16 lg:py-28 bg-emerald-50">
      <div className="w-fit sm:w-[500px] md:w-[520px] lg:w-[600px] mx-auto">
        <p className="relative text-[100px] lg:text-[200px] mx-auto w-fit">
          500
        </p>

        <div className="text-center ">
          <h2 className="font-bold text-gray-700 text-2xl sm:text-3xl leading-normal lg:text-4xl lg:leading-6 mb-2 md:mt-8 md:mb-4">
            Something went Wrong
          </h2>
          <p className="block text-center text-base font-inter text-gray-600 my-2">
            Sorry! Something went Wrong! Please try again later.
          </p>

          <div
            onClick={() => {
              reset();
            }}
            className="cursor-pointer bg-emerald-500 w-fit mx-auto py-3 sm:py-4 px-10 sm:px-12 rounded-lg font-semibold mt-4 sm:mt-6 text-sm hover:bg-emerald-600 text-gray-100"
          >
            Try again
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
