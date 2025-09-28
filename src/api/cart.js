import axios from "axios";
const API_URL = "https://api.redseam.redberryinternship.ge/api/";
const user = JSON.parse(localStorage.getItem("user"));

export async function addToCart(payload, productId) {
  if (user) {
    try {
      const response = await axios.post(
        `${API_URL}cart/products/${productId}/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      console.error(
        "Add to cart failed:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

export async function getCart() {
  if (user) {
    try {
      const response = await axios.get(`${API_URL}cart`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log("Got cart items:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting cart:", error.response || error.message);
      return error.response;
    }
  }
}

export async function checkout(payload) {
  if (user) {
    try {
      const response = await axios.post(`${API_URL}cart/checkout`, payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log("Checkouted:", response.data);
      return response;
    } catch (error) {
      console.error("Error checking out:", error.response || error.message);
      return error.response;
    }
  }
}
