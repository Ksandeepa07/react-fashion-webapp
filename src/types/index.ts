// export interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   images: string[];
//   sizes: string[];
//   colors: string[];
//   category: string;
//   brand: string;
// }


export interface Product {
  _id?: string;
  images: string[];
  variations: Omit<ProductVariation, "id">[];
  name: string;
  description: string
  category:string
  createdAt?: string;
}

export interface ProductVariation {
  _id?: string;
  id: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface FilterState {
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  category: string;
}