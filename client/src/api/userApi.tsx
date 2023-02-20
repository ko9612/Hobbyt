import { PasswordProps, MyInfoProps } from "../type/userTypes";
import { customAxios } from "../util/LoginRefresh";
import ErrorHandler from "./errorHandler";

// 비밀번호 변경
export const patchPaswword = async (data: PasswordProps) => {
  try {
    const editPassword = await customAxios.patch(
      "http://59.12.62.150:8080/api/members/myPage/password",
      data,
    );
    return editPassword;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 내 정보 조회
export const getUserInfo = async () => {
  try {
    const userInfo = await customAxios.get(
      "http://59.12.62.150:8080/api/members/myPage/info",
    );
    return userInfo;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 내 정보 변경(비밀번호 제외)
export const patchUserInfo = async (data: MyInfoProps) => {
  try {
    const userInfo = await customAxios.patch(
      "http://59.12.62.150:8080/api/members/myPage",
      data,
    );
    return userInfo;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
