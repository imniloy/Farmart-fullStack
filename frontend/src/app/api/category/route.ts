import { Categories, Category } from "@/types/Categories";
import { PRIVATE_API_URL } from "@/urls";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const response = await fetch(
    `${PRIVATE_API_URL}/api/categories?filters[name][$nei]=popular&populate=image`
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
