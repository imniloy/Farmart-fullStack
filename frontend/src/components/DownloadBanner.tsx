import React from "react";
import Link from "next/link";
import Image from "next/image";

const DownloadBanner = () => {
  return (
    <section className="lg:py-16 py-10 bg-indigo-50 bg-center overflow-hidden">
      <div className="section-container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 items-center md:px-10 lg:px-0">
        {/* <!-- left section --> */}
        <div className="h-[300px] xl:h-[350px] 2xl:h-[380px] hidden md:flex relative">
          <Image
            src={
              "http://127.0.0.1:1337/uploads/app_download_img_left_4b9ec8aec8.webp"
            }
            fill={true}
            sizes="(min-width: 768px) 48vw, (min-width: 1024px) 32vw"
            quality={100}
            priority={true}
            style={{
              objectFit: "contain",
            }}
            alt="app_download_img_left"
          />
        </div>

        {/* <!-- middle section --> */}
        <div className="text-center flex-grow px-2 sm:px-4 overflow-hidden md:px-0">
          <h3 className="text-xl font-inter md:text-2xl lg:text-3xl font-bold capitalize">
            Make your online shop easier with our mobile app
          </h3>
          <p className="text-base opacity-90 leading-7 mt-2 mb-6 xl:mt-4 xl:mb-8">
            There are many products you will find our shop, Choose your daily
            necessary product from our Farmart Grocery store and get some
            special offer.
          </p>

          <div className="flex mx-auto w-fit items-center space-x-2">
            <Link
              href="https://www.apple.com/app-store/"
              target="_blank"
              className="inline-block"
            >
              <div className="h-[60px] lg:h-[60px] w-[140px] lg:w-[160px] xl:w-[180px] relative">
                <Image
                  fill
                  quality={100}
                  loading="lazy"
                  src={`http://127.0.0.1:1337/uploads/app_store_logo_9414ec13fe.webp`}
                  alt="app-store.svg"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            </Link>

            <Link
              href="https://play.google.com/store/apps"
              target="_blank"
              className="inline-block"
            >
              <div className="h-[60px] lg:h-[60px] w-[140px] lg:w-[160px] xl:w-[180px] relative">
                <Image
                  fill
                  quality={100}
                  loading="lazy"
                  style={{
                    objectFit: "contain",
                  }}
                  src={`http://127.0.0.1:1337/uploads/google_play_store_9ab84d6c66.png`}
                  alt="google_play_store"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* <!-- right section --> */}
        <div className="lg:h-[300px] xl:h-[350px] 2xl:h-[380px] hidden lg:flex relative">
          <Image
            src="http://127.0.0.1:1337/uploads/app_download_img_right_372bb50514.webp"
            fill={true}
            sizes="(min-width: 1024px) 31vw"
            quality={100}
            priority={true}
            style={{
              objectFit: "contain",
            }}
            alt="app_download_img_right"
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadBanner;
