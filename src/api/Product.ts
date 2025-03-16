import {Product} from "../types";
import axios from "axios";


const token = localStorage.getItem('token');

export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await axios.get<Product[]>('http://localhost:3003/api/v1/products/all',{
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return [];
    }
}

export async function fetchProductsById(id): Promise<Product> {
    try {
        const response = await axios.get<Product>(`http://localhost:3003/api/v1/products/getProductById/${id}`,
            {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }}
        );
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return;
    }
}