import Image from "next/image";
import React from "react";
import NotFoundImage from "../assets/svg/404.svg";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="px-6 py-10 lg:py-28 bg-emerald-50">
      <div className="w-[600px] mx-auto">
        {/* image */}
        <div className="relative h-[340px] w-full">
          <Image src={NotFoundImage} fill alt="not-found-img" />
        </div>

        <div className="text-center">
          <h2 className="font-bold text-gray-700 font-2xl lg:text-4xl leading-6 mt-8 mb-4">
            Page is not found!
          </h2>
          <p className="block text-center text-base font-inter text-gray-600 my-2">
            Sorry! This page is not found! Please try again later.
          </p>

          <Link href={`/`}>
            <div className="bg-emerald-500 w-fit mx-auto py-4 px-12 rounded-lg font-semibold mt-6 text-sm hover:bg-emerald-600 text-gray-100">
              Back to Home
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
