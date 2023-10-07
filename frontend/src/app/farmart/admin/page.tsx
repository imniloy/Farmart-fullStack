import LeftSidebar from "@/components/adminPanel/LeftSideBar";
import { PUBLIC_API_URL } from "@/urls";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import { AllProductsResponse } from "@/types/products";
import { BsFillCartXFill } from "react-icons/bs";
import moment from "moment/moment";
import {
  orderAttributes,
  orderDataResponseType,
  orderObjectType,
  ordersDataType,
} from "@/types/ordersData";
import { MetaType } from "@/types/pagination";
import { CartProduct } from "@/redux/features/cart/types";
import NotFoundComp from "@/components/notFound";
import CustomError from "@/components/notFound/CustomError";
import Pagination from "@/components/Pagination";

// export const runtime = "edge";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { products: productsParams, page } = searchParams || {};
  let limit: number = 2;
  let offset: number = page ? (Number(page) - 1) * limit : 0;
  let searchUrl: string = `?`;
  let pageContent: React.ReactNode;
  let productsContent: React.ReactNode;
  switch (productsParams) {
    case "all":
      searchUrl = `?populate=category&pagination[start]=${offset}&pagination[limit]=${limit}`;
      break;
    case "instock":
      searchUrl = `?populate=category&filters[stock][$gt]=0&pagination[start]=${offset}&pagination[limit]=${limit}`;
      break;
    case "outstock":
      searchUrl = `?populate=category&filters[stock][$lte]=0&pagination[start]=${offset}&pagination[limit]=${limit}`;
      break;
    default:
      if (!productsParams) {
        searchUrl = `?populate=category&pagination[start]=${offset}&pagination[limit]=${limit}`;
      }
      break;
  }

  const response: AllProductsResponse = await (
    await fetch(`${PUBLIC_API_URL}/items/all-products${searchUrl}`, {
      method: "GET",
      cache: "no-cache",
      headers: { Cookie: cookies().toString() },
    })
  ).json();

  if (response.success) {
    const { data, meta } = response;
    productsContent =
      data.length > 0 ? (
        <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
          <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
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
                  className="text-left text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                >
                  Product Name
                </th>
                <th
                  scope="col"
                  className="text-left text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="text-left text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                >
                  Edit
                </th>

                <th
                  scope="col"
                  className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y font-inter divide-gray-200 ">
              {data.map((product) => {
                const { id, attributes } = product;
                console.log(
                  attributes.category.data
                    ? attributes.category.data.attributes.name
                    : ""
                );
                return (
                  <tr key={id}>
                    {/* <!-- product id --> */}
                    <td className="px-6 py-3 leading-6 whitespace-nowrap">
                      <span className="uppercase text-sm font-medium">
                        {id}
                      </span>
                    </td>
                    {/* <!-- product name --> */}
                    <td className="px-6 py-3 leading-6 whitespace-nowrap">
                      <span className="text-sm capitalize">
                        {attributes.name.length > 30
                          ? attributes.name.substring(0, 30) + `...`
                          : attributes.name}
                      </span>
                    </td>
                    {/* <!-- product category --> */}
                    <td className="px-6 py-3 leading-6 text-left whitespace-nowrap">
                      <span className="text-sm capitalize font-medium">
                        {attributes.category.data
                          ? attributes.category.data.attributes.name
                          : ""}
                      </span>
                    </td>
                    {/* <!-- stock info --> */}
                    <td className="px-6 py-3 leading-6 text-left whitespace-nowrap font-medium text-sm">
                      <span
                        className={` ${
                          Number(attributes.stock) > 0
                            ? "text-emerald-500"
                            : "text-orange-500"
                        } capitalize`}
                      >
                        {Number(attributes.stock) > 0
                          ? "In stock"
                          : "Out of stock"}
                      </span>
                    </td>
                    {/* <!-- price --> */}
                    <td className="px-6 py-3 leading-6 text-center whitespace-nowrap">
                      <span className="text-sm font-bold">
                        {attributes.price}
                      </span>
                    </td>
                    {/* <!-- edit product --> */}
                    <td className="flex items-center justify-center px-6 py-3 leading-6 text-center whitespace-nowrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer text-color-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </td>

                    {/* <!-- delete --> */}
                    <td className="px-6 py-3 leading-6 text-center whitespace-nowrap">
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="font-inter w-full px-6 py-10">
          <div className="w-fit mx-auto flex flex-col items-center">
            <div className="h-20 w-20 rounded-full flex justify-center items-center text-slate-100 bg-emerald-500 mb-2">
              <BsFillCartXFill
                className="w-8 h-8
            "
              />
            </div>
            <p className="">No Product found</p>
          </div>
        </div>
      );

    pageContent = (
      <div className="w-full bg-white mt-2 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
        <div className="overflow-hidden">
          <h2 className="text-lg lg:text-xl font-inter font-bold mb-5">
            Dashboard
          </h2>
          <div className="grid gap-3 mb-8 md:grid-cols-2 xl:grid-cols-3">
            {/* <!-- total order --> */}
            <Link href={`?products=all`}>
              <div
                className={`flex items-center border  ${
                  productsParams == "all" || productsParams == undefined
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
                    productsParams == "all" || productsParams == undefined
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  Total Products
                </h5>
              </div>
            </Link>

            {/* <!-- in stock products --> */}
            <Link href={`?products=instock`}>
              <div
                className={`flex items-center border  ${
                  productsParams == "instock"
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
                    productsParams == "instock" ? "text-white" : "text-gray-700"
                  }`}
                >
                  In Stock Products
                </h5>
              </div>
            </Link>

            {/* <!-- out of stock products --> */}
            <Link href={`?products=outstock`}>
              <div
                className={`flex items-center border  ${
                  productsParams == "outstock"
                    ? "bg-brand-color  border-transparent"
                    : "bg-white border-gray-200"
                } w-full rounded-lg p-3 md:p-4 cursor-pointer`}
              >
                <div className="flex items-center justify-center p-2 rounded-full w-8 h-8 lg:h-10 lg:w-10 text-xl text-center mr-[10px] text-orange-600 bg-orange-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h5
                  className={`leading-none text-sm sm:text-base font-medium font-inter text-gray-700 ${
                    productsParams == "outstock"
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  Out Of Stock Products
                </h5>
              </div>
            </Link>
          </div>
          {/* <!-- right body // Products list --> */}
          <div className="max-w-screen-2xl mx-auto">
            <div className="rounded-md font-serif">
              <div className="flex flex-col">
                <h3 className="text-lg font-inter font-bold mb-4">Products</h3>
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
                    {productsContent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto">
          <Pagination
            currentWebPageView="admin_dashboard"
            searchParams={searchParams}
            pagination={meta.pagination}
          />
        </div>
      </div>
    );
  } else {
    pageContent = (
      <div className="w-full">
        <div className="w-fit my-auto h-fit mx-auto">
          <h2 className="text-[100px] text-center">500</h2>
          <p className="text-2xl text-center">Something went wrong!</p>
        </div>
      </div>
    );
  }

  // if (response.success) {
  //   const { data }: { data: ordersDataType } = response;
  //   const { data: orders, meta }: { data: orderObjectType[]; meta: MetaType } =
  //     data;
  //   // console.log(meta);
  //   ordersContent =
  //     orders.length > 0 ? (
  //       <table className="font-inter table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
  //         <thead className="bg-gray-50">
  //           <tr className="bg-gray-100">
  //             <th
  //               scope="col"
  //               className="text-left text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
  //             >
  //               ID
  //             </th>
  //             <th
  //               scope="col"
  //               className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
  //             >
  //               Order Time
  //             </th>
  //             <th
  //               scope="col"
  //               className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
  //             >
  //               Status
  //             </th>
  //             <th
  //               scope="col"
  //               className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
  //             >
  //               Total
  //             </th>
  //             <th
  //               scope="col"
  //               className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
  //             >
  //               Details
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody className="bg-white divide-y divide-gray-200 ">
  //           {orders?.map((order: any) => {
  //             const {
  //               id,
  //               attributes,
  //             }: { id: number; attributes: orderAttributes } = order;
  //             const {
  //               paymentID,
  //               products,
  //               createdAt,
  //               status,
  //               shipping_method_and_cost,
  //             } = attributes;
  //             const { shippingCost }: { shippingCost: number } =
  //               shipping_method_and_cost;
  //             // console.log(products);

  //             let subtotal: number = products.reduce(
  //               (total: number, product: CartProduct) => {
  //                 let value = product.quantity * product.price;
  //                 return value + total;
  //               },
  //               0
  //             );

  //             const totalPrice: number = subtotal + shippingCost;
  //             return (
  //               <tr key={id}>
  //                 <td className="px-5 py-3 leading-6 whitespace-nowrap">
  //                   <span className="uppercase text-sm font-medium">
  //                     {paymentID.substring(0, 8) + `...`}
  //                   </span>
  //                 </td>
  //                 <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
  //                   <span className="text-sm">
  //                     {moment(createdAt).format("Do MMMM YYYY, h:mm:ss a")}
  //                   </span>
  //                 </td>
  //                 <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
  //                   <span
  //                     className={`capitalize font-semibold ${
  //                       status.toLowerCase() === "pending" && "text-orange-500"
  //                     } ${
  //                       status.toLowerCase() === "complete" &&
  //                       "text-emerald-500"
  //                     } ${
  //                       status.toLowerCase() === "processing" &&
  //                       "text-indigo-500"
  //                     }`}
  //                   >
  //                     {status}
  //                   </span>
  //                 </td>
  //                 <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
  //                   <span className="text-sm font-semibold text-gray-700">
  //                     ${totalPrice}
  //                   </span>
  //                 </td>

  //                 <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
  //                   <Link
  //                     href={`/order/${paymentID}`}
  //                     className="px-3 py-1 bg-emerald-100 text-xs text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all font-semibold rounded-full"
  //                   >
  //                     Details
  //                   </Link>
  //                 </td>
  //               </tr>
  //             );
  //           })}
  //         </tbody>
  //       </table>
  //     ) : (
  //       <p>No order</p>
  //     );

  //   pageContent = (
  //     <section className="py-10 lg:pb-14 bg-gray-50">
  //       <div className="section-container">
  //         <div className="flex flex-col lg:flex-row w-full">
  //           {/* <!-- left section... --> */}
  //           <LeftSidebar />
  //           {/* <!-- right section... --> */}
  //           <div className="w-full bg-white mt-2 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
  //             <div className="overflow-hidden">
  //               <h2 className="text-xl font-inter font-bold mb-5">Dashboard</h2>
  //               <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
  //                 {/* <!-- total order --> */}
  //                 <Link href={`?orders=all`}>
  //                   <div
  //                     className={`flex items-center border  ${
  //                       productsParams == "all" || productsParams == undefined
  //                         ? "bg-brand-color  border-transparent"
  //                         : "bg-white border-gray-200"
  //                     } w-full rounded-lg p-3 md:p-4 cursor-pointer`}
  //                   >
  //                     <div className="flex items-center justify-center p-2 rounded-full w-8 h-8 lg:h-10 lg:w-10 text-xl text-center mr-[10px] text-red-600 bg-red-200">
  //                       <svg
  //                         stroke="currentColor"
  //                         fill="none"
  //                         strokeWidth="2"
  //                         viewBox="0 0 24 24"
  //                         strokeLinecap="round"
  //                         strokeLinejoin="round"
  //                         height="1em"
  //                         width="1em"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                       >
  //                         <circle cx="9" cy="21" r="1"></circle>
  //                         <circle cx="20" cy="21" r="1"></circle>
  //                         <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  //                       </svg>
  //                     </div>
  //                     <h5
  //                       className={`leading-none text-sm sm:text-base font-medium font-inter ${
  //                         productsParams == "all" || productsParams == undefined
  //                           ? "text-white"
  //                           : "text-gray-700"
  //                       }`}
  //                     >
  //                       Total Order
  //                     </h5>
  //                   </div>
  //                 </Link>
  //                 {/* <!-- pending order --> */}
  //                 <Link href={`?orders=pending`}>
  //                   <div
  //                     className={`flex items-center border  ${
  //                       productsParams == "pending"
  //                         ? "bg-brand-color  border-transparent"
  //                         : "bg-white border-gray-200"
  //                     } w-full rounded-lg p-3 md:p-4 cursor-pointer`}
  //                   >
  //                     <div className="flex items-center justify-center p-2 rounded-full w-8 h-8 lg:h-10 lg:w-10 text-xl text-center mr-[10px] text-orange-600 bg-orange-200">
  //                       <svg
  //                         stroke="currentColor"
  //                         fill="none"
  //                         strokeWidth="2"
  //                         viewBox="0 0 24 24"
  //                         strokeLinecap="round"
  //                         strokeLinejoin="round"
  //                         height="1em"
  //                         width="1em"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                       >
  //                         <polyline points="23 4 23 10 17 10"></polyline>
  //                         <polyline points="1 20 1 14 7 14"></polyline>
  //                         <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  //                       </svg>
  //                     </div>
  //                     <h5
  //                       className={`leading-none mb-2 text-sm sm:text-base font-medium font-inter text-gray-700 ${
  //                         productsParams == "pending"
  //                           ? "text-white"
  //                           : "text-gray-700"
  //                       }`}
  //                     >
  //                       Pending Order
  //                     </h5>
  //                   </div>
  //                 </Link>

  //                 {/* <!-- Processing Order --> */}
  //                 <Link href={`?orders=processing`}>
  //                   <div
  //                     className={`flex items-center border  ${
  //                       productsParams == "processing"
  //                         ? "bg-brand-color  border-transparent"
  //                         : "bg-white border-gray-200"
  //                     } w-full rounded-lg p-3 md:p-4 cursor-pointer`}
  //                   >
  //                     <div className="flex items-center justify-center p-2 rounded-full w-8 h-8 lg:h-10 lg:w-10 text-xl text-center mr-[10px]  text-indigo-600 bg-indigo-200">
  //                       <svg
  //                         stroke="currentColor"
  //                         fill="none"
  //                         strokeWidth="2"
  //                         viewBox="0 0 24 24"
  //                         strokeLinecap="round"
  //                         strokeLinejoin="round"
  //                         height="1em"
  //                         width="1em"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                       >
  //                         <rect x="1" y="3" width="15" height="13"></rect>
  //                         <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
  //                         <circle cx="5.5" cy="18.5" r="2.5"></circle>
  //                         <circle cx="18.5" cy="18.5" r="2.5"></circle>
  //                       </svg>
  //                     </div>
  //                     <h5
  //                       className={`leading-none text-sm sm:text-base font-medium font-inter ${
  //                         productsParams == "processing"
  //                           ? "text-white"
  //                           : "text-gray-700"
  //                       }`}
  //                     >
  //                       Processing Order
  //                     </h5>
  //                   </div>
  //                 </Link>

  //                 {/* <!-- Complete Order --> */}
  //                 <Link href={`?orders=complete`}>
  //                   <div
  //                     className={`flex items-center border  ${
  //                       productsParams == "complete"
  //                         ? "bg-brand-color  border-transparent"
  //                         : "bg-white border-gray-200"
  //                     } w-full rounded-lg p-3 md:p-4 cursor-pointer`}
  //                   >
  //                     <div className="flex items-center justify-center p-2 rounded-full w-8 h-8 lg:h-10 lg:w-10 text-xl text-center mr-[10px] text-emerald-600 bg-emerald-200">
  //                       <svg
  //                         stroke="currentColor"
  //                         fill="none"
  //                         strokeWidth="2"
  //                         viewBox="0 0 24 24"
  //                         strokeLinecap="round"
  //                         strokeLinejoin="round"
  //                         height="1em"
  //                         width="1em"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                       >
  //                         <polyline points="20 6 9 17 4 12"></polyline>
  //                       </svg>
  //                     </div>
  //                     <h5
  //                       className={`leading-none text-sm sm:text-base font-medium font-inter ${
  //                         productsParams == "complete"
  //                           ? "text-white"
  //                           : "text-gray-700"
  //                       }`}
  //                     >
  //                       Complete Order
  //                     </h5>
  //                   </div>
  //                 </Link>
  //               </div>
  //               {/* <!-- right body // order list --> */}
  //               <div className="max-w-screen-2xl mx-auto">
  //                 <div className="rounded-md font-serif">
  //                   <div className="flex flex-col">
  //                     <h3 className="text-lg font-inter font-bold mb-4">
  //                       Recent Order
  //                     </h3>
  //                     <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
  //                       <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
  //                         <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
  //                           {/* <!-- order list table --> */}
  //                           {ordersContent}
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="w-full mx-auto">
  //               <Pagination
  //                 currentWebPageView="user_dashboard"
  //                 searchParams={searchParams}
  //                 pagination={meta.pagination}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   );
  //   // console.log(orders);
  // } else {
  //   const {
  //     status,
  //     message,
  //     success,
  //   }: { status: number; message: string; success: boolean } = response;

  //   if (status === 404) {
  //     pageContent = <NotFoundComp />;
  //   } else {
  //     pageContent = <CustomError status={status} message={message} />;
  //   }
  // }

  return (
    <section className="py-10 lg:pb-14 bg-gray-50">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row w-full">
          {/* left section */}
          <LeftSidebar />
          {/* <!-- right section... --> */}
          {pageContent}
        </div>
      </div>
    </section>
  );
};

export default Page;
