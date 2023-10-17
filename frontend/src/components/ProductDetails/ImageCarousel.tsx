"use client";
import Image from "next/image";
import React, { useState } from "react";

const ImageCarousel = ({
  thumbnail,
  images,
}: {
  thumbnail: any;
  images: any;
}): React.ReactNode => {
  const [showImage, setShowImage] = useState<string>("");

  return (
    <div className="lg:col-span-6 xl:col-span-7">
      <div className="w-full space-x-0 xl:space-x-3 flex flex-col xl:flex-row">
        {/* image chooser */}
        <div className="product-thumb-swipper">
          {/* thubnail image */}
          <div
            className={`relative border ${
              showImage === thumbnail.attributes.url || showImage === ""
                ? "border-brand-color"
                : "border-gray-200"
            } rounded overflow-hidden cursor-pointer hover:opacity-70 transition-all duration-200 shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-[120px] md:h-[120px] xl:w-[150px] xl:h-[150px] 2xl:w-[170px]`}
            onClick={() => setShowImage(thumbnail.attributes.url)}
          >
            <Image
              src={`http://127.0.0.1:1337${thumbnail.attributes.url}`}
              alt="{thumbnail.attributes.name}"
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="90px, (min-width: 640px) 100px, (min-width: 786px) 130px, (min-width: 1280px) 160px, (min-width: 1536px) 170px"
            />
          </div>

          {images &&
            images.length > 0 &&
            images.map((image: any) => (
              <div
                key={image.id}
                className={`relative border ${
                  showImage === image.attributes.url
                    ? "border-brand-color"
                    : "border-gray-200"
                } rounded overflow-hidden cursor-pointer hover:opacity-70 transition-all duration-200 shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-[120px] md:h-[120px] xl:w-[150px] xl:h-[150px] 2xl:w-[170px]`}
                onClick={() => setShowImage(image.attributes.url)}
              >
                <Image
                  src={`http://127.0.0.1:1337${image.attributes.url}`}
                  alt="{image.attributes.name}"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  sizes="90px, (min-width: 640px) 100px, (min-width: 786px) 130px, (min-width: 1280px) 160px, (min-width: 1536px) 170px"
                />
              </div>
            ))}
        </div>
        {/* image  */}
        <div className="relative order-1 xl:order-2 flex-grow bg-transparent border border-brand-color h-[320px] 500px:h-[380px] sm:h-[480px] md:h-[500px] lg:h-[580px] w-full overflow-hidden rounded-md">
          <Image
            src={
              showImage
                ? `http://127.0.0.1:1337${showImage}`
                : `http://127.0.0.1:1337${thumbnail.attributes.url}`
            }
            fill
            style={{
              objectFit: "contain",
            }}
            className="h-full mx-auto"
            alt={`${thumbnail.attributes.name}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
