import api from "../utils/AxiosInterceptor";
import { API_URL } from "./ApiConfig";

export const signup = async (member) => {
  const response = await api.post(`${API_URL}/users/sign-up`, member);
  return response.data;
};

export const checkIdDuplicate = async (nickname) => {
  const response = await api.get(`${API_URL}/users/check-id/${nickname}`);
  return response.data;
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user info for userId: ${userId}`, error);
    throw error;
  }
};
