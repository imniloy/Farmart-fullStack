import LeftSidebar from "@/components/userAccount/LeftSidebar";
import { PUBLIC_API_URL } from "@/urls";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import moment from "moment/moment";
import {
  orderAttributes,
  orderObjectType,
  ordersDataType,
} from "@/types/ordersData";
import { MetaType } from "@/types/pagination";
import { CartProduct } from "@/redux/features/cart/types";
import NotFoundComp from "@/components/notFound";
import CustomError from "@/components/notFound/CustomError";
import Pagination from "@/components/Pagination";
import { BsFillCartXFill } from "react-icons/bs";

// export const runtime = "edge";

const Page = async ({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { userId } = params;
  const { orders: orderParams, page } = searchParams || {};
  let offset: number = 0;
  let limit: number = 15;
  let searchUrl: string = `?userId=${userId}&orders=all&offset=${offset}&limit=${limit}`;
  let pageContent: React.ReactNode;
  let ordersContent: React.ReactNode;

  switch (orderParams) {
    case "":
      searchUrl = `?userId=${userId}&orders=all&offset=${offset}&limit=${limit}`;
      break;
    case "pending":
      searchUrl = `?userId=${userId}&orders=pending&offset=${offset}&limit=${limit}`;
      break;
    case "complete":
      searchUrl = `?userId=${userId}&orders=complete&offset=${offset}&limit=${limit}`;
      break;
    case "processing":
      searchUrl = `?userId=${userId}&orders=processing&offset=${offset}&limit=${limit}`;
      break;
    default:
      break;
  }

  // work left...
  if (page) {
    offset = (Number(page) - 1) * limit;
    if (orderParams) {
      searchUrl = `?userId=${userId}&orders=${orderParams}&offset=${offset}&limit=${limit}`;
    } else {
      searchUrl = `?userId=${userId}&orders=all&offset=${offset}&limit=${limit}`;
    }
  }

  // console.log(orderParams);
  const response = await (
    await fetch(`${PUBLIC_API_URL}/order/userorder${searchUrl}`, {
      method: "GET",
      cache: "no-cache",
      headers: { Cookie: cookies().toString() },
    })
  ).json();

  if (response.success) {
    const { data }: { data: ordersDataType } = response;
    const { data: orders, meta }: { data: orderObjectType[]; meta: MetaType } =
      data;
    // console.log(meta);
    ordersContent =
      orders.length > 0 ? (
        <table className="font-inter table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="bg-gray-100">
              <th
                scope="col"
                className="text-left text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
              >
                Order Time
              </th>
              <th
                scope="col"
                className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {orders?.map((order: any) => {
              const {
                id,
                attributes,
              }: { id: number; attributes: orderAttributes } = order;
              const {
                paymentID,
                products,
                createdAt,
                status,
                shipping_method_and_cost,
              } = attributes;
              const { shippingCost }: { shippingCost: number } =
                shipping_method_and_cost;
              // console.log(products);

              let subtotal: number = products.reduce(
                (total: number, product: CartProduct) => {
                  let value = product.quantity * product.price;
                  return value + total;
                },
                0
              );

              const totalPrice: number = subtotal + shippingCost;
              return (
                <tr key={id}>
                  <td className="px-5 py-3 leading-6 whitespace-nowrap">
                    <span className="uppercase text-sm font-medium">
                      {paymentID.substring(0, 8) + `...`}
                    </span>
                  </td>
                  <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                    <span className="text-sm">
                      {moment(createdAt).format("Do MMMM YYYY, h:mm:ss a")}
                    </span>
                  </td>
                  <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
                    <span
                      className={`capitalize font-semibold ${
                        status.toLowerCase() === "pending" && "text-orange-500"
                      } ${
                        status.toLowerCase() === "complete" &&
                        "text-emerald-500"
                      } ${
                        status.toLowerCase() === "processing" &&
                        "text-indigo-500"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-700">
                      ${parseFloat(`${totalPrice}`).toFixed(2)}
                    </span>
                  </td>

                  <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                    <Link
                      href={`/order/${paymentID}`}
                      className="px-3 py-1 bg-emerald-100 text-xs text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all font-semibold rounded-full"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="font-inter w-full px-6 py-10">
          <div className="w-fit mx-auto flex flex-col items-center">
            <div className="h-20 w-20 rounded-full flex justify-center items-center text-slate-100 bg-emerald-500 mb-2">
              <BsFillCartXFill
                className="w-8 h-8
          "
              />
            </div>
            <p className="">No Order found</p>
          </div>
        </div>
      );

    pageContent = (
      <section className="py-10 lg:pb-14 bg-gray-50">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row w-full">
            {/* <!-- left section... --> */}
            <LeftSidebar />
            {/* <!-- right section... --> */}
            <div className="w-full bg-white mt-2 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
              <div className="overflow-hidden">
                <h2 className="text-lg lg:text-xl font-inter font-bold mb-5">
                  Dashboard
                </h2>
                <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
                  {/* <!-- total order --> */}
                  <Link href={`?orders=all`}>
                    <div
                      className={`flex items-center border  ${
                        orderParams == "all" || orderParams == undefined
                          ? "bg-brand-color  border-transparent"
                          : "bg-white border-gray-200"
                      } w-full rounded-lg p-3 md:p-4 cursor-pointer`}
                    >
                      <div className="flex items-center justify-center p-2 rounded-full w-8 h-8 lg:h-10 lg:w-10 text-xl text-center mr-[10px] text-red-600 bg-red-200">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                      </div>
                      <h5
                        className={`leading-none text-sm sm:text-base font-medium font-inter ${
                          orderParams == "all" || orderParams == undefined
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        Total Order
                      </h5>
                    </div>
                  </Link>
                  {/* <!-- pending order --> */}
                  <Link href={`?orders=pending`}>
                    <div
                      className={`flex items-center border  ${
                        orderParams == "pending"
                          ? "bg-brand-color  border-transparent"
                          : "bg-white border-gray-200"
                      } w-full rounded-lg p-3 md:p-4 cursor-pointer`}
                    >
                      <div className="flex items-center justify-center p-2 rounded-full w-8 h-8 lg:h-10 lg:w-10 text-xl text-center mr-[10px] text-orange-600 bg-orange-200">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="23 4 23 10 17 10"></polyline>
                          <polyline points="1 20 1 14 7 14"></polyline>
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                      </div>
                      <h5
                        className={`leading-none mb-2 text-sm sm:text-base font-medium font-inter text-gray-700 ${
                          orderParams == "pending"
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        Pending Order
                      </h5>
                    </div>
                  </Link>

                  {/* <!-- Processing Order --> */}
                  <Link href={`?orders=processing`}>
                    <div
                      className={`flex items-center border  ${
                        orderParams == "processing"
                          ? "bg-brand-color  border-transparent"
                          : "bg-white border-gray-200"
                      } w-full rounded-lg p-3 md:p-4 cursor-pointer`}
                    >
                      <div className="flex items-center justify-center p-2 rounded-full w-8 h-8 lg:h-10 lg:w-10 text-xl text-center mr-[10px]  text-indigo-600 bg-indigo-200">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect x="1" y="3" width="15" height="13"></rect>
                          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                          <circle cx="5.5" cy="18.5" r="2.5"></circle>
                          <circle cx="18.5" cy="18.5" r="2.5"></circle>
                        </svg>
                      </div>
                      <h5
                        className={`leading-none text-sm sm:text-base font-medium font-inter ${
                          orderParams == "processing"
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        Processing Order
                      </h5>
                    </div>
                  </Link>

                  {/* <!-- Complete Order --> */}
                  <Link href={`?orders=complete`}>
                    <div
                      className={`flex items-center border  ${
                        orderParams == "complete"
                          ? "bg-brand-color  border-transparent"
                          : "bg-white border-gray-200"
                      } w-full rounded-lg p-3 md:p-4 cursor-pointer`}
                    >
                      <div className="flex items-center justify-center p-2 rounded-full w-8 h-8 lg:h-10 lg:w-10 text-xl text-center mr-[10px] text-emerald-600 bg-emerald-200">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <h5
                        className={`leading-none text-sm sm:text-base font-medium font-inter ${
                          orderParams == "complete"
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        Complete Order
                      </h5>
                    </div>
                  </Link>
                </div>
                {/* <!-- right body // order list --> */}
                <div className="max-w-screen-2xl mx-auto">
                  <div className="rounded-md font-serif">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-inter font-bold mb-4">
                        Recent Order
                      </h3>
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
                          <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                            {/* <!-- order list table --> */}
                            {ordersContent}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto">
                <Pagination
                  currentWebPageView="user_dashboard"
                  searchParams={searchParams}
                  pagination={meta.pagination}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
    // console.log(orders);
  } else {
    const {
      status,
      message,
      success,
    }: { status: number; message: string; success: boolean } = response;

    if (status === 404) {
      pageContent = <NotFoundComp />;
    } else {
      pageContent = <CustomError status={status} message={message} />;
    }
  }

  return <>{pageContent}</>;
};

export default Page;
