import axios from "axios";
import ErrorHandler from "./errorHandler";

export const postsignupSubmit = async (data: any) => {
  try {
    const signupUserData = await axios.post(
      "http://ec2-15-164-199-88.ap-northeast-2.compute.amazonaws.com:8080/api/members/signup",
      data,
    );
    return signupUserData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

export const postSignupEmailBut = async (data: any) => {
  try {
    const signupEmailData = await axios.post(
      "http://ec2-15-164-199-88.ap-northeast-2.compute.amazonaws.com:8080/api/auth/code",
      data,
    );
    return signupEmailData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

export const postSignin = async (data: any) => {
  try {
    const signinUserData = await axios.post(
      "http://ec2-15-164-199-88.ap-northeast-2.compute.amazonaws.com:8080/api/auth/login",
      data,
    );
    return signinUserData;
  } catch (err: unknown) {
    // console.log(err.response);
    return ErrorHandler(err);
  }
};

export const postReToken = async () => {
  try {
    const tokenData = await axios.post(
      "http://ec2-15-164-199-88.ap-northeast-2.compute.amazonaws.com:8080/api/auth/reissue",
      "",
      {
        headers: {
          RefreshToken: localStorage.getItem("refresh-token"),
        },
      },
    );
    return tokenData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

export const postSignout = async () => {
  try {
    const outUserData = await axios.post(
      "http://ec2-15-164-199-88.ap-northeast-2.compute.amazonaws.com:8080/api/auth/logout",
      "",
      {
        headers: { Authorization: localStorage.getItem("authorization") },
      },
    );
    return outUserData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

export const delAccount = async () => {
  try {
    const delUserData = await axios.delete(
      "http://ec2-15-164-199-88.ap-northeast-2.compute.amazonaws.com:8080/api/members/myPage/delete",
    );
    return delUserData;
  } catch (err: any) {
    return err.response;
  }
};
