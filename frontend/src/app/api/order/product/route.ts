import { verifyAuth } from "@/services/verifyAuth";
import { PRIVATE_API_URL } from "@/urls";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, res: NextResponse) => {
  const paymentId = request.nextUrl.search;
  const token = request.cookies.get("farmart_account_token") || "";

  if (token && paymentId && paymentId.length > 24) {
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

    if (verifyToken && user.id) {
      const response = await fetch(
        `${PRIVATE_API_URL}/api/orders?${paymentId}&filters[userId][$eqi]=${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          status: 200,
          success: true,
          data,
        });
      } else {
        return NextResponse.json({
          status: 500,
          success: false,
          message: "Something went wrong!",
        });
      }
    }
  }
  return NextResponse.json({
    status: 404,
    success: false,
    message: "No Order found!",
  });
};
