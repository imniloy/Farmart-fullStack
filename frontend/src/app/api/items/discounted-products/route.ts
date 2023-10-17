import { PRIVATE_API_URL } from "@/urls";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const response = await fetch(
    `${PRIVATE_API_URL}/api/products?populate=thumbnail&filters[category][name][$nei]=popular&filters[original_price][$nei]=null&sort[0]=stock:desc&pagination[limit]=12`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response)
    return NextResponse.json({
      success: false,
      message: "Failed To Fetch Latest Discount Products",
    });

  const { data } = await response.json();

  return NextResponse.json({
    success: true,
    data,
  });
};
