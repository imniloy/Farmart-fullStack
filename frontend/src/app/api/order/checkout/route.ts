import { PRIVATE_API_URL } from "@/urls";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/services/verifyAuth";
import { payloadStrapiDataType, payloadType } from "@/types/checkoutProducts";

export const POST = async (request: NextRequest) => {
  const info: payloadType = await request.json();
  const token = request.cookies.get("farmart_account_token") || "";

  if (token) {
    const verifyToken = await verifyAuth(token.value);
    const { jwt, user } = verifyToken;
    if (user.id) {
      const payload: payloadStrapiDataType = {
        data: {
          ...info,
          userId: `${user.id}`,
        },
      };

      const response = await fetch(`${PRIVATE_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(payload),
      });

      const { data } = await response.json();

      if (data.id) {
        return NextResponse.json({
          status: 200,
          data,
        });
      } else {
        return NextResponse.json({
          status: 500,
          error: data.error.message,
        });
      }
    }
  }
  return NextResponse.json({
    status: 500,
    error: "Something wrong happens!",
  });
};
