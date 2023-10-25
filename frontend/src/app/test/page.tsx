import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

const loading = () => {
  return (
    <SkeletonTheme baseColor="#E5E7EB" highlightColor="#F9FAFB" duration={2}>
      <div className="bg-white">
        <section className="section-container my-8">
          <Skeleton height={30} className="mb-3" borderRadius={0} />

          <div className="mb-8 lg:mb-10">
            <div className="grid gap-y-8 lg:gap-x-4 xl:gap-x-6 lg:grid-cols-12 mb-8 lg:mb-12 xl:mb-20">
              {/* Image carosoul */}
              <div className="lg:col-span-6 xl:col-span-7">
                <Skeleton
                  className="h-[320px] 500px:h-[380px] sm:h-[480px] md:h-[500px] lg:h-[580px] w-full"
                  borderRadius={0}
                />
              </div>
              {/* details info */}
              <div className="lg:col-span-6 xl:col-span-5">
                <div className="space-y-2">
                  <h1>
                    <Skeleton height={32} className="" borderRadius={0} />
                  </h1>
                  <h4>
                    <Skeleton height={32} className="" borderRadius={0} />
                  </h4>
                  <h4>
                    <Skeleton height={32} className="" borderRadius={0} />
                  </h4>
                </div>

                <div className="my-10 space-y-2">
                  <div>
                    <Skeleton height={60} className="" borderRadius={0} />
                  </div>
                  <div>
                    <Skeleton height={60} className="" borderRadius={0} />
                  </div>
                  <div>
                    <Skeleton height={60} className="" borderRadius={0} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
    </SkeletonTheme>
  );
};

export default loading;
