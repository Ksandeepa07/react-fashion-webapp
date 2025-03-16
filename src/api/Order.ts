import {Order, Product} from "../types";
import axios from "axios";
import toast from "react-hot-toast";


const token = localStorage.getItem('token');


export const saveOrder = async (Order): Promise<boolean> => {

    try {
        const response = await axios.post<Order>('http://localhost:3003/api/v1/orders/save', Order,{
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        });
        toast.success(response.data.message)
        return true;
        // return JSON.stringify({ message: response.data.message, data:response.data});
    } catch (error) {
        if (error.response.status==401){
            toast.error(error.response.data.message)
        }
        console.error("Error creating account:", error.message);
        return false;
        // return JSON.stringify({ message: "Error creating account", data:error.message });

    }

}