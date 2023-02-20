import { customAxios } from "../util/LoginRefresh";
import ErrorHandler from "./errorHandler";

// 알림 SSE 구독 api
export const getSSE = async () => {
  try {
    const sse = await customAxios.get("/api/notifications/subscribe");
    return sse;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 알림 목록 조회
export const getNotice = async () => {
  try {
    const noticeList = await customAxios.get(
      "/api/notifications?offset=0&limit=10",
    );
    return noticeList;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 알림 체크
export const patchNotice = async (notificationId: number) => {
  try {
    const noticeList = await customAxios.patch(
      `/api/notifications/${notificationId}`,
    );
    return noticeList;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
