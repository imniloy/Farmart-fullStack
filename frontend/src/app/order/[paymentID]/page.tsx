import { PUBLIC_API_URL } from "@/urls";
import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import moment from "moment";
import { orderObjectType } from "@/types/ordersData";
import { CartProduct } from "@/redux/features/cart/types";

// export const runtime = "edge";

const Page = async ({ params }: { params: { paymentID: string } }) => {
  const { paymentID } = params;
  let pageContent: React.ReactElement = <></>;

  const response = await (
    await fetch(
      `${PUBLIC_API_URL}/order/product?filters[paymentID][$eq]=${paymentID}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: { Cookie: cookies().toString() },
      }
    )
  ).json();

  const { status, success } = response;

  if (success) {
    const { data }: { data: orderObjectType[] } = response;
    if (data && data.length > 0) {
      console.log(data);
      const order: orderObjectType = data[0];
      const { id, attributes } = order;
      const {
        paymentID,
        createdAt,
        products,
        shipping_address,
        method,
        user_personal_details,
        userId,
        status,
        shipping_method_and_cost,
      } = attributes;

      pageContent = (
        <div>
          <div className="user_info_section text-gray-600 text-sm space-y-[6px] mb-8">
            <h3 className="">
              <span className="font-semibold">First Name : </span>{" "}
              {user_personal_details.firstName}
            </h3>
            <h3 className="">
              <span className="font-semibold">Last Name : </span>{" "}
              {user_personal_details.lastName}
            </h3>
            <h3 className="">
              <span className="font-semibold">Email : </span>
              {user_personal_details.email}
            </h3>
            <h3 className="">
              <span className="font-semibold">Phone Number : </span>
              {user_personal_details.phoneNumber}
            </h3>

            <p className="text-sm text-gray-600">
              <span className="font-semibold">ORDER ID:</span>{" "}
              <span className="">{paymentID}</span>
            </p>

            <p className="text-sm my-6 text-gray-600">
              <span className="font-semibold">USER ID : </span>{" "}
              <span className="">{userId}</span>
            </p>
            <p className="text-sm my-6 text-gray-600">
              <span className="font-semibold">Created At:</span>{" "}
              <span className="">
                {moment(createdAt).format("Do MMMM YYYY, h:mm:ss a")}
              </span>
            </p>

            <p className="text-sm my-6 text-gray-600">
              <span className="font-semibold">Delivery Status:</span>{" "}
              <span className="">{status}</span>
            </p>

            <p className="text-sm my-6 text-gray-600">
              <span className="font-semibold">Shipping Address:</span>{" "}
              <span className="">
                {" "}
                {shipping_address.street}, {shipping_address.city},{" "}
                {shipping_address.country}
              </span>
            </p>
          </div>

          <div className="w-full mb-10 overflow-x-scroll">
            <table className="font-inter table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="bg-gray-200">
                  <th
                    scope="col"
                    className="text-left text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                  >
                    Product Name
                  </th>

                  <th
                    scope="col"
                    className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
                  >
                    Quantity
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
                    Total
                  </th>
                </tr>
              </thead>

              {/* {products.map((product) => )} */}
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product: CartProduct, i) => (
                  <tr key={i}>
                    <td className="px-5 py-3 leading-6 whitespace-nowrap">
                      <span className="uppercase text-sm font-medium">
                        {product.name}
                      </span>
                    </td>
                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                      <span className="text-sm">{product.quantity}</span>
                    </td>
                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
                      <span className="font-bold">{product.price}</span>
                    </td>
                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                      <span className="text-sm font-bold">
                        {product.price * product.quantity}
                      </span>
                    </td>
                  </tr>
                ))}

                <tr className="">
                  <td className="px-5 py-3 leading-6 whitespace-nowrap">
                    <span className="uppercase text-sm font-medium">
                      SHIPPING METHOD:{" "}
                      <span className="text-brand-color font-medium capitalize">
                        {shipping_method_and_cost.shippingMedium}
                      </span>
                    </span>
                  </td>
                  <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                    <span className="text-sm">{`     `}</span>
                  </td>
                  <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
                    <span className="font-bold">{`     `}</span>
                  </td>
                  <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                    <span className="text-sm font-bold">
                      {shipping_method_and_cost.shippingCost}
                    </span>
                  </td>
                </tr>
                <tr className="">
                  <td className="px-5 py-3 leading-6 whitespace-nowrap">
                    <span className="uppercase text-sm font-medium">
                      Total price:
                    </span>
                  </td>
                  <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                    <span className="text-sm">{`     `}</span>
                  </td>
                  <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
                    <span className="font-bold">{`     `}</span>
                  </td>
                  <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                    <span className="text-sm font-bold">
                      {shipping_method_and_cost.shippingCost}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  } else {
    pageContent = <></>;
  }
  // console.log(response.data);
  return (
    <section className="py-10 lg:pb-14 bg-gray-50">
      <div className="section-container">
        <div className="p-2 sm:p-[10px] md:p-4 lg:p-6 bg-white">
          {pageContent}
        </div>
      </div>
    </section>
  );
};

export default Page;
