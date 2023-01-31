import axios from "axios";
import ErrorHandler from "./errorHandler";

// 알림 SSE 구독 api
export const getSSE = async () => {
  try {
    const sse = await axios.get("/api/notifications/subscribe", {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return sse;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 알림 목록 조회
export const getNotice = async () => {
  try {
    const noticeList = await axios.get("/api/notifications?offset=0&limit=10", {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return noticeList;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 알림 체크
export const patchNotice = async (notificationId: number) => {
  try {
    const noticeList = await axios.patch(
      `/api/notifications/${notificationId}`,
      {
        headers: { Authorization: localStorage.getItem("authorization") },
      },
    );
    return noticeList;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
