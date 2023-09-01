"use client";
import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";

function CartSlider(): React.ReactElement {
  const [isShowing, setIsShowing] = useState(true);
  const closeModal = () => {
    setIsShowing(false);
  };

  return (
    <Transition appear show={isShowing} as={Fragment}>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 min-h-screen z-[1] block" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-x-hidden overflow-y-auto bg-transparent z-[100]">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel
              autoFocus
              className="min-h-screen transform overflow-hidden bg-white text-left shadow-xl transition-all w-[320px] 500px:w-[450px] md:w-[480px] ml-auto"
            >
              <div className="flex items-center w-full p-4 lg:py-5 lg:px-6  border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="text-lg md:text-xl font-medium font-inter text-color-black ">
                    Shopping Cart
                  </p>
                </div>
                <div className="ml-auto w-fit flex items-center space-x-[2px] cursor-pointer hover:text-[#02B290]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                  <p className="text-sm">Close</p>
                </div>
              </div>

              {/* products */}
              <ul className="my-3 px-4 500px:px-6 ">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <li
                      key={i}
                      className="w-full py-2 group cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2 500px:space-x-4">
                        <div className="relative h-16 w-16 500px:h-20 500px:w-20 md:h-24 md:w-24 rounded-lg bg-black overflow-hidden">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="transition-all duration-200 w-0 h-0 group-hover:w-6 group-hover:h-6 text-white absolute top-1/2 left-[50%] -translate-x-[50%] -translate-y-[50%] z-10"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <Image
                            className="group-hover:opacity-70"
                            src={`https://images.pexels.com/photos/11213759/pexels-photo-11213759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                            alt=""
                            fill
                            sizes="90px"
                          />
                        </div>
                        <div className="">
                          <p className="w-[160px] 500px:w-[200px] md:w-[240px] truncate hover:text-[#02B290] transition-all font-thin text-sm sm:text-base">
                            Organic Girl Lettuce
                          </p>
                          <div className="text-xs sm:text-[13px] w-[150px] truncate sm:text-xs text-[#595959] my-1 500px:mb-2 500px:mt-1.5 font-inter">
                            1 Bag X 3
                          </div>
                          <div className="flex items-center space-x-2 500px:space-x-4 w-fit">
                            <div className="h-5 w-5 500px:h-6 500px:w-6 rounded border border-gray-200 drop-shadow text-sm font-medium flex justify-center items-center hover:bg-[#02B290] hover:text-white transition-all duration-200 ease-in-out">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4 500px:w-5 500px:h-5"
                              >
                                <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
                              </svg>
                            </div>
                            <div className="font-semibold text-sm">1</div>
                            <div className="h-6 w-6 rounded border border-gray-200 drop-shadow text-sm font-medium flex justify-center items-center hover:bg-[#02B290] hover:text-white transition-all duration-200 ease-in-out">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="font-medium font-inter text-base text-gray-700]">
                        $5.50
                      </p>
                    </li>
                  ))}
              </ul>

              <div className="mt-4 500px:mt-8 mb-4 p-4 500px:p-6 border-t border-gray-200">
                <div className="flex justify-between">
                  <p className="font-medium text-lg text-color-black">
                    Subtotal:{" "}
                  </p>
                  <span className="font-semibold font-inter text-base text-color-black">
                    $1250
                  </span>
                </div>
                <p className="text-sm text-gray-500 my-2">
                  Final price and discounts will be determined at the time of
                  payment processing.
                </p>

                <div className="w-full mt-6 cursor-pointer p-4 bg-[#02B290] text-white font-semibold text-sm text-center rounded">
                  Proceed To Checkout
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default CartSlider;
