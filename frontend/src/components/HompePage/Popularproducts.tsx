import React from "react";
import Product from "../Product";
import { getAllPopularProducts } from "@/services/product";
import { product } from "@/types/products";

const Popularproducts = async () => {
  const productsData = await getAllPopularProducts();
  const { success, data: products }: { success: boolean; data: product[] } =
    productsData;

  return (
    <section className="lg:py-16 py-10 bg-gray-50">
      <div className="section-container">
        {/* <!-- title section --> */}
        <div className="mx-auto text-center w-full lg:w-2/5 mb-12">
          <h1 className="text-xl lg:text-2xl mb-2 font-inter font-extrabold text-color-black">
            Popular product that we sold
          </h1>
          <p className="text-base text-gray-600 leading-6">
            We provide best quality & fresh grocery items near your location
          </p>
        </div>

        {/* <!-- products lists --> */}
        <ul className="w-full h-full grid gap-[10px] 500px:gap-4 grid-cols-2 md:grid-cols-3 980px:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {products?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Popularproducts;
