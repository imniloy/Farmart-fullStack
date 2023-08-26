import { product } from "@/types/products";
import { PRIVATE_API_URL } from "@/urls";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const response = await fetch(
    `${PRIVATE_API_URL}/api/products?populate=*&filters[slug][$eqi]=${slug}`
  );

  if (!response)
    return NextResponse.json({
      success: false,
      message: "Failed To Fetch Product Details",
    });

  const { data }: { data: product[] } = await response.json();

  return NextResponse.json({
    success: true,
    data,
  });
};
