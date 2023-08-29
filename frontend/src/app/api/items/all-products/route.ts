import { MetaType } from "@/types/pagination";
import { product } from "@/types/products";
import { PRIVATE_API_URL } from "@/urls";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const response = await fetch(
    `${PRIVATE_API_URL}/api/products?populate=thumbnail&pagination[start]=0&pagination[withCount]=true&pagination[limit]=12`
  );

  if (!response)
    return NextResponse.json({
      success: false,
      message: "Failed To Fetch Products",
    });

  const { data, meta }: { data: product[]; meta: MetaType } =
    await response.json();

  return NextResponse.json({ data, meta });
};
