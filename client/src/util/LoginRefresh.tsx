import axios, { AxiosInstance } from "axios";
import { postReToken } from "../api/signApi";

export const getAccessToken = () => {
  let accessToken: any = "";
  if (typeof window !== "undefined") {
    accessToken = `Bearer ${localStorage.getItem("authorization")}`;
  }

  return accessToken;
};

export const refreshAccessToken = async () => {
  try {
    const res = await postReToken();
    const accessToken = (res as any).headers.authorization;
    const refreshToken = (res as any).headers.refreshtoken;
    localStorage.setItem("authorization", accessToken);
    localStorage.setItem("refresh", refreshToken);
    return `Bearer ${accessToken}`;
  } catch (err: any) {
    if (
      err.response &&
      err.response.status === 401 &&
      err.response.data === "UNAUTHORIZED"
    ) {
      localStorage.clear();
      window.location.href = "/signin";
    } else {
      return err;
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
      const newAccessToken = await refreshAccessToken();

      const modifiedConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: newAccessToken,
        },
      };
      return customAxios(modifiedConfig);
    }

    return Promise.reject(err);
  },
);

export default customAxios;
