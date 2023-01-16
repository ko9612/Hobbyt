// 프로필 관련 api
import axios from "axios";
import ErrorHandler from "./errorHandler";

// 프로필 조회
// 수정해서 사용해 주세요
export const getBlogProfile = async (data: any) => {
  try {
    const blogProfile = await axios.post("/api/members/profile", data, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return blogProfile;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 프로필 수정 api
export const postBlogProfile = async (data: any) => {
  try {
    const blogProfile = await axios.post("/api/members/profile", data, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return blogProfile;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
