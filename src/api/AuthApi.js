import api from "../utils/AxiosInterceptor";
import { API_URL } from "./ApiConfig";

export const login = async (data) => {
  const response = await api.post(`${API_URL}/auth/login`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const logout = async () => {
  const response = await api.post(`${API_URL}/auth/logout`);
  return response;
};
