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
  [key: string]: string | undefined;
}): Promise<ProductsDataType> => {
  let url: string = "populate=thumbnail";
  let filterNumber: number = 0;
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
    url = `${url}&page=${page}`;
  } else {
    url = `${url}&page=1`;
  }

  // console.log(
  //   "new URl ----------------------------------------------------------------"
  // );
  // console.log("urlString: " + url);
  // console.log(
  //   "new URl ----------------------------------------------------------------"
  // );

  const response = await fetch(`${PUBLIC_API_URL}/items/all-products?${url}`, {
    method: "GET",
    cache: "no-store",
  });

  return response.json();
};
