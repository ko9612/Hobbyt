import axios from "axios";
import ErrorHandler from "./errorHandler";

export const postsignupSubmit = async (data: any) => {
  try {
    const signupUserData = await axios.post(
      "http://localhost:8080/api/members/signup",
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
      "http://localhost:8080/api/auth/code",
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
      "http://localhost:8080/api/auth/login",
      data,
    );
    return signinUserData;
  } catch (err: unknown) {
    console.log(err.response);
    return ErrorHandler(err);
  }
};

export const postReToken = async (data: any) => {
  try {
    const tokenData = await axios.post(
      "http://localhost:8080/api/auth/reissue",
      data,
    );
    return tokenData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
