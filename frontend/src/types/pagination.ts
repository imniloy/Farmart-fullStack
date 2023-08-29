import { product } from "./products";

export type PaginationType = {
  start: number;
  limit: number;
  total: number;
};

export type MetaType = {
  pagination: PaginationType;
};

export type ProductsDataType = {
  data: product[];
  meta: MetaType;
};
