import { MetaType } from "@/types/pagination";
import { product } from "@/types/products";
import { PRIVATE_API_URL } from "@/urls";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const parameters = request.nextUrl.search;
  const response = await fetch(`${PRIVATE_API_URL}/api/products${parameters}`);

  if (!response)
    return NextResponse.json({
      success: false,
      message: "Failed To Fetch Products",
    });

  const { data, meta }: { data: product[]; meta: MetaType } =
    await response.json();

  return NextResponse.json({ success: true, data, meta });
};
