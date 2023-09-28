import { verifyAuth } from "@/services/verifyAuth";
import { PRIVATE_API_URL } from "@/urls";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get("farmart_account_token") || "";
  if (token) {
    const verifyToken = await verifyAuth(token.value);
    const { jwt, user }: { jwt: string; user: {} } = verifyToken;
  }

  const response = fetch(
    `${PRIVATE_API_URL}/api/orders${request.nextUrl.search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${`a`}`,
      },
    }
  );
  return NextResponse.json({
    message: "Logout successful",
    success: true,
    status: 200,
  });

  // return NextResponse.json({
  //   status: 500,
  //   success: false,
  //   message: "failed to logout",
  // });
};
