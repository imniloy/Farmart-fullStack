import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <SkeletonTheme baseColor="#E5E7EB" highlightColor="#F9FAFB">
      <section className="py-10 lg:pb-14 bg-gray-50">
        <div className="section-container">
          <Skeleton height={24} count={10} className="" />

          <div className="mt-6">
            <Skeleton height={200} count={1} className="" />
          </div>
        </div>
      </section>
    </SkeletonTheme>
  );
};

export default Loading;
