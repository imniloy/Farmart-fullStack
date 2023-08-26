import { PRIVATE_API_URL } from "@/urls";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const response = await fetch(
    `${PRIVATE_API_URL}/api/products?populate=thumbnail&populate=images&filters[category][name][$eqi]=popular&&sort[0]=stock:desc&pagination[limit]=12`
  );

  if (!response)
    return NextResponse.json({
      success: false,
      message: "Failed To Fetch Popular Products",
    });

  const { data } = await response.json();

  return NextResponse.json({
    success: true,
    data,
  });
};
