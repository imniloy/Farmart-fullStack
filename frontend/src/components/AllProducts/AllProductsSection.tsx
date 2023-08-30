import React from "react";
import Pagination from "../Pagination";
import { ProductsDataType } from "@/types/pagination";
import { getAllProducts } from "@/services/product";
import Product from "../Product";
const AllProductsSection = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { category, query, page } = searchParams;
  const ProductsData: ProductsDataType = await getAllProducts({
    category,
    query,
    page,
  });
  const { data, meta } = ProductsData;
  console.log(meta);
  // console.log(data);

  return (
    <div className="w-full lg:w-[calc(_100%_-_320px)]">
      <div className="flex items-center w-full justify-between h-10 mb-4">
        <p className="w-fit ml-auto text-color-black font-semibold text-sm sm:text-base md:ltr:mr-6 md:rtl:ml-6 mt-0.5 font-inter">
          {meta.pagination.total > 1
            ? `${meta.pagination.total} Products Found`
            : `${meta.pagination.total} Product Found`}
        </p>
      </div>
      <ul className="w-full h-full grid gap-[10px] 500px:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4">
        {data.map((product) => (
          <Product product={product} />
        ))}
      </ul>

      <div className="w-full mx-auto">
        <Pagination searchParams={searchParams} pagination={meta.pagination} />
      </div>
    </div>
  );
};

export default AllProductsSection;
