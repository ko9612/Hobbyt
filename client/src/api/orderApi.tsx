// 주문 api

import { customAxios } from "../util/LoginRefresh";
import ErrorHandler from "./errorHandler";

// 계좌이체 주문
export const postOrder = async (data: any) => {
  try {
    const orderData = await customAxios.post(`/api/orders`, data);
    return orderData;
  } catch (err: any) {
    return err.response;
  }
};

// 주문 상세 조회
export const getOrderDetail = async (id: number | undefined) => {
  try {
    const OrderData = await customAxios.get(`/api/members/myPage/orders/${id}`);
    return OrderData;
  } catch (err: any) {
    return err.response;
  }
};

// 주문 취소
export const deleteOrder = async (id: number) => {
  try {
    const orderData = await customAxios.delete(`/api/orders/${id}`);
    return orderData;
  } catch (err: any) {
    return err.response;
  }
};

// 주문 상태 변경
export const patchOrderState = async (data: any, orderId: number) => {
  try {
    const orderData = await customAxios.patch(
      `/api/members/myPage/orders/${orderId}/status`,
      data,
    );
    return orderData;
  } catch (err: any) {
    return err.response;
  }
};

// 주문 기본 정보 변경
export const patchOrderInfo = async (data: any, id: number) => {
  try {
    const orderData = await customAxios.patch(
      `/api/members/myPage/orders/${id}`,
      data,
    );
    return orderData;
  } catch (err: any) {
    return err.response;
  }
};

// 카드 결제 검증
export const postPayment = async (data: any) => {
  try {
    const orderData = await customAxios.post(
      `/api/orders/payment/complete`,
      data,
    );
    return orderData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
