import { PRIVATE_API_URL } from "@/urls";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest, res: NextResponse) => {
  const id: string = request.nextUrl.search.replace("?", "");
  const token = request.cookies.get("farmart_account_token") || "";
  if (token) {
    // const response = fetch(`${PRIVATE_API_URL}/api/orders/${id}`, {
    //   method: "PUT",
    //     cache: "no-cache",
    //     headers: {

    //   }
    // });

    return NextResponse.json({ id });
  }
  return NextResponse.json({ id });
};
