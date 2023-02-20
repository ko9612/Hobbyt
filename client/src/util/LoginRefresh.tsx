import axios, { AxiosInstance } from "axios";
import { postReToken } from "../api/signApi";
import { getAccessToken, setTokens } from "./token";

// 액세스 토큰 갱신 로직
export const refreshAccessToken = async () => {
  try {
    const res = await postReToken();
    const newAccessToken = (res as any).headers.authorization;
    const newRefreshToken = (res as any).headers.refreshToken;
    setTokens(newAccessToken, newRefreshToken);

    return { newAccessToken, newRefreshToken };
  } catch (err: any) {
    if (
      err.response &&
      err.response.status === 401 &&
      err.response.data === "EXPIRED_TOKEN"
    ) {
      localStorage.clear();
      window.location.href = "/signin";
    } else {
      throw err;
    }
  }
};

export const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Authorization: getAccessToken(),
  },
});

customAxios.interceptors.request.use(
  config => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  error => Promise.reject(error),
);

customAxios.interceptors.response.use(
  response => response,
  async err => {
    const {
      config,
      response: { status },
    } = err;
    // Access Token was expired
    if (config.url !== "/signin" && status === 401) {
      setTimeout(async () => {
        const { newAccessToken } = await refreshAccessToken();

        const modifiedConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: newAccessToken,
          },
        };
        return customAxios(modifiedConfig);
      }, 30000);
    }

    return Promise.reject(err);
  },
);

export default customAxios;
