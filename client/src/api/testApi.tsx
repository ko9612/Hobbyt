import axios from "axios";
import ErrorHandler from "./errorHandler";

export const getServerHealth = async () => {
  try {
    const test = await axios.get("/api/healthcheck");
    return test;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 임시로 적어둔 것입니다! 나중에 지울 예정
export const getcheck = () => {};
