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
