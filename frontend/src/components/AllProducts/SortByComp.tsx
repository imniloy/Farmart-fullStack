import React from "react";

const SortByComp = () => {
  return (
    <div className="flex items-center justify-between h-10 mb-4">
      <button className="flex items-center px-4 py-2 sm:mr-5 text-sm font-semibold transition duration-200 ease-in-out border rounded-md lg:hidden text-brand-dark border-border-base focus:outline-none hover:border-brand hover:text-brand space-x-2">
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
      <div className="flex items-center w-full">
        {/* <div
  class="shrink-0 hidden sm:block text-color-black font-medium text-base md:ltr:mr-6 md:rtl:ml-6 mt-0.5 font-inter"
>
  2,683 Items Found
</div> */}
        <div className="relative ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0 min-w-[160px] ml-auto">
          <div className="flex items-center space-x-2">
            <div className="shrink-0 text-color-black font-medium text-base md:ltr:mr-6 md:rtl:ml-6 mt-0.5 font-inter hidden 500px:inline-block">
              Sort by
            </div>
            <select
              name="sort-by-price"
              id="sort-by-price"
              className="flex items-center px-2 py-2 text-base font-medium transition duration-200 ease-in-out border rounded-md text-color-black border-border-base focus:outline-none hover:border-brand hover:text-brand"
            >
              <option className="font-medium text-color-black" value="">
                Default
              </option>
              <option
                className="font-medium text-color-black"
                value="low-to-high"
              >
                Price Low To High
              </option>
              <option
                className="font-medium text-color-black"
                value="high-to-low"
              >
                Price High To Low
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortByComp;
