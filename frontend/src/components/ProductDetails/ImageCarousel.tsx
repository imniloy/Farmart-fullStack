"use client";
import { product } from "@/types/products";
import Image from "next/image";
import React from "react";

const ImageCarousel = ({
  thumbnail,
  images,
}: {
  thumbnail: any;
  images: any;
}) => {
  console.log(thumbnail);
  console.log(images);
  return (
    <div className="lg:col-span-6 xl:col-span-7">
      <div className="w-full space-x-0 xl:space-x-3 flex flex-col xl:flex-row">
        {/* image chooser */}
        <div className="product-thumb-swipper">
          <div className="relative border border-brand-color rounded overflow-hidden cursor-pointer hover:opacity-60 transition-all duration-200 shrink-0 w-20 sm:w-24 md:w-[120px] xl:w-[150px] 2xl:w-[170px]">
            <img
              src={`http://127.0.0.1:1337/uploads/small_Organic_Green_Cauliflower_1lb_316bb2566e.webp`}
              alt="product-image-1"
            />
          </div>
          <div className="border border-brand-color rounded overflow-hidden cursor-pointer hover:opacity-60 transition-all duration-200 shrink-0 w-20 sm:w-24 md:w-[120px] xl:w-[150px] 2xl:w-[170px]">
            <img
              src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-3-2.png&w=750&q=75"
              alt="product-image-2"
            />
          </div>
          <div className="border border-brand-color rounded overflow-hidden cursor-pointer hover:opacity-60 transition-all duration-200 shrink-0 w-20 sm:w-24 md:w-[120px] xl:w-[150px] 2xl:w-[170px]">
            <img
              src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-3-1.png&w=256&q=75"
              alt="product-image-3"
            />
          </div>
        </div>
        {/* image  */}
        <div className="order-1 xl:order-2 flex-grow bg-transparent border border-brand-color h-[320px] 500px:h-[380px] sm:h-[480px] md:h-[500px] lg:h-[580px] w-full overflow-hidden rounded-md">
          <img
            // fetchpriority="high"
            src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-3-2.png&w=750&q=75"
            className="h-full mx-auto"
            alt=""
          />
        </div>
        {/* swipper code start here */}
        {/* <div class="swiper product-image-swipper">
<div class="swiper-wrapper">
  <div class="swiper-slide">
    <img
      fetchpriority="high"
      src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-3-3.png&w=750&q=75"
      class="w-full h-full"
      alt=""
    />
  </div>

  <div class="swiper-slide">
    <img
      fetchpriority="high"
      src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-3-2.png&w=750&q=75"
      class="w-full h-full"
      alt=""
    />
  </div>

  <div class="swiper-slide">
    <img
      fetchpriority="high"
      src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-3-3.png&w=750&q=75"
      class="w-full h-full"
      alt=""
    />
  </div>
</div>


<div class="swiper-button-prev"></div>
<div class="swiper-button-next"></div>
    </div> */}
        {/* swipper code end here */}
      </div>
    </div>
  );
};

export default ImageCarousel;
