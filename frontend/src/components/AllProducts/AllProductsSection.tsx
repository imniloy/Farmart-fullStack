import React from "react";
import SortByComp from "./SortByComp";
import Pagination from "../Pagination";
import { PaginationType } from "@/types/pagination";

const AllProductsSection = ({
  searchParams,
  pagination,
}: {
  pagination: PaginationType;
  searchParams: { [key: string]: string | string[] | undefined };
}): React.ReactElement => {
  return (
    <div className="w-full lg:w-[calc(_100%_-_320px)]">
      <div className="flex items-center w-full justify-between h-10 mb-4">
        <p className="w-fit ml-auto text-color-black font-semibold text-sm sm:text-base md:ltr:mr-6 md:rtl:ml-6 mt-0.5 font-inter">
          {pagination.total > 1
            ? `${pagination.total} Products Found`
            : `${pagination.total} Product Found`}
        </p>
      </div>
      <ul className="w-full h-full grid gap-[10px] 500px:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4">
        aaa
      </ul>

      <div className="w-full mx-auto">
        <Pagination searchParams={searchParams} pagination={pagination} />
      </div>
    </div>
  );
};

export default AllProductsSection;
