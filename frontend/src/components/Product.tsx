import { product } from "@/types/products";
import { PRIVATE_API_URL, PUBLIC_API_URL } from "@/urls";
import Image from "next/image";
import React from "react";
import ProductDescription from "./ProductDescription";
import Link from "next/link";

const Product = ({ product }: { product: product }): React.ReactNode => {
  console.log(product.attributes.slug);
  const stock: number = parseInt(product.attributes.stock);
  let discountPercentise: number = 0;
  const price: number = product?.attributes?.price;
  const originalPrice: null | undefined | number =
    product?.attributes?.original_price;

  if (originalPrice) {
    const discountPrice = originalPrice - price;
    discountPercentise = Math.ceil((discountPrice / originalPrice) * 100);
  }

  return (
    <li
      key={product.id}
      className="relative w-full h-full box-border shadow-sm overflow-hidden rounded-md bg-white group"
    >
      <Link href={`/${product.attributes.slug}`}>
        <div className=" px-3 500px:px-4 pt-3 pb-2">
          {/* <!-- stock information --> */}
          <div className="mb-1">
            <span className="bg-gray-100 text-emerald-500 rounded-full text-xs px-2 py-0 font-bold">
              {stock > 0 ? "Stock :" : "Out of stock"}
              {stock > 0 && (
                <span className="text-red-500 dark:text-red-400 pl-1 font-bold">
                  {stock}
                </span>
              )}
            </span>
          </div>
          {/* <!-- discount percentise --> */}
          {discountPercentise > 0 && (
            <span className="absolute text-dark text-xs bg-orange-500 text-white py-1 px-2 rounded font-bold z-10 right-2 top-6 sm:top-4">
              {discountPercentise}% OFF
            </span>
          )}
          {/* <!-- image Section --> */}
          <div className="relative  flex items-center justify-center w-full min-w-[120px] h-[180px] sm:min-w-[190px] sm:h-[190px] overflow-hidden">
            <Image
              src={`${PRIVATE_API_URL}${product.attributes?.thumbnail?.data.attributes?.formats?.thumbnail?.url}`}
              fill
              style={{
                objectFit: "contain",
              }}
              alt={`${product.attributes.thumbnail.data.attributes.name}`}
              className="group-hover:scale-110 h-full transition-all duration-200"
              sizes="190px, (min-width: 600px) 250px, (min-width: 700px) 330px, (min-width: 800px) 280px, (min-width: 900px) 250px, (min-width: 1280px) 240px"
            />
          </div>
        </div>
      </Link>
      <ProductDescription
        id={product?.id}
        name={product?.attributes?.name}
        price={price}
        originalPrice={originalPrice}
        stock={stock}
        imageUrl={
          product.attributes.thumbnail.data.attributes.formats.thumbnail.url
        }
        slug={product.attributes.slug}
      />
    </li>
  );
};

export default Product;
