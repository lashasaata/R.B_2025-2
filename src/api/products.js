import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts(data) {
  try {
    const response = await axios.get(`${API_URL}products/`, { params: data });

    console.log("Got products:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting products:", error.response || error.message);
    return error.response;
  }
}

export async function getProduct(id) {
  try {
    const response = await axios.get(`${API_URL}products/${id}`);

    console.log("Got product details:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting product details:",
      error.response || error.message
    );
    return error.response;
  }
}
