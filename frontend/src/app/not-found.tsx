import Image from "next/image";
import React from "react";
import NotFoundImage from "../components/assets/svg/404.svg";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="px-2 500px:px-6 py-14 sm:py-16 lg:py-28 bg-emerald-50">
      <div className="w-fit sm:w-[500px] md:w-[520px] lg:w-[600px] mx-auto">
        {/* image */}
        <div className="relative h-[300px] w-[300px] sm:h-[340px] lg:h-[340px] sm:w-[400px] md:w-[520px] mx-auto lg:w-[600px]">
          <Image src={NotFoundImage} fill alt="not-found-img" />
        </div>

        <div className="text-center">
          <h2 className="font-bold text-gray-700 text-2xl sm:text-3xl leading-normal lg:text-4xl lg:leading-6 mt-4 mb-2 md:mt-8 md:mb-4">
            Page is not found!
          </h2>
          <p className="block text-center text-base font-inter text-gray-600 my-2">
            Sorry! This page is not found! Please try again later.
          </p>

          <Link href={`/`}>
            <div className="bg-emerald-500 w-fit mx-auto py-3 sm:py-4 px-10 sm:px-12 rounded-lg font-semibold mt-4 sm:mt-6 text-sm hover:bg-emerald-600 text-gray-100">
              Back to Home
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
