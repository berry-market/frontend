import axios from "axios";
import { SERVER_URL } from "../api/ApiConfig";

const api = axios.create({
  baseURL: `http://${SERVER_URL}`,
  timeout: 10000,
  withCredentials: true,
});

// 요청 인터셉트
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("Authorization");

    if (token === "Bearer undefined") {
      console.warn("Invalid token found in localStorage. Clearing...");
      localStorage.removeItem("Authorization");
    }

    // 토큰 있으면 헤더에 추가
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉트
api.interceptors.response.use(
  (response) => {
    // 새 액세스 토큰 헤더에 있으면 저장
    const newAccessToken = response.headers["new-access-token"];
    if (newAccessToken) {
      localStorage.setItem("Authorization", `Bearer ${newAccessToken}`);
    }
    return response;
  },
  (error) => {
    // 에러 응답 처리
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message;
      console.log(errorMessage);

      if (
        errorMessage === "Invalid or expired token" ||
        errorMessage === "Access token is blacklisted"
      ) {
        localStorage.removeItem("Authorization");
        localStorage.removeItem("user");

        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
