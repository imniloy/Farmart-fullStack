import { Category } from "./Categories";
import { MetaType } from "./pagination";
export type attributes = {
  name: string;
  description: string;
  price: number;
  original_price: number | null | undefined;
  slug: string;
  createdAt: string;
  stock: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail?: any;
  images?: any;
  category: {
    data: Category;
  };
};

export type product = {
  id: number;
  attributes: attributes;
};

export type ProductsData = {
  success: boolean;
  data: product[];
};

export type AllProductsResponse = {
  success: boolean;
  data: product[];
  meta: MetaType;
};
