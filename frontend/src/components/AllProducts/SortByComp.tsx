"use client";
import React from "react";
import { MetaType } from "@/types/pagination";
import { setIsCategoryOpen } from "@/redux/features/uiSlider/slices";
import { useAppDispatch } from "@/redux/hooks";

const SortByComp = ({ meta }: { meta: MetaType }): React.ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center w-full justify-between h-10 mb-4">
      <button
        onClick={() => dispatch(setIsCategoryOpen(true))}
        className="flex items-center px-4 py-2 sm:mr-5 text-sm font-semibold transition duration-200 ease-in-out border rounded-md lg:hidden text-brand-dark border-border-base focus:outline-none hover:border-brand hover:text-brand space-x-2"
      >
        {/* icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18px"
          height="14px"
          viewBox="0 0 18 14"
        >
          <g
            id="Group_36196"
            data-name="Group 36196"
            transform="translate(-925 -1122.489)"
          >
            <path
              id="Path_22590"
              data-name="Path 22590"
              d="M942.581,1295.564H925.419c-.231,0-.419-.336-.419-.75s.187-.75.419-.75h17.163c.231,0,.419.336.419.75S942.813,1295.564,942.581,1295.564Z"
              transform="translate(0 -169.575)"
              fill="currentColor"
            />
            <path
              id="Path_22591"
              data-name="Path 22591"
              d="M942.581,1951.5H925.419c-.231,0-.419-.336-.419-.75s.187-.75.419-.75h17.163c.231,0,.419.336.419.75S942.813,1951.5,942.581,1951.5Z"
              transform="translate(0 -816.512)"
              fill="currentColor"
            />
            <path
              id="Path_22593"
              data-name="Path 22593"
              d="M1163.713,1122.489a2.5,2.5,0,1,0,1.768.732A2.483,2.483,0,0,0,1163.713,1122.489Z"
              transform="translate(-233.213)"
              fill="currentColor"
            />
            <path
              id="Path_22594"
              data-name="Path 22594"
              d="M2344.886,1779.157a2.5,2.5,0,1,0,.731,1.768A2.488,2.488,0,0,0,2344.886,1779.157Z"
              transform="translate(-1405.617 -646.936)"
              fill="currentColor"
            />
          </g>
        </svg>
        <span className="ltr:pl-2.5 rtl:pr-2.5 text-base">Filters</span>
      </button>
      <p className="w-fit ml-auto text-color-black font-semibold text-sm sm:text-base md:ltr:mr-6 md:rtl:ml-6 mt-0.5 font-inter">
        {meta.pagination.total > 1 && `${meta.pagination.total} Products Found`}
        {meta.pagination.total === 1 &&
          `${meta.pagination.total} Product Found`}
      </p>
    </div>
  );
};

export default SortByComp;
