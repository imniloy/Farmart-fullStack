"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { PRIVATE_API_URL } from "@/urls";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {
  return (
    <section className="relative bg-white">
      <div className="section-container my-8">
        {/* our hero bannar sections */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="swiper mySwiper rounded-lg overflow-hidden"
        >
          {/* First */}
          <SwiperSlide className="swiper-slide rounded-lg overflow-hidden">
            {/* background image */}
            <div className="swiper-slide-img relative">
              <Image
                fill
                priority={true}
                className=""
                src={`http://127.0.0.1:1337/uploads/farmart_hero_banner_1_0a19eb13bf.png`}
                alt="farmart_hero_banner_1"
                style={{
                  objectFit: "cover",
                }}
                sizes="100vw, (min-width: 768px) 98vw, (min-width: 1440px) 1200px, (min-width: 1536px) 1240px"
              />
            </div>

            {/* content */}
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] lg:translate-x-0 lg:left-14 2xl:left-20 -translate-y-[50%] w-[96%] 500px:w-[90%] lg:w-[80%] 500px:space-y-4 xl:space-y-6 xl:w-[55%] text-center lg:text-left">
              <h1 className="capitalize mb-5 500px:mb-0 font-inter font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight 2xl:text-[52px] 2xl:leading-[64px] text-color-black">
                The Best Quality Fresh Fruits Guaranteed!
              </h1>
              <p className="mb-4 500px:mb-0 text-gray-600">
                We source and sell the very best Mangoes, Bananas, Apples, and
                other fruits, sourced with the greatest care from the farmer.
              </p>
              <Link href="" className="inline-block">
                <button className="py-2 px-4 500px:py-3 500px:px-6 text-base rounded-md bg-brand-color text-white capitalize">
                  Shop Now
                </button>
              </Link>
            </div>
          </SwiperSlide>
          {/* second */}
          <SwiperSlide className="swiper-slide relative rounded-lg overflow-hidden">
            {/* background image */}
            <div className="swiper-slide-img relative">
              <Image
                fill
                priority={true}
                className=""
                src={`http://127.0.0.1:1337/uploads/farmart_hero_banner_2_9b7a16250d.png`}
                alt="farmart_hero_banner_1"
                style={{
                  objectFit: "cover",
                }}
                sizes="100vw, (min-width: 768px) 98vw, (min-width: 1440px) 1200px, (min-width: 1536px) 1240px"
              />
            </div>
            {/* content */}
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] lg:translate-x-0 lg:left-14 2xl:left-20 -translate-y-[50%] w-[96%] 500px:w-[90%] lg:w-[80%] 500px:space-y-4 xl:space-y-6 xl:w-[55%] text-center lg:text-left">
              <h1 className="capitalize mb-5 500px:mb-0 font-inter font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight 2xl:text-[52px] 2xl:leading-[64px] text-color-black">
                Don’t miss amazing deals on grocery Products.
              </h1>
              <p className="mb-4 500px:mb-0 text-gray-600">
                Save up to 50% with Farmmar. We source and sell the very best
                grocery products and Healthy vegetable that you deserve to eat
                fresh.
              </p>
              <Link href="" className="inline-block">
                <button className="py-2 px-4 500px:py-3 500px:px-6 text-base rounded-md bg-brand-color text-white capitalize">
                  Shop Now
                </button>
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* <!-- static highlight section --> */}
        <div className="px-14 py-6 mt-6 hidden lg:flex items-center justify-between rounded-lg bg-orange-100">
          <div className="">
            <h1 className="text-xl">
              <span className="text-brand-color font-bold">
                100% Natural Quality
              </span>
              {/*   */}
              <span className=""> Organic Porduct</span>
            </h1>
            <p className="text-gray-600">
              See Our latest discounted products from here and get a special
              <span className="font-semibold text-brand-color ml-2">
                Discounted Products
              </span>
            </p>
          </div>
          <Link href="">
            <button className="bg-brand-color px-4 py-2 rounded-[20px] text-white font-semibold">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
