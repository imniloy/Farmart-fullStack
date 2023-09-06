"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Category } from "@/types/Categories";
import { Dialog, Transition } from "@headlessui/react";
import { setIsCategoryOpen } from "@/redux/features/uiSlider/slices";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const MobileCategoriesSideBar = ({
  categories,
}: {
  categories: Category[];
}): React.ReactElement => {
  const isOpen = useAppSelector((state) => state.mobileSlider.isCategoryOpen);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoriesToShow: string | null = searchParams.get("category");
  const searchQueryExits: boolean = searchParams.has("query");
  const searchQuery: string | null = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    []
  );

  function closeModal() {
    dispatch(setIsCategoryOpen(!isOpen));
  }

  const handleSelectedCategoris = (name: string): void => {
    let url: string;
    // checking whether this name already exists in the selectedCategories state or not...
    const indexToDelecte = selectedCategories.findIndex(
      (category: string) => category === name.toLowerCase()
    );

    // checking have any seach query parameters...
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100] min-h-screen"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 min-h-screen z-[1] block lg:hidden" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto bg-transparent z-[100] block lg:hidden">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel
              autoFocus
              className="w-full min-h-screen max-w-xs sm:max-w-[480px] transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all"
            >
              <div className="flex items-center px-4 py-6 sm:pt-8 sm:pb-6">
                {/* icon */}
                <div className="w-fit cursor-pointer" onClick={closeModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </div>

                <p className="w-fit mx-auto text-lg font-semibold text-color-black">
                  Categories
                </p>
              </div>
              <ul className="w-full bg-white px-4 pb-8">
                {categories.map((category) => (
                  <li
                    onClick={() =>
                      handleSelectedCategoris(
                        category.attributes.slug.toLocaleLowerCase()
                      )
                    }
                    key={category?.id}
                    className={`flex justify-between items-center 
                    ${
                      selectedCategories.includes(
                        category.attributes.slug.toLocaleLowerCase()
                      )
                        ? "bg-[#e6eff8] border-gray-300 border-t"
                        : "hover:bg-[#e6eff8] bg-white border-gray-200 border-t"
                    } 
                     group cursor-pointer p-4 border-x border-b-0 last:border-b border-t border-gray-200 transition-all duration-300 ease-in-out w-full`}
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
                      <span className="font-inter text-sm sm:text-md font-medium truncate w-[165px]">
                        {category.attributes.name}
                      </span>
                    </div>
                    {/* group-hover:bg-brand-color */}
                    <span
                      className={`w-6 h-6 flex items-center justify-center border-[2px] rounded-full ltr:ml-auto rtl:mr-auto transition-all duration-300 ease-in-out group-hover:border-[#FFB531] 
                      ${
                        selectedCategories?.includes(
                          category.attributes.slug.toLocaleLowerCase()
                        )
                          ? "bg-[#FFB531] border-[#FFB531]"
                          : "bg-white border-gray-300"
                      }
                      `}
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MobileCategoriesSideBar;
