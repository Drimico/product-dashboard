import axios, { type InternalAxiosRequestConfig } from "axios";
import { refresh } from "./requests.ts";
import { loginPath, refreshTokenPath } from "../config/path.config.ts";
import { useUserStore } from "@/stores/useUserStore.ts";
import globalRouter from "@/utils/globalRouter.ts";
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error("Request config is undefined");
    }
    const { user } = useUserStore.getState();
    const token = user?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!config.headers["Content-Type"] && !(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { addTokens, deleteTokens, tokens } = useUserStore.getState();
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      const isAuthEndpoint =
        originalRequest.url.includes(loginPath) || originalRequest.url.includes(refreshTokenPath);

      if (!isAuthEndpoint) {
        originalRequest._retry = true;
        const refreshToken = tokens.refreshToken;

        if (refreshToken) {
          try {
            const data = await refresh(refreshToken);
            addTokens(data.access_token, data.refresh_token);

            originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
            return api(originalRequest);
          } catch (refreshError) {
            deleteTokens();
            globalRouter.navigate?.("/login");
            return Promise.reject(refreshError);
          }
        } else {
          globalRouter.navigate?.("/login");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
