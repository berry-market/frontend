import api from "../utils/AxiosInterceptor";
import { API_URL } from "./ApiConfig";

export const getCategories = async () => {
  const response = await api.get(`${API_URL}/categories`);
  return response.data;
};

export const getPosts = async (params = {}) => {
  const response = await api.get(`${API_URL}/posts`, { params });
  return response.data;
};

export const getPost = async (postId) => {
  const response = await api.get(`${API_URL}/posts`, { postId });
  return response.data;
};

export const createLike = async (postId) => {
  const response = await api.post(`${API_URL}/likes`, { postId });
  return response.data;
};

export const deleteLike = async (postId) => {
  const response = await api.delete(`${API_URL}/likes`, { params: { postId } });
  return response.data;
};
