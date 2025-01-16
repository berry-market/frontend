import api from "../utils/AxiosInterceptor";
import { API_URL } from "./ApiConfig";

// 결제 임시 데이터 저장
export const saveTempPayment = async (orderId, amount) => {
  return await api.post(`${API_URL}/payments`, { orderId, amount });
};

// 결제 승인 요청
export const confirmPayment = async (requestData) => {
  return await api.post(`${API_URL}/payments/confirm`, requestData);
};
