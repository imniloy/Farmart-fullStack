import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getAllCategories } from "@/services/category";
import { Categories, Category } from "@/types/Categories";
import { PRIVATE_API_URL } from "@/urls";

const Categories = async () => {
  const categoriesData: Categories = await getAllCategories();
  const { data: categories, success }: { data: Category[]; success: boolean } =
    categoriesData;

  return (
    <section className="bg-gray-100 lg:py-16 py-10">
      <div className="section-container">
        <div className="mx-auto text-center w-full lg:w-2/5 mb-5 500px:mb-8 lg:mb-10 2xl:mb-12">
          <h1 className="text-xl lg:text-2xl mb-2 font-inter font-extrabold text-color-black">
            Featured Categories
          </h1>
          <p className="text-base text-gray-600 leading-6">
            Choose your necessary products from this feature categories.
          </p>
        </div>

        <ul className="grid grid-cols-2 500px:grid-cols-4 xl:grid-cols-6 gap-2">
          {categories?.map(
            ({ id, attributes }): React.ReactElement => (
              <li className="bg-white group rounded-md" key={id}>
                <Link
                  href={`/products?category=${attributes.slug}`}
                  className="p-2 500px:p-3 lg:p-4 2xl:p-5 w-full h-full flex flex-col items-center justify-center space-y-[2px]"
                >
                  <div className="relative mb-[2px] h-[60px] w-[60px] md:h-[100px] md:w-[100px] lg:h-[120px] lg:w-[120px] overflow-hidden">
                    <Image
                      src={`${PRIVATE_API_URL}${attributes.image.data.attributes.url}`}
                      alt={`not-found-img`}
                      fill
                      sizes="60px (min-width: 768px) 100px (min-width: 1024px) 120px"
                      className="group-hover:scale-105 transition-all duration-200"
                    />
                  </div>
                  <p className="font-semibold text-xs md:text-sm text-center text-gray-600">
                    {attributes.name}
                  </p>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
