"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CartProduct } from "@/redux/features/cart/types";
import { handleQuantity, removeToCart } from "@/redux/features/cart/slice";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { PiTrash } from "react-icons/pi";

const CartContainer = ({
  shippingCost,
}: {
  shippingCost: number;
}): React.ReactNode => {
  const dispatch = useAppDispatch();
  const { cartProducts } = useAppSelector((state) => state.cart);

  const cartProductQuantityHandler = ({
    id,
    oparationType,
  }: {
    id: number;
    oparationType: string;
  }): void => {
    const alreadyAdded = cartProducts.find((product) => product.id === id);
    if (
      oparationType === "plus" &&
      alreadyAdded?.quantity === alreadyAdded?.stock
    ) {
      toast.error("Insufficient stock!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else if (oparationType === "minus" && alreadyAdded?.quantity === 1) {
      return;
    }
    dispatch(handleQuantity({ id, oparationType, counter: 1 }));
  };

  const deleteProduct = (product: CartProduct): void => {
    dispatch(removeToCart(product.id));
    toast.success(`${product.quantity} ${product.name} deleted`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const calculateSingleProductTotalPrice = ({
    price,
    quantity,
  }: {
    price: number;
    quantity: number;
  }): number => {
    let totalPrice = price * quantity;
    return parseFloat(totalPrice.toFixed(2));
  };

  let subtotal = cartProducts.reduce((total, product) => {
    let value = product.quantity * product.price;
    return value + total;
  }, 0);

  const totalPriceWithShippingCost = subtotal + shippingCost;

  return (
    <div
      className="md:w-full lg:w-2/5 lg:ml-8 xl:ml-14 
    mb-6 lg:mb-0 flex flex-col h-full  lg:sticky top-28 md:order-1 lg:order-2"
    >
      <div className="border p-4 sm:p-5 xl:px-8 xl:py-8 rounded-lg bg-white order-1 sm:order-2">
        <h2 className="font-bold text-lg font-inter pb-4 text-gray-700">
          Order Summary
        </h2>

        {cartProducts.length > 0 ? (
          <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
            {cartProducts.map((product) => (
              <div
                key={product.id}
                className="group w-full h-auto cursor-pointer flex justify-start items-center bg-white py-3 px-4 border-b hover:bg-gray-50 transition-all border-gray-100 relative last:border-b-0"
              >
                <div className="relative flex rounded-full border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 cursor-pointer mr-4 w-12 h-12 sm:h-14 sm:w-14 lg:w-10 lg:h-10 xl:h-14 xl:w-14">
                  <Image
                    fill
                    src={`http://127.0.0.1:1337${product.imageUrl}`}
                    alt="Images"
                    sizes="56px"
                  />
                </div>

                <div className="flex flex-col w-full overflow-hidden">
                  <div className="">
                    <Link
                      className="text-md w-full font-medium text-gray-700 text-heading line-clamp-1"
                      href={`/${product.slug}`}
                    >
                      {product.name.substring(0, 36)}.
                    </Link>
                  </div>
                  <span className="text-sm font-normal text-emerald-700 mb-1">
                    Item Price: {product.price}
                  </span>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm md:text-base text-heading leading-5">
                      <span className="font-inter">
                        $
                        {calculateSingleProductTotalPrice({
                          price: product.price,
                          quantity: product.quantity,
                        })}
                      </span>
                    </div>
                    {/* counter */}
                    <div className="flex justify-center items-center space-x-3">
                      <button
                        onClick={() =>
                          cartProductQuantityHandler({
                            id: product.id,
                            oparationType: "plus",
                          })
                        }
                        className="h-5 w-5 500px:h-6 500px:w-6 rounded cursor-pointer border border-gray-200 drop-shadow text-sm font-medium flex justify-center items-center hover:bg-[#02B290] hover:text-white transition-all duration-200 ease-in-out"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                      </button>
                      <span className="text-md font-bold font-inter">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() =>
                          cartProductQuantityHandler({
                            id: product.id,
                            oparationType: "minus",
                          })
                        }
                        className="h-5 w-5 500px:h-6 500px:w-6 rounded cursor-pointer border border-gray-200 drop-shadow text-sm font-medium flex justify-center items-center hover:bg-[#02B290] hover:text-white transition-all duration-200 ease-in-out"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <button
                      className="p-1 bg-gray-100 rounded"
                      onClick={() => deleteProduct(product)}
                    >
                      <PiTrash className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-8 w-8 sm:w-10 md:h-10 my-2 text-emerald-500 mx-auto"
            >
              <path
                fillRule="evenodd"
                d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-base mx-auto w-fit">Your cart is empty!</p>
          </div>
        )}

        <div className="flex items-center pt-6 pb-2 text-base w-full font-semibold text-gray-500">
          <span>Subtotal</span>
          <span className="ml-auto flex-shrink-0 text-gray-500 font-bold">
            ${parseFloat(subtotal.toFixed(2))}
          </span>
        </div>

        <div className="flex items-center text-base w-full font-semibold text-gray-500">
          <span>Shipping Cost</span>
          <span className="ml-auto flex-shrink-0 text-gray-500 font-bold">
            ${shippingCost}
          </span>
        </div>
        <div className="border-t mt-3 font-inter">
          <div className="flex items-center font-bold justify-between pt-3 text-sm uppercase">
            TOTAL COST
            <span className="font-extrabold text-lg">
              ${parseFloat(totalPriceWithShippingCost.toFixed(2))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
