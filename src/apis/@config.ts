/* eslint-disable @typescript-eslint/no-unused-vars */
// test
import axios, { AxiosError } from "axios";

import TokenService from "@/utils/tokenService";
import userApi from "./user";

const apiBaseUrl = "/api";

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: 5000,
});

// 요청
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답
api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const { response, config } = error;

    if (response?.status === 401 && config) {
      try {
        const response = await userApi.postCreateAccessByRefresh();
        TokenService.setToken(response.token);
        api.defaults.headers.common.Authorization = `Bearer ${response.token}`;
        if (config?.headers) {
          config.headers.Authorization = `Bearer ${response.token}`;
        }
        return api(config);
      } catch (err) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
