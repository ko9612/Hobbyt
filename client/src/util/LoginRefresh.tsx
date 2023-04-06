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
  const res = await postReToken();

  if (res.status === 200) {
    const accessToken = res.headers.authorization;
    localStorage.setItem("authorization", accessToken);
  } else {
    localStorage.clear();
    window.location.href = "/signin";
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
