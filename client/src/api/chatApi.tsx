import { customAxios } from "../util/LoginRefresh";
import ErrorHandler from "./errorHandler";

// 채팅방 목록 조회 api
export const getChatRoomList = async () => {
  try {
    const chatRoom = await customAxios.get(`/api/chatrooms`);
    return chatRoom;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 채팅방 아이디 목록 조회 api
export const getChatRoomIdList = async () => {
  try {
    const chatRoomId = await customAxios.get(`/api/chatrooms/ids`);
    return chatRoomId;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 채팅방 대화 내역 조회 api
export const getChatRoomMessage = async (chatRoomId: number) => {
  try {
    const chatMessage = await customAxios.get(`/api/chatrooms/${chatRoomId}`);
    return chatMessage;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 채팅방 id 조회 api
export const postChatRoomId = async (data: any) => {
  try {
    const chatRoomId = await customAxios.post(`/api/chatrooms`, data);
    return chatRoomId;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
