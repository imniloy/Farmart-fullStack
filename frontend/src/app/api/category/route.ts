import { Categories, Category } from "@/types/Categories";
import { PRIVATE_API_URL } from "@/urls";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const response = await fetch(
    `${PRIVATE_API_URL}/api/categories?filters[name][$nei]=popular&populate=image`,
    {
      // next: { revalidate: 60 },
    }
  );

  if (!response)
    return NextResponse.json({
      success: false,
      message: "Failed to fetch Categories",
    });
  const { data }: { data: Category[] } = await response.json();
  return NextResponse.json({
    success: true,
    data,
  });
};
