import { ProductsDataType } from "@/types/pagination";
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

export const getRelatedProducts = async ({
  categoryId,
  productId,
}: {
  categoryId: number;
  productId: number;
}): Promise<ProductsData> => {
  const response = await fetch(
    `${PUBLIC_API_URL}/items/related-products?categoryId=${categoryId}&productId=${productId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  return response.json();
};

export const getAllProducts = async ({
  category,
  query,
  page,
}: {
  [key: string]: string | string[] | undefined;
}): Promise<ProductsDataType> => {
  console.log(category);
  console.log(query);
  console.log(page);
  // parameters making...
  let url = "?";
  if (query) {
  }

  if (category) {
  }

  if (page) {
  }

  const response = await fetch(`${PUBLIC_API_URL}/items/all-products`, {
    method: "GET",
    cache: "no-store",
  });

  return response.json();
};
