import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <SkeletonTheme baseColor="#E5E7EB" highlightColor="#F9FAFB">
      <section className="relative bg-[#f9fafb]">
        <div className="section-container">
          <div className="px-2 lg:px-0 py-8 md:py-10 lg:py-12 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col lg:space-y-0 lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 lg:order-1 space-y-8 md:space-y-10 lg:space-y-12">
              <div className="personal_Information_Form">
                <h2 className="font-semibold text-gray-700 pb-4 text-base">
                  01. Personal Details
                </h2>
                <div className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 md:gap-6">
                    <Skeleton height={48} className="w-full" />
                    <Skeleton height={48} className="w-full" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 md:gap-6">
                    <Skeleton height={48} className="w-full" />
                    <Skeleton height={48} className="w-full" />
                  </div>
                </div>
              </div>

              {/* shipping address */}
              <div className="shipping_Address_Form">
                <h2 className="font-semibold text-gray-700 pb-4 text-base">
                  02. Shipping Details
                </h2>
                <div className="space-y-4 md:space-y-6">
                  <Skeleton height={48} className="w-full" />

                  <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-3 lg:grid-rows-1 gap-4 md:gap-6">
                    <Skeleton height={48} className="w-full" />

                    <Skeleton height={48} className="w-full" />

                    <Skeleton height={48} className="w-full" />
                  </div>

                  <div className="pt-4">
                    <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-4 lg:gap-6">
                      <Skeleton height={48} className="w-full" />

                      <Skeleton height={48} className="w-full" />
                    </div>
                  </div>

                  <div className="payment_Method w-full">
                    <h2 className="font-semibold text-gray-700 pb-4 text-base">
                      03. Payment Method
                    </h2>
                    <Skeleton height={48} className="w-full" />
                  </div>

                  {/* options */}
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 md:gap-6">
                    <Skeleton height={48} className="w-full" />

                    <Skeleton height={48} className="w-full" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="md:w-full lg:w-2/5 lg:ml-8 xl:ml-14 
    mb-6 lg:mb-0 flex flex-col h-full  lg:sticky top-28 md:order-1 lg:order-2"
            >
              <div className="border p-4 rounded-lg bg-white order-1 sm:order-2">
                <h2 className="font-bold text-lg font-inter pb-4 text-gray-700">
                  Order Summary
                </h2>

                <Skeleton height={200} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SkeletonTheme>
  );
};

export default Loading;
