import { getAllDiscountedProducts } from "@/services/product";
import { product } from "@/types/products";
import React from "react";
import Product from "../Product";

const DiscountProducts = async () => {
  const productsData = await getAllDiscountedProducts();
  const { success, data: products }: { success: boolean; data: product[] } =
    productsData;

  return (
    <section className="lg:py-16 py-10 bg-gray-50">
      <div className="section-container">
        <div className="mx-auto text-center w-full lg:w-4/5 mb-12">
          <h1 className="text-xl lg:text-2xl mb-2 font-inter font-extrabold text-color-black">
            Latest Discounted Products
          </h1>
          <p className="text-base text-gray-600 leading-6">
            See Our latest discounted products below. Choose your daily needs
            from here and get a special discount with free shipping.
          </p>
        </div>

        {/* discount products*/}
        <ul className="w-full h-full grid gap-[10px] 500px:gap-4 grid-cols-2 md:grid-cols-3 980px:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {products?.map((product) => (
            <Product product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DiscountProducts;
