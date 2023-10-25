import { ProductsDataType } from "@/types/pagination";
import { AllProductsResponse, ProductsData } from "@/types/products";
import { PUBLIC_API_URL } from "@/urls";

export const getAllPopularProducts = async (): Promise<ProductsData> => {
  const response = await fetch(`${PUBLIC_API_URL}/items/popular-items`, {
    method: "GET",
    cache: "no-store",
  });

  return response.json();
};

export const getAllDiscountedProducts = async (): Promise<ProductsData> => {
  const response = await fetch(`${PUBLIC_API_URL}/items/discounted-products`);

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
  [key: string]: string | undefined;
}): Promise<AllProductsResponse> => {
  let url: string = "populate=thumbnail";
  let filterNumber: number = 0;
  let limit: number = 12;

  //
  if (query) {
    url = `${url}&filters[$or][0][name][$containsi]=${query}&filters[$or][1][slug][$containsi]=${query}`;
    filterNumber = 2;
  }
  //
  if (category) {
    let newUrl = "";
    let categories: Array<string> = category.split(",");
    categories.reduce((prevUrl, word) => {
      newUrl = `${prevUrl}&filters[$or][${filterNumber}][category][slug][$eqi]=${word}`;
      filterNumber++;
      return newUrl;
    }, url);
    url = newUrl;
  }
  //
  if (page) {
    let offset: number = (Number(page) - 1) * limit;
    url = `${url}&pagination[start]=${offset}&pagination[limit]=${limit}`;
  } else {
    url = `${url}&pagination[start]=0&pagination[limit]=${limit}`;
  }

  const response = await fetch(`${PUBLIC_API_URL}/items/all-products?${url}`, {
    method: "GET",
    cache: "no-store",
  });

  return response.json();
};
