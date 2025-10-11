import axios from "axios";
const API_URL = "https://api.redseam.redberryinternship.ge/api/";

export async function addToCart(payload, productId) {
  const user = await JSON.parse(localStorage.getItem("user"));
  try {
    const response = await axios.post(
      `${API_URL}cart/products/${productId}/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Add to cart failed:", error.response?.data || error.message);
    return error;
  }
}

export async function getCart() {
  const user = await JSON.parse(localStorage.getItem("user"));
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

export async function updateCart(id, quantity, color, size) {
  const user = await JSON.parse(localStorage.getItem("user"));
  if (user) {
    try {
      const response = await axios.patch(
        `${API_URL}cart/products/${id}`,
        { quantity: quantity, color: color, size: size },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("Cart updated:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error updating the cart:",
        error.response || error.message
      );
      return error.response;
    }
  }
}

export async function deleteProduct(id, color, size) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    try {
      const response = await axios.delete(`${API_URL}cart/products/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          color: color,
          size: size,
        },
      });

      console.log("Product has been removed:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error removing the product:",
        error.response || error.message
      );
      return error.response;
    }
  }
}

export async function checkout(payload) {
  const user = await JSON.parse(localStorage.getItem("user"));
  try {
    const response = await axios.post(`${API_URL}cart/checkout`, payload, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    console.log("Checkouted:", response.data);
    return response;
  } catch (error) {
    console.error("Error checking out:", error.response || error.message);
    return error.response;
  }
}
