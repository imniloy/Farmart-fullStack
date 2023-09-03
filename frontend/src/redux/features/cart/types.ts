export type CartProduct = {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null | undefined;
  stock: number;
  quantity: number;
  imageUrl: string;
  slug: string;
};

export type ProductQuantity = {
  id: number;
  oparationType: string;
  counter: number;
};
