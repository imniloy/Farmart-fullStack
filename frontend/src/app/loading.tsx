import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

const loading = () => {
  return (
    <SkeletonTheme baseColor="#E5E7EB" highlightColor="#F9FAFB" duration={2}>
      <div className="section-container rounded-lg">
        <Skeleton
          borderRadius={8}
          className="mt-8 h-[380px] 500px:h-[360px] lg:h-[380px] xl:h-[400px] 2xl:h-[440px] rounded-lg"
          count={1}
        />
      </div>

      <div className="hidden lg:block section-container">
        <Skeleton
          borderRadius={8}
          className="hidden lg:flex px-14 py-6 mt-6 h-[100px] w-full"
          count={1}
        />
      </div>

      <div className="section-container my-8">
        <ul className="grid grid-cols-2 500px:grid-cols-4 xl:grid-cols-6 gap-2">
          {new Array(12).fill(1).map((_, i) => (
            <li key={i} className="w-full">
              <Skeleton className="w-full p-2 500px:p-3 lg:p-4 2xl:p-5 h-[100px] lg:h-[120px]" />
            </li>
          ))}
        </ul>
      </div>

      <section className="lg:py-16 py-10 bg-gray-50">
        <div className="section-container ">
          <ul className="w-full h-full grid gap-[10px] 500px:gap-4 grid-cols-2 md:grid-cols-3 980px:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {new Array(12).fill(1).map((_, i) => (
              <li key={i} className="w-full">
                <Skeleton className="w-full p-2 500px:p-3 lg:p-4 2xl:p-5 h-[180px] lg:h-[200px]" />
                <Skeleton height={24} className="" />
                <Skeleton height={24} className="" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lg:py-16 py-10 bg-gray-50">
        <div className="section-container ">
          <ul className="w-full h-full grid gap-[10px] 500px:gap-4 grid-cols-2 md:grid-cols-3 980px:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {new Array(12).fill(1).map((_, i) => (
              <li key={i} className="w-full">
                <Skeleton className="w-full p-2 500px:p-3 lg:p-4 2xl:p-5 h-[180px] lg:h-[200px]" />
                <Skeleton height={24} className="" />
                <Skeleton height={24} className="" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SkeletonTheme>
  );
};

export default loading;
