import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <SkeletonTheme baseColor="#E5E7EB" highlightColor="#F9FAFB">
      <section className="py-10 lg:pb-14 bg-gray-50">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row w-full">
            <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10 xl:mr-10">
              {/*left section  */}
              <Skeleton height={200} count={1} className="" />
            </div>
            {/* <!-- right section... --> */}
            <div className="w-full bg-white mt-2 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
              <div className="overflow-hidden">
                <h2 className="text-lg lg:text-xl font-inter font-bold mb-5">
                  Dashboard
                </h2>

                <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
                  {/* <!-- total order --> */}
                  <Skeleton
                    height={70}
                    count={1}
                    borderRadius={8}
                    className=""
                  />

                  {/* <!-- pending order --> */}
                  <Skeleton
                    height={70}
                    count={1}
                    borderRadius={8}
                    className=""
                  />

                  {/* <!-- Processing Order --> */}
                  <Skeleton
                    height={70}
                    count={1}
                    borderRadius={8}
                    className=""
                  />
                </div>

                <div className="font-inter table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                  <Skeleton height={36} count={12} className="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SkeletonTheme>
  );
};

export default Loading;
