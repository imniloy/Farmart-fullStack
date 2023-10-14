import OrderEditComp from "@/components/orderEdit";
import { verifyAuth } from "@/services/verifyAuth";
import { orderObjectType } from "@/types/ordersData";
import { PRIVATE_API_URL } from "@/urls";
import { cookies } from "next/headers";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return <>Bad Request</>;
  
  let pageContent: React.ReactNode;
  const cookieStore = cookies();
  let searchUrl: string = params.id;

  const token = cookieStore.get("farmart_account_token");
  if (token && params.id) {
    const verifyToken = await verifyAuth(token.value);
    const {
      jwt,
      user,
    }: {
      jwt: string;
      user: {
        id: number;
        username: string;
        email: string;
        user_type: string;
      };
    } = verifyToken;

    const response = await fetch(`${PRIVATE_API_URL}/api/orders/${searchUrl}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (response.ok) {
      const { data: order }: { data: orderObjectType } = await response.json();

      pageContent = <OrderEditComp jwt={jwt} order={order} />;
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
  }
  return (
    <section className="py-10 lg:pb-14 bg-gray-50">
      <div className="section-container">{pageContent}</div>
    </section>
  );
};

export default Page;
