import axios from "axios";
import toast from "react-hot-toast";
import {Auth} from "../types";

export const saveRegister = async (Auth): Promise<String> => {
    try {
        const response = await axios.post<Auth>('http://localhost:3003/api/v1/auth/register', Auth);
        toast.success(response.data.message)
        return JSON.stringify({ message: response.data.message, data:response.data });
    } catch (error) {
        console.error("Error creating account:", error.message);
        toast.error(error.message)
        return JSON.stringify({ message: "Error creating account", data:error.data });
    }
};