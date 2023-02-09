// 주문 api

import axios from "axios";
import ErrorHandler from "./errorHandler";

// 계좌이체 주문
export const postOrder = async (data: any) => {
  try {
    const orderData = await axios.post(
      `http://59.12.62.150:8080/api/orders`,
      data,
      {
        headers: { authorization: localStorage.getItem("authorization") },
      },
    );
    return orderData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 주문 상세 조회
export const getOrderDetail = async (id: number | undefined) => {
  try {
    const OrderData = await axios.get(
      `http://59.12.62.150:8080/api/members/myPage/orders/${id}`,
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      },
    );
    return OrderData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 주문 취소
export const deleteOrder = async (id: number) => {
  try {
    const orderData = await axios.delete(
      `http://59.12.62.150:8080/api/orders/${id}`,
      {
        headers: { authorization: localStorage.getItem("authorization") },
      },
    );
    return orderData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 주문 상태 변경
export const patchOrderState = async (data: any, orderId: number) => {
  try {
    const orderData = await axios.patch(
      `http://59.12.62.150:8080/api/members/myPage/orders/${orderId}/status`,
      data,
      {
        headers: { authorization: localStorage.getItem("authorization") },
      },
    );
    return orderData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 주문 기본 정보 변경
export const patchOrderInfo = async (data: any, id: number) => {
  try {
    const orderData = await axios.patch(
      `http://59.12.62.150:8080/api/members/myPage/orders/${id}`,
      data,
      {
        headers: { authorization: localStorage.getItem("authorization") },
      },
    );
    return orderData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 카드 결제 검증
export const postPayment = async (data: any) => {
  try {
    const orderData = await axios.post(
      `http://59.12.62.150:8080/api/orders/payment/complete`,
      data,
      {
        headers: { authorization: localStorage.getItem("authorization") },
      },
    );
    return orderData;
  } catch (err: unknown) {
    console.log(err);
    return ErrorHandler(err);
  }
};
