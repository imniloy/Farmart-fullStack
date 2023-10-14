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
    return NextResponse.json({
      status: 404,
      success: false,
      message: "Page is not found!",
    });
  }
  return NextResponse.json({
    status: 500,
    success: false,
    message: "Something went wrong!",
  });
};

// this PUT Method will be called when admin wants to update the orders status...
// status can onlybe pending/processing/complete...

export const PUT = async (req: NextRequest, res: NextResponse) => {
  const id = req.nextUrl.search.replace("?", "");
  const payload = req.body;
  // const response = await fetch(`http://127.0.0.1:1337/api/orders/${id}`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     // Authorization: `Bearer ${jwt}`,
  //   },
  // });

  // if (response.ok) {
  //   const data = await response.json();
  //   return NextResponse.json(data);
  // }

  return NextResponse.json({ id, payload });

  // const response = await fetch(`${PRIVATE_API_URL}/api/orders/${orderId}`, {
  //   method: "PUT",
  //   cache: "no-cache",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3MDQ0NzE3LCJleHAiOjE2OTk2MzY3MTd9.KBZ-aUgXQgXlNa9LZ_o3dtRNSLLuLPMuV_XunFKic9Q`,
  //   },
  //   body: JSON.stringify({
  //     data: {
  //       status: "complete",
  //     },
  //   }),
  // });
  // if (response.ok) {
  //   const data = await response.json();

  //   return NextResponse.json(data);
  // }
};
