import axios from "axios";

const API_URL = "https://api.redseam.redberryinternship.ge/api/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export async function addToCart(payload, productId) {
  try {
    const response = await api.post(`cart/products/${productId}/`, payload);
    return response.data;
  } catch (error) {
    console.error("Add to cart failed:", error.response?.data || error.message);
    throw error;
  }
}

export async function getCart() {
  try {
    const response = await api.get("cart");
    return response.data;
  } catch (error) {
    console.error("Error getting cart:", error.response?.data || error.message);
    return error.response;
  }
}

export async function checkout(payload) {
  try {
    const response = await api.post("cart/checkout", payload);
    return response.data;
  } catch (error) {
    console.error("Error checking out:", error.response?.data || error.message);
    return error.response;
  }
}
