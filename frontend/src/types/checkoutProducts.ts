import { CartProduct } from "@/redux/features/cart/types";

export type checkoutProductResponse = {
  status: number;
  data: any;
  error: string;
};

export type shipping_address_type = {
  street: string;
  city: string;
  country: string;
  zipCode: string;
};
export type user_personal_details_type = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type shipping_method_and_cost_type = {
  shippingCost: number;
  shippingMedium: string;
  deliveryIn: string;
};

export type payloadType = {
  paymentID: string;
  products: CartProduct[];
  status: "pending";
  method: string;
  user_personal_details: user_personal_details_type;
  shipping_address: shipping_address_type;
  shipping_method_and_cost: shipping_method_and_cost_type;
};
// this will be the data structure while submitting data for checkout request in next js...
export type payloadStrapiDataType = {
  data: {
    paymentID: string;
    products: CartProduct[];
    status: "pending";
    method: string;
    user_personal_details: user_personal_details_type;
    shipping_address: shipping_address_type;
    shipping_method_and_cost: shipping_method_and_cost_type;
    userId: string;
  };
};


