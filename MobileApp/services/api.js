// services/api.js
import axios from 'axios';

const API_URL_products = 'http://192.168.0.105:5296/api'; 
const API_URL_cart = 'http://192.168.0.105:5281/api'; 
const API_URL_order = 'http://192.168.0.105:7022/api'; 

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL_products}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.message, error.config);
  }
};

export const getCart = async (userId) => {
  try {
    const response = await axios.get(`${API_URL_cart}/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

export const addProductToCart = async (userId, productId, quantity) => {
  try {
    await axios.post(`${API_URL_cart}/cart/add/${userId}`, { productId, quantity });
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};

export const updateProductQuantity = async (userId, productId, quantity) => {
  try {
    await axios.put(`${API_URL_cart}/cart/update/${userId}`, { productId, quantity });
  } catch (error) {
    console.error('Error updating product quantity:', error);
  }
};

export const checkoutCart = async (userId) => {
  try {
    await axios.post(`${API_URL_cart}/cart/checkout/1`);
  } catch (error) {
    console.error('Error during checkout:', error);
  }
};
