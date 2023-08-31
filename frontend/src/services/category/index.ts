import { Categories } from "@/types/Categories";
import { PUBLIC_API_URL } from "@/urls";

export const getAllCategories = async (): Promise<Categories> => {
  const response = await fetch(`${PUBLIC_API_URL}/category`, {
    method: "GET",
    // cache: "no-store",
  });

  return response.json();
};
