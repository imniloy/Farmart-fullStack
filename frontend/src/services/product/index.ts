import { ProductsData } from "@/types/products";
import { PUBLIC_API_URL } from "@/urls";

export const getAllPopularProducts = async (): Promise<ProductsData> => {
  const response = await fetch(`${PUBLIC_API_URL}/items/popular-items`, {
    method: "GET",
    cache: "no-store",
  });

  return response.json();
};

export const getAllDiscountedProducts = async (): Promise<ProductsData> => {
  const response = await fetch(`${PUBLIC_API_URL}/items/discounted-products`, {
    method: "GET",
    cache: "no-store",
  });

  return response.json();
};

export const getProductDetails = async (
  slug: string
): Promise<ProductsData> => {
  const response = await fetch(
    `${PUBLIC_API_URL}/items/product-details?slug=${slug}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  return response.json();
};

export const getRelatedProducts = async (
  categoryId: number
): Promise<ProductsData> => {
  const response = await fetch(
    `${PUBLIC_API_URL}/items/related-products?categoryId=${categoryId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  return response.json();
};
