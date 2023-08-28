"use client";
import { Category } from "@/types/Categories";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CategoriesSidebar = ({
  categories,
}: {
  categories: Category[];
}): React.ReactNode => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoriesToShow: string | null = searchParams.get("category");
  const searchQueryExits: boolean = searchParams.has("query");
  const searchQuery: string | null = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    []
  );

  const handleSelectedCategoris = (name: string): void => {
    let url: string;
    const indexToDelecte = selectedCategories.findIndex(
      (category: string) => category === name.toLowerCase()
    );
    
    if (searchQueryExits) {
      if (selectedCategories.length > 0) {
        if (indexToDelecte !== -1) {
          const filteredCategories = [...selectedCategories];
          filteredCategories.splice(indexToDelecte, 1);

          filteredCategories.length > 0
            ? router.replace(
                `/products?query=${searchQuery}&category=${filteredCategories.join()}`
              )
            : router.replace(`/products?query=${searchQuery}`);
        } else {
          const filteredCategories = [...selectedCategories, name];

          router.replace(
            `/products?query=${searchQuery}&category=${filteredCategories.join()}`
          );
        }
      } else {
        router.replace(`/products?query=${searchQuery}&category=${name}`);
      }
    } else {
      if (selectedCategories.length > 0) {
        if (indexToDelecte !== -1) {
          const filteredCategories = [...selectedCategories];
          filteredCategories.splice(indexToDelecte, 1);

          filteredCategories.length > 0
            ? router.replace(`/products?category=${filteredCategories.join()}`)
            : router.replace(`/products`);
        } else {
          const filteredCategories = [...selectedCategories, name];

          router.replace(`/products?category=${filteredCategories.join()}`);
        }
      } else {
        router.replace(`/products?category=${name}`);
      }
    }
  };

  // this useEffect will run when our category query[url] will change...
  // here I define categoriesToShow variable to get the category options string..
  useEffect(() => {
    if (categoriesToShow) {
      setSelectedCategories(categoriesToShow.toLowerCase().split(","));
    } else {
      setSelectedCategories([]);
    }
  }, [categoriesToShow]);

  return (
    <div className="hidden w-full lg:block lg:max-w-[300px] overflow-hidden">
      <div className="h-10 mb-4 flex items-center">
        <p className="font-semibold capitalize text-lg text-color-black">
          Categories
        </p>
      </div>
      <ul className="w-full bg-white">
        {categories.map((category) => (
          <li
            onClick={() =>
              handleSelectedCategoris(
                category.attributes.slug.toLocaleLowerCase()
              )
            }
            key={category?.id}
            className="flex justify-between items-center group cursor-pointer py-3 px-4 border-gray-200 border-t border-x border-b-0 last:border-b first:rounded-t-md last:rounded-b-md hover:bg-[#e6eff8] transition-all duration-300 ease-in-out w-full"
          >
            <div className="flex items-center space-x-3">
              <div className="relative h-[40px] w-[40px] rounded-lg overflow-hidden">
                <Image
                  src={`http://127.0.0.1:1337${category.attributes.image.data.attributes.url}`}
                  fill
                  alt={category.attributes.image.data.attributes.name}
                  className=""
                  sizes="48px"
                />
              </div>
              <span className="font-inter text-sm font-medium truncate w-[165px]">
                {category.attributes.name}
              </span>
            </div>
            {/* group-hover:bg-brand-color */}
            <span
              className={`w-6 h-6 flex items-center justify-center border-[2px] rounded-full ltr:ml-auto rtl:mr-auto transition-all duration-300 ease-in-out group-hover:border-[#FFB531] ${
                selectedCategories?.includes(
                  category.attributes.slug.toLocaleLowerCase()
                )
                  ? "bg-[#FFB531] border-[#FFB531]"
                  : "bg-white border-gray-300"
              }`}
            >
              <svg
                stroke="#FFF"
                fill="#FFF"
                strokeWidth={0}
                viewBox="0 0 512 512"
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
              </svg>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesSidebar;
