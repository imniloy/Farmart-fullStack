import { verifyAuth } from "@/services/verifyAuth";
import { PRIVATE_API_URL } from "@/urls";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchQuery = request.nextUrl.search;
  const regex = /\?userId=(\w+)&orders=(\w+)&offset=(\w+)&limit=(\w+)/;
  const match = regex.exec(searchQuery);
  // token
  const token = request.cookies.get("farmart_account_token") || "";
  if (token && match) {
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
    if (user.id.toString() === match[1]) {
      const searchQuery: string =
        match[2] === "all"
          ? `filters[userId][$eqi]=${user.id}&pagination[start]=${match[3]}&pagination[limit]=${match[4]}`
          : `filters[userId][$eqi]=2&filters[status][$eqi]=${match[2]}&pagination[start]=${match[3]}&pagination[limit]=${match[4]}`;
      
      const response = await fetch(
        `${PRIVATE_API_URL}/api/orders?${searchQuery}`,
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
          success: true,
          status: 200,
          data,
          message: "Success",
        });
      } else {
        const { error }: { error: any } = await response.json();

        return NextResponse.json({
          success: false,
          status: error.status,
          message: error.message,
        });
      }
    }
  }
  return NextResponse.json({
    status: 500,
    success: false,
    message: "Something went wrong!",
  });
};
