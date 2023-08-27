"use client";
import { Category } from "@/types/Categories";
import { attributes } from "@/types/products";
import Image from "next/image";
import React, { useState } from "react";

const CategoriesSidebar = ({
  categories,
}: {
  categories: Category[];
}): React.ReactNode => {
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    []
  );

  const handleSelectedCategoris = (name: string): void => {
    let currentCategories = [...selectedCategories];
    let check = currentCategories.includes(name);
    if (check) {
      let store = currentCategories.filter(
        (catgoryName: string): boolean => catgoryName !== name
      );

      setSelectedCategories(store);
    } else {
      setSelectedCategories([...selectedCategories, name]);
    }
  };

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
            onClick={() => handleSelectedCategoris(category.attributes.name)}
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
                selectedCategories?.includes(category.attributes.name)
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

// {
//   /* second */
// }
// {
//   /* <li className="flex justify-between items-center group cursor-pointer py-3 px-4 border-gray-200 border-t border-x border-b-0 last:border-b first:rounded-t-md last:rounded-b-md hover:bg-[#e6eff8] transition-all duration-300 ease-in-out w-full">
//           <div className="flex items-center space-x-3">
//             <img
//               src="https://chaldn.com/_mpimage/dog-food?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D28784&q=low&v=1&m=400&webp=1"
//               alt=""
//               className="h-[40px] w-[40px]"
//             />
//             <span className="font-inter text-sm font-normal truncate w-[165px]">
//               Laundry &amp; Household
//             </span>
//           </div>
//           {/* group-hover:bg-brand-color */
// }
// <span className="w-6 h-6 flex items-center justify-center border-[2px] border-gray-300 rounded-full ltr:ml-auto rtl:mr-auto transition-all duration-300 ease-in-out group-hover:border-brand-color">
//   {/* <svg
//     stroke="currentColor"
//     fill="currentColor"
//     stroke-width="0"
//     viewBox="0 0 512 512"
//     class="text-white bg-transparent w-4 h-4"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
//     ></path>
//   </svg> */}
// </span>;
// {
//   /* </li> */
// }
