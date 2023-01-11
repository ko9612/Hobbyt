// 블로그 api 모아두는 곳

import axios from "axios";

export const postBlogContent = async (data: any) => {
  try {
    const blogContent = await axios.post("/api/post", data);
    return blogContent;
  } catch (err: any) {
    return err.response;
  }
};

// 얘는 임시
export const patchBlogContent = async (data: any) => {
  try {
    const patchContent = await axios.patch("/api/post/{id}", data);
    return patchContent;
  } catch (err: any) {
    return err.response;
  }
};
