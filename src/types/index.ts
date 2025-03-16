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
  id:number;
  quantity: number;
  selectedSize: string;
  price:number;
  productId:string;
}

export interface Auth {
  name: string;
  email: string;
  role: string;
}

export interface FilterState {
  sizes: string[];
  priceRange: [number, number];
  category: string;
}

export interface Order {
  email:string;
  firstName: string;
  lastName: string;
  address:string;
  city:string;
  postalCode:string;
  products: {
    productId: string;
    quantity: number;
    size: string;
  }[];
  totalPrice:number;
}