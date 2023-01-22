import { AxiosError } from "axios";

export default function ErrorHandler(Error: any | AxiosError) {
  // const status = Error.status as string;
  const status = Error.response.status as string;
  let message: string;
  switch (status) {
    case "404":
      message = "404 존재하지 않는 페이지입니다";
      break;
    default:
      message = `${status}, 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.`;
      break;
  }
  return message;
}
