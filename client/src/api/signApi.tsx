import axios from "axios";
import ErrorHandler from "./errorHandler";
import { SigninInputs, SignupInputs } from "../type/userTypes";

// 회원가입
export const postsignupSubmit = async (data: SignupInputs) => {
  try {
    const signupUserData = await axios.post(
      "http://59.12.62.150:8080/api/members/signup",
      data,
    );
    return signupUserData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 이메일 인증 번호
export const postSignupEmailBut = async (data: string) => {
  try {
    const signupEmailData = await axios.post(
      "http://59.12.62.150:8080/api/auth/code",
      data,
    );
    return signupEmailData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 로그인
export const postSignin = async (data: SigninInputs) => {
  try {
    const signinUserData = await axios.post(
      "http://59.12.62.150:8080/api/auth/login",
      data,
    );
    return signinUserData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// refreshToken
export const postReToken = async () => {
  try {
    const tokenData = await axios.post(
      "http://59.12.62.150:8080/api/auth/reissue",
      "",
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
          refreshtoken: localStorage.getItem("refresh"),
        },
      },
    );
    return tokenData;
  } catch (err: unknown) {
    console.log(err);
    return ErrorHandler(err);
  }
};

// 로그아웃
export const postSignout = async () => {
  try {
    const outUserData = await axios.post(
      "http://59.12.62.150:8080/api/auth/logout",
      "",
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      },
    );
    return outUserData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 회원탈퇴
export const delAccount = async () => {
  try {
    const delUserData = await axios.delete(
      "http://59.12.62.150:8080/api/members/myPage/delete",
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      },
    );
    return delUserData;
  } catch (err: any) {
    return err.response;
  }
};

//
