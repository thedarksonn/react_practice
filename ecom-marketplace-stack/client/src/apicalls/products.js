import { axiosInstance } from "./axiosInstance";
const api = 'http://localhost:5000'

// register user
export const AddProduct = async (payload) => {
    try {
        const response = await axiosInstance.post(api + '/api/products/add-product', payload)
        return response.data
    } catch (error) {
        return error.message
    }
}


// get products
export const GetProducts = async () => {
    try {
        const response = await axiosInstance.get(api + '/api/products/get-products')
        return response.data
    } catch (error) {
        return error.message
    }
}


// register user
export const EditProduct = async (id, payload) => {
    try {
        const response = await axiosInstance.put(api + `/api/products/edit-product/${id}`, payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

