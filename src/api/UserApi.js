import api from "../utils/AxiosInterceptor";
import { API_URL } from "./ApiConfig";

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user info for userId: ${userId}`, error);
    throw error;
  }
};
