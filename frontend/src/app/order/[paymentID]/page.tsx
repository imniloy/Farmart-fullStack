import { PUBLIC_API_URL } from "@/urls";
import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import moment from "moment";

// export const runtime = "edge";

const Page = async ({ params }: { params: { paymentID: string } }) => {
  const { paymentID } = params;
  let pageContent: React.ReactElement;

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
  }
  console.log(response);
  return (
    <section className="py-10 lg:pb-14 bg-gray-50">
      <div className="section-container">
        <div className="user_info_section text-gray-600 text-sm space-y-1">
          <h3 className="">
            <span className="font-semibold">First Name : </span> Niloy
          </h3>
          <h3 className="">
            <span className="font-semibold">Last Name : </span> Das
          </h3>
          <h3 className="">
            <span className="font-semibold">Email : </span>
            imniloy8@gmail.com
          </h3>
          <h3 className="">
            <span className="font-semibold">Phone Number : </span>
            01307065475
          </h3>
        </div>
        {/* orders */}
        <p className="text-sm my-6 text-gray-600">
          <span className="font-semibold">ORDER ID:</span>{" "}
          <span className="">{paymentID}</span>
        </p>

        <p className="text-sm my-6 text-gray-600">
          <span className="font-semibold">USER ID : </span>{" "}
          <span className="">{paymentID}</span>
        </p>

        <p className="text-sm my-6 text-gray-600">
          <span className="font-semibold">Created At:</span>{" "}
          <span className="">{paymentID}</span>
        </p>

        <div className="w-full mb-10">
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
          </table>
        </div>
      </div>
    </section>
  );
};

export default Page;
