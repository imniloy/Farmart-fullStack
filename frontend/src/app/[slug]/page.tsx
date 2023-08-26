import BreadCum from "@/components/ProductDetails/BreadCum";
import Button from "@/components/ProductDetails/Button";
import ImageCarousel from "@/components/ProductDetails/ImageCarousel";
import { getProductDetails, getRelatedProducts } from "@/services/product";
import { Category } from "@/types/Categories";
import { product } from "@/types/products";
import React from "react";

type Params = {
  slug: string;
};

const page = async ({ params }: { params: Params }) => {
  const { slug } = params;
  let reletedProducts;
  const { success, data }: { success: boolean; data: product[] } =
    await getProductDetails(slug);

  if (success && data.length > 0) {
    const categoryId = data[0].attributes?.category.data.id;
    const {
      success: FetchRelatedProductSuccess,
      data: relatedProducts,
    }: { success: boolean; data: product[] } = await getRelatedProducts(
      categoryId
    );
  }

  return (
    <div className="bg-white">
      <section className="section-container">
        {/* Breadcrumbs  */}
        <BreadCum />
        {/* <!-- product details and image --> */}
        <div className="mb-8 lg:mb-10">
          <div className="grid gap-y-8 lg:gap-x-4 xl:gap-x-6 lg:grid-cols-12 mb-8 lg:mb-12 xl:mb-20">
            {/* image carosul or selector */}
            <ImageCarousel />

            {/* details info */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="title&stock-info space-y-2">
                <h1 className="text-lg md:text-xl xl:text-2xl font-inter font-semibold transition-colors duration-300 text-color-black leading-tight">
                  MSI Optix G241V E2 24" FHD FreeSync IPS Esports Gaming Monitor
                </h1>
                <h4 className="inline-block px-3 py-1 text-sm rounded-sm bg-emerald-100 text-emerald-500 font-bold">
                  Stock: <span className="text-red-500">450</span>
                </h4>
              </div>
              <h3 className="font-semibold text-color-black font-inter text-lg mt-4 500px:mt-6 md:text-xl">
                Price: $800
              </h3>

              <Button />

              {/* tags */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ltr:mr-2 rtl:ml-2 text-color-black"
                    >
                      <path
                        d="M17.125 1H12.3677C11.4662 1 10.6188 1.351 9.98123 1.98849L1.63974 10.33C1.22725 10.7425 1 11.2908 1 11.8765C1 12.4593 1.22725 13.0075 1.63974 13.42L6.58 18.3603C6.99249 18.7728 7.54075 19 8.12649 19C8.70924 19 9.2575 18.7728 9.66999 18.3603L18.0115 10.0188C18.649 9.38125 19 8.53374 19 7.63226V2.87499C19 1.8415 18.1585 1 17.125 1ZM18.25 7.63226C18.25 8.33352 17.977 8.99277 17.482 9.48777L9.13976 17.83C8.6005 18.3693 7.65476 18.373 7.111 17.83L2.17 12.889C1.89926 12.619 1.74999 12.259 1.74999 11.8735C1.74999 11.491 1.89923 11.131 2.17 10.8603L10.5115 2.51875C11.008 2.02301 11.6665 1.74999 12.3677 1.74999H17.125C17.7452 1.74999 18.25 2.25473 18.25 2.87499V7.63226H18.25Z"
                        fill="#999999"
                        stroke="#999999"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M14.8749 3.25C13.8414 3.25 12.9999 4.0915 12.9999 5.12499C12.9999 6.15848 13.8414 6.99998 14.8749 6.99998C15.9084 6.99998 16.7499 6.15851 16.7499 5.12499C16.7499 4.0915 15.9084 3.25 14.8749 3.25ZM14.8749 6.24999C14.2546 6.24999 13.7499 5.74525 13.7499 5.12499C13.7499 4.50473 14.2546 3.99999 14.8749 3.99999C15.4952 3.99999 15.9999 4.50473 15.9999 5.12499C15.9999 5.74525 15.4951 6.24999 14.8749 6.24999Z"
                        fill="#999999"
                        stroke="#999999"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </div>
                  <p className="font-semibold font-inter">Category:</p>
                </div>
                <div className="flex flex-wrap space-x-[2px] lg:space-x-1 space-y-[2px] lg:space-y-1">
                  <div className="block font-medium text-13px md:text-sm rounded hover:bg-emerald-100 border border-sink-base px-2 py-1 transition-all duration-300 cursor-pointer">
                    Fresh food
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="font-normal space-y-2">
            <div className="space-y-2 mb-4">
              <h3 className="text-color-black font-bold text-xl capitalize font-inter">
                Products Details
              </h3>
              <hr />
            </div>
            <p className="font-normal text-gray-700 font-inter">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              alias, similique magnam in corrupti facere? Neque non at nostrum
              nisi aliquid necessitatibus repellat exercitationem dolores,
              sapiente quia magni commodi expedita.Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Numquam alias, similique magnam in
              corrupti facere? Neque non at nostrum nisi aliquid necessitatibus
              repellat exercitationem dolores, sapiente quia magni commodi
              expedita.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Numquam alias, similique magnam in corrupti facere? Neque non at
              nostrum nisi aliquid necessitatibus repellat exercitationem
              dolores, sapiente quia magni commodi expedita.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;