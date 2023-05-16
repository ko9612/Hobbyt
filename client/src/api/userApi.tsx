import { MyInfoProps } from "../type/userTypes";
import { customAxios } from "../util/LoginRefresh";
import ErrorHandler from "./errorHandler";

// 비밀번호 변경
export const patchPaswword = async (data: any) => {
  try {
    const editPassword = await customAxios.patch(
      "/api/members/myPage/password",
      data,
    );
    return editPassword;
  } catch (err: any) {
    return err.response;
  }
};

// 내 정보 조회
export const getUserInfo = async () => {
  try {
    const userInfo = await customAxios.get("/api/members/myPage/info");
    return userInfo;
  } catch (err: any) {
    return err.response;
  }
};

// 내 정보 변경(비밀번호 제외)
export const patchUserInfo = async (data: MyInfoProps) => {
  try {
    const userInfo = await customAxios.patch("/api/members/myPage", data);
    return userInfo;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
