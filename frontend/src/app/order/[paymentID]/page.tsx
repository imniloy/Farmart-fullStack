import { PUBLIC_API_URL } from "@/urls";
import React from "react";
import { cookies } from "next/headers";

// export const runtime = "edge";

const Page = async ({ params }: { params: { paymentID: string } }) => {
  const { paymentID } = params;

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
  console.log(response);
  return (
    <section className="py-10 lg:pb-14 bg-gray-50">
      <div className="section-container"></div>
    </section>
  );
};

export default Page;
