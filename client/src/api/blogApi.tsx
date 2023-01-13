// 블로그 api 모아두는 곳

import axios from "axios";
import ErrorHandler from "./errorHandler";

export const postBlogContent = async (data: any) => {
  try {
    const blogContent = await axios.post("/api/post", data);
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 얘는 임시
export const patchBlogContent = async (data: any) => {
  try {
    const patchContent = await axios.patch("/api/post/{id}", data);
    return patchContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
