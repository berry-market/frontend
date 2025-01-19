import api from "../utils/AxiosInterceptor";
import { API_URL } from "./ApiConfig";

export const getCategories = async () => {
  const response = await api.get(`${API_URL}/categories`);
  return response.data;
};
