// 프로필 관련 api
import axios from "axios";
import { customAxios } from "../util/LoginRefresh";
import ErrorHandler from "./errorHandler";

// 프로필 조회 (비회원용)
export const getBlogProfile = async (homeUserId: number) => {
  try {
    const blogProfile = await axios.get(
      `/api/members/${homeUserId}/private/profile`,
    );
    return blogProfile;
  } catch (err: any) {
    return err.response;
  }
};

// 프로필 조회 (회원용)
export const getBlogLoginProfile = async (homeUserId: number) => {
  try {
    const blogProfile = await customAxios.get(
      `/api/members/${homeUserId}/private/profile`,
    );
    return blogProfile;
  } catch (err: any) {
    return err.response;
  }
};

// 블로그 프로필 수정 api
export const patchBlogProfile = async (homeUserId: number, data: any) => {
  try {
    const blogProfile = await customAxios.patch(
      `/api/members/${homeUserId}/private/profile`,
      data,
    );
    return blogProfile;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
