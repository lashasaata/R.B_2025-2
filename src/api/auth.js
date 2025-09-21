import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(data) {
  try {
    const response = await axios.post(`${API_URL}register/`, data);

    console.log("Registration successful:", response.data);
    return response;
  } catch (error) {
    console.error("Error registering user:", error.response || error.message);
    return error.response;
  }
}
export async function loginUser(data) {
  try {
    const response = await axios.post(`${API_URL}login/`, data);

    console.log("Logined successfuly:", response.data);
    return response;
  } catch (error) {
    console.error(
      "Error loginning user:",
      error.response?.data || error.message
    );
    return error.response;
  }
}
