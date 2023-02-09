// 프로필 관련 api
import axios from "axios";
import ErrorHandler from "./errorHandler";

// 프로필 조회 (비회원용)
export const getBlogProfile = async (homeUserId: number) => {
  try {
    const blogProfile = await axios.get(`/api/members/${homeUserId}/profile`);
    return blogProfile;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 프로필 조회 (회원용)
export const getBlogLoginProfile = async (homeUserId: number) => {
  try {
    const blogProfile = await axios.get(`/api/members/${homeUserId}/profile`, {
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    });
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

// 이미지 업로드
export const postImageUpload = async (data: any) => {
  try {
    const Image = await axios.post("/api/images", data, {
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    });
    return Image;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 썸네일 업로드
export const postThumbnailUpload = async (data: any) => {
  try {
    const Image = await axios.post("/api/images", data, {
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    });
    return Image;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
