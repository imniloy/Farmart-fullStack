"use client";
import CartContainer from "@/components/checkout/CartContainer";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ProductsData } from "@/types/products";
import { payloadType } from "@/types/checkoutProducts";
import ScaleLoader from "react-spinners/ScaleLoader";

const Page = (): React.ReactNode => {
  const { cartProducts } = useAppSelector((state) => state.cart);
  console.log(cartProducts);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    country: "",
    zipCode: "",
    shippingMedium: "",
    shippingCost: 0,
    paymentMethod: "",
    deliveryIn: "",
  });

  const inputTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // const handlePayment...
  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    if (
      state.paymentMethod === "" ||
      state.shippingMedium === "" ||
      state.paymentMethod === ""
    ) {
      toast.error("Fill up the form to checkout!", {
        position: "top-right",
      });
      return;
    }

    if (cartProducts.length == 0) return;

    const paymentID: string = crypto.randomUUID();
    const products = cartProducts;
    const shipping_address = {
      street: state.streetAddress,
      city: state.city,
      country: state.country,
      zipCode: state.zipCode,
    };
    const user_personal_details = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phoneNumber: state.phoneNumber,
    };
    const payload: payloadType = {
      paymentID,
      products,
      status: "pending",
      method: state.paymentMethod,
      user_personal_details,
      shipping_address,
      shipping_method_and_cost: {
        shippingCost: state.shippingCost,
        shippingMedium: state.shippingMedium,
        deliveryIn: state.deliveryIn,
      },
    };

    try {
      setLoading(true);
      let url = "";
      cartProducts.forEach((product) => {
        url = url + `&filters[id][$eqi]=${product.id}`;
      });

      // fetch all products that this user added to his cart list to checkout ...
      // so that we can check this product current status...
      const userSelectedProducts = await fetch(
        `/api/order/products?populate=category${url}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const getAllSelectedProducts: Partial<ProductsData> =
        await userSelectedProducts.json();

      // if successful to fetch all selected products...
      if (getAllSelectedProducts.success) {
        // distracture getAllSelectedProducts value...
        const { data: cartSelectedProducts } = getAllSelectedProducts;
        // If any products stock is less than the quantity that the user selected we will store that product to this veriable based on this veriable status we will perform some actions in future...
        let insufficientStockProduct: any = {};
        // we need the quantity to update products stock status so we make this array...
        const updatedProductsArray: Array<{ id: number; stock: string }> = [];

        cartSelectedProducts &&
          cartSelectedProducts?.length > 0 &&
          cartSelectedProducts.forEach((dataItem) => {
            cartProducts.forEach((cartItem) => {
              if (dataItem.id === cartItem.id) {
                if (
                  Number(dataItem.attributes.stock) < Number(cartItem.quantity)
                ) {
                  insufficientStockProduct = cartItem;
                  toast.error(`${cartItem.name} Insufficient stock`, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    pauseOnFocusLoss: true,
                    draggable: true,
                    theme: "light",
                  });
                  return;
                }
                const updatedStock =
                  Number(dataItem.attributes.stock) - Number(cartItem.quantity);
                updatedProductsArray.push({
                  id: cartItem.id,
                  stock: `${updatedStock}`,
                });
              }
            });
          });
        // if any product quantity is less than the current user selected quantity against this perticular quantity we will break this checkout function...
        if (insufficientStockProduct.id) return;
        // if everything is ok then checkout the order
        const response = await fetch(`/api/order/checkout`, {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify(payload),
        });

        const checkoutedProducts = await response.json();
        // if checkout is successful then update the product in out products list api...
        if (checkoutedProducts.status === 200) {
          const response = await fetch(`/api/order/products`, {
            method: "PUT",
            cache: "no-store",
            body: JSON.stringify(updatedProductsArray),
          });
          const { success, error } = await response.json();
          if (!success) {
            toast.error(`${error}`, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              pauseOnFocusLoss: true,
              draggable: true,
              theme: "light",
            });
            return;
          } else {
            toast.success(`Order successful. Thank you For being with us!`, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              pauseOnFocusLoss: true,
              draggable: true,
              theme: "light",
            });

            setState({
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              streetAddress: "",
              city: "",
              country: "",
              zipCode: "",
              shippingMedium: "",
              shippingCost: 0,
              paymentMethod: "",
              deliveryIn: "",
            });
            console.log(checkoutedProducts);

            router.push(
              `/order/${checkoutedProducts?.data?.attributes?.paymentID}`
            );
          }
        }
      }
    } catch (error) {
      toast.error(`Order failed! Something wrong Happened`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const userToken = localStorage.getItem("userToken");
  //   const userCookie = Cookies.get("farmart_client_token");
  //   if (!userToken || !userCookie) router.replace("/");
  // }, [router]);

  return (
    <section className="relative bg-[#f9fafb]">
      <div className="section-container">
        <div className="px-2 lg:px-0 py-8 md:py-10 lg:py-12 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col lg:space-y-0 lg:flex-row">
          <form
            onSubmit={handlePayment}
            className="md:w-full lg:w-3/5 flex h-full flex-col order-2 lg:order-1 space-y-8 md:space-y-10 lg:space-y-12"
          >
            {/* personal information */}
            <div className="personal_Information_Form">
              <h2 className="font-semibold text-gray-700 pb-4 text-base">
                01. Personal Details
              </h2>
              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 md:gap-6">
                  <div className="w-full">
                    <label
                      className="block text-gray-500 text-sm leading-none mb-2"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={state.firstName}
                      onChange={inputTextHandler}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                      placeholder="John"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-500 text-sm leading-none mb-2"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      name="lastName"
                      value={state.lastName}
                      onChange={inputTextHandler}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                      placeholder="Duo"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 md:gap-6">
                  <div className="w-full">
                    <label
                      className="block text-gray-500  text-sm leading-none mb-3"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      required
                      value={state.email}
                      onChange={inputTextHandler}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                      placeholder="Johnduo@gmail.com"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-500  text-sm leading-none mb-3"
                      htmlFor="phoneNumber"
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={state.phoneNumber}
                      required
                      onChange={inputTextHandler}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                      placeholder="+880-1300100100"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* shipping address */}
            <div className="shipping_Address_Form">
              <h2 className="font-semibold text-gray-700 pb-4 text-base">
                02. Shipping Details
              </h2>
              <div className="space-y-4 md:space-y-6">
                <div className="w-full">
                  <label
                    className="block text-gray-500 text-sm leading-none mb-2"
                    htmlFor="streetAddress"
                  >
                    Street address
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    required
                    name="streetAddress"
                    value={state.streetAddress}
                    onChange={inputTextHandler}
                    className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                    placeholder="123 Boulevard Rd, Beverley Hills"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-3 lg:grid-rows-1 gap-4 md:gap-6">
                  <div className="w-full">
                    <label
                      className="block text-gray-500  text-sm leading-none mb-3"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      required
                      id="city"
                      name="city"
                      value={state.city}
                      onChange={inputTextHandler}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                      placeholder="Log Angeles"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-500 text-sm leading-none mb-3"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      required
                      name="country"
                      value={state.country}
                      onChange={inputTextHandler}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                      placeholder="United States"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-500  text-sm leading-none mb-3"
                      htmlFor="zipCode"
                    >
                      ZIP / Postal
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      required
                      name="zipCode"
                      value={state.zipCode}
                      onChange={inputTextHandler}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                      placeholder="1202"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <label className="block text-gray-500 font-medium text-sm leading-none mb-2">
                    Shipping Cost
                  </label>

                  <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-4 lg:gap-6">
                    <div
                      className="cursor-pointer p-3 border border-gray-200 bg-white rounded-md flex items-center justify-between"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          shippingMedium: "FedEx",
                          shippingCost: 20,
                          deliveryIn: "7 days",
                        }))
                      }
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 mr-3 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                          />
                        </svg>

                        <div className="text-left">
                          <p className="font-medium text-sm text-gray-600">
                            FedEx
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            Delivery: In 7 Days{" "}
                            <span className="font-medium text-gray-600">
                              Cost :$20.00
                            </span>
                          </p>
                        </div>
                      </div>
                      <div
                        className={`h-4 w-4 border-2 ${
                          state.shippingMedium.toLowerCase() === "fedex"
                            ? "border-[#02b290] bg-[#02b290]"
                            : "border-gray-400"
                        } rounded-full`}
                      ></div>
                    </div>

                    <div
                      className="cursor-pointer p-3 border border-gray-200 bg-white rounded-md flex items-center justify-between"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          shippingMedium: "UPS",
                          shippingCost: 40,
                          deliveryIn: "1 day",
                        }))
                      }
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 mr-3 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                          />
                        </svg>

                        <div className="text-left">
                          <p className="font-medium text-sm text-gray-600">
                            UPS
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            Delivery: Today{" "}
                            <span className="font-medium text-gray-600">
                              Cost :$40.00
                            </span>
                          </p>
                        </div>
                      </div>
                      <div
                        className={`h-4 w-4 border-2 ${
                          state.shippingMedium.toLowerCase() === "ups"
                            ? "border-[#02b290] bg-[#02b290]"
                            : "border-gray-400"
                        } rounded-full`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* payment method */}
            <div className="payment_Method w-full">
              <h2 className="font-semibold text-gray-700 pb-4 text-base">
                03. Payment Method
              </h2>
              <div
                className="cursor-pointer px-4 py-3 border border-gray-200 bg-white rounded-md flex items-center justify-between"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    paymentMethod: "cash",
                  }))
                }
              >
                <div className="flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 text-gray-400"
                  >
                    <path d="M47.5 104H432V51.52a16 16 0 00-19.14-15.69l-368 60.48a16 16 0 00-12 10.47A39.69 39.69 0 0147.5 104zm416 24h-416a16 16 0 00-16 16v288a16 16 0 0016 16h416a16 16 0 0016-16V144a16 16 0 00-16-16zM368 320a32 32 0 1132-32 32 32 0 01-32 32z"></path>
                    <path d="M31.33 259.5V116c0-12.33 5.72-18.48 15.42-20 35.2-5.53 108.58-8.5 108.58-8.5s-8.33 16-27.33 16V128c18.5 0 31.33 23.5 31.33 23.5L84.83 236z"></path>
                  </svg>

                  <p className="font-medium text-sm text-gray-600">
                    Cash On Delivery
                  </p>
                </div>
                <div
                  className={`h-4 w-4 border-2 ${
                    state.paymentMethod.toLowerCase() === "cash"
                      ? "border-[#02b290] bg-[#02b290]"
                      : "border-gray-400"
                  } rounded-full`}
                ></div>
              </div>
            </div>

            {/* options */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 md:gap-6">
              <Link href="/">
                <div className="space-x-3 bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center w-full">
                  <IoReturnUpBackOutline className="h-5 w-5 inline-block" />
                  <span className="">Continue Shopping</span>
                </div>
              </Link>
              <button
                type="submit"
                disabled={cartProducts.length === 0}
                className=" disabled:bg-indigo-50 disabled:text-gray-700 space-x-3 cursor-pointer bg-[#02b290] border rounded py-3 text-center text-sm font-medium text-white transition-all flex justify-center w-full"
              >
                {loading ? (
                  <ScaleLoader
                    loading={loading}
                    color="#fff"
                    height={18}
                    width={5}
                    speedMultiplier={1.5}
                    radius={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <>
                    <span>Confirm Order</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          <CartContainer shippingCost={state.shippingCost} />
        </div>
      </div>
    </section>
  );
};

export default Page;
