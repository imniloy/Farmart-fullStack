import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

const loading = () => {
  return (
    <SkeletonTheme baseColor="#E5E7EB" highlightColor="#F9FAFB" duration={2}>
      <main className="bg-white">
        <section className="py-10 lg:pb-14 bg-gray-50">
          <div className="section-container">
            <div className="flex items-start w-full space-x-0 lg:space-x-8">
              {/* categroy slider */}
              <div className="hidden w-full lg:block lg:max-w-[300px] overflow-hidden">
                <div className="h-10 mb-4 flex items-center">
                  <p className="font-semibold capitalize text-lg text-color-black">
                    Categories
                  </p>
                </div>
                <ul className="w-full bg-white space-y-1">
                  {new Array(11).fill(1)?.map((_, i) => (
                    <li key={i}>
                      <Skeleton height={50} className="" />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 flex-grow">
                {/* products */}

                <ul className="w-full flex-grow h-full grid gap-[10px] 500px:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4">
                  {new Array(12).fill(1).map((_, i) => (
                    <li key={i} className="w-full flex-grow">
                      <Skeleton className="w-full flex-grow p-2 500px:p-3 lg:p-4 2xl:p-5 h-[120px] lg:h-[150px]" />
                      <Skeleton height={24} className="" />
                      <Skeleton height={24} className="" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SkeletonTheme>
  );
};

export default loading;
