import {
  shipping_address_type,
  shipping_method_and_cost_type,
} from "./checkoutProducts";
import { CartProduct } from "../redux/features/cart/types";
import { MetaType } from "./pagination";

export type user_personal_details_type = {
  email: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
};

export type orderAttributes = {
  paymentID: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  products: CartProduct[];
  status: string;
  shipping_address: shipping_address_type;
  method: string;
  shipping_method_and_cost: shipping_method_and_cost_type;
  user_personal_details: user_personal_details_type;
  userId: string;
};

export type orderObjectType = {
  id: number;
  attributes: orderAttributes;
};

export type ordersDataType = {
  data: orderObjectType[];
  meta: MetaType;
};

export type orderDataResponseType = {
  success: boolean;
  status: number;
  data: ordersDataType;
  message: string;
};


