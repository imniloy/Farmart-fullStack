import React from "react";
import Pagination from "../Pagination";
import { ProductsDataType } from "@/types/pagination";
import { getAllProducts } from "@/services/product";
import Product from "../Product";
import SortByComp from "./SortByComp";
import NoProductImg from "../assets/images/no-product.webp";
import Image from "next/image";
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

  return (
    <div className="w-full lg:w-[calc(_100%_-_320px)]">
      {data?.length > 0 ? (
        <div>
          <SortByComp meta={meta} />
          <ul className="w-full h-full grid gap-[10px] 500px:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4">
            {data.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </ul>

          <div className="w-full mx-auto">
            <Pagination
              currentWebPageView="user_products_page"
              searchParams={searchParams}
              pagination={meta.pagination}
            />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <SortByComp meta={meta} />
          <div className="flex flex-col justify-center items-center sm:space-y-4 h-[480px] lg:h-[781px] bg-white">
            <div className="relative h-[340px] w-[320px] lg:h-[400px] lg:w-[380px]">
              <Image
                src={NoProductImg}
                fill
                alt="NoProductImg"
                style={{
                  objectFit: "contain",
                }}
                sizes="(min-width: 1024px) 380px"
              />
            </div>
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center mt-2 font-medium text-gray-600 font-inter">
              Sorry, we can not find this product 😞
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductsSection;
