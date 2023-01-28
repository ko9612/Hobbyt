// 프로필 관련 api
import axios from "axios";
import ErrorHandler from "./errorHandler";

// 프로필 조회
export const getBlogProfile = async (userId: number) => {
  try {
    const blogProfile = await axios.get(`/api/members/profile/${userId}`);
    return blogProfile;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 프로필 수정 api
export const patchBlogProfile = async (data: any) => {
  try {
    const blogProfile = await axios.patch("/api/members/profile", data, {
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    });
    return blogProfile;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
