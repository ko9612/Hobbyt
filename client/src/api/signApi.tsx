import axios from "axios";
import ErrorHandler from "./errorHandler";
import { SigninInputs, PostSignupInputs } from "../type/userTypes";
import { customAxios } from "../util/LoginRefresh";

// 회원가입
export const postsignupSubmit = async (data: PostSignupInputs) => {
  try {
    const signupUserData = await axios.post("/api/members/signup", data);
    return signupUserData;
  } catch (err: any) {
    return err.response;
  }
};

// 이메일 인증 번호
export const postSignupEmailBut = async (data: any) => {
  try {
    const signupEmailData = await axios.post("/api/auth/code", data);
    return signupEmailData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 로그인
export const postSignin = async (data: SigninInputs) => {
  try {
    const signinUserData = await axios.post("/api/auth/login", data);
    console.log(signinUserData);
    return signinUserData;
  } catch (err: any) {
    return err.response;
  }
};

// refreshToken
export const postReToken = async () => {
  try {
    const tokenData = await axios.post("/api/auth/reissue", "", {
      headers: {
        refreshtoken: localStorage.getItem("refresh"),
      },
    });
    console.log("토큰 갱신");
    return tokenData;
  } catch (err: any) {
    return ErrorHandler(err);
  }
};

// 로그아웃
export const postSignout = async () => {
  try {
    const outUserData = await customAxios.post("/api/auth/logout");
    return outUserData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 회원탈퇴
export const delAccount = async () => {
  try {
    const delUserData = await customAxios.delete("/api/members/myPage/delete");
    return delUserData;
  } catch (err: any) {
    return err.response;
  }
};

// 로그인 이후 정보 조회
export const getOauthInfo = async () => {
  try {
    const userData = await customAxios.get(`/api/auth/loginInfo`);
    return userData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
