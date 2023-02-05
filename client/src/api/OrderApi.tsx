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
    console.log(err);
    return ErrorHandler(err);
  }
};

// 주문 상세 조회
export const getOrderDetail = async (id: number | undefined) => {
  try {
    const OrderData = await axios.get(
      `http://59.12.62.150:8080/api/members/myPage/orders/${id}`,
    );
    return OrderData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 주문 취소
export const deleteOrder = async (id: any) => {
  try {
    const orderData = await axios.delete(
      `http://59.12.62.150:8080/api/sales/${id}`,
      {
        headers: { authorization: localStorage.getItem("authorization") },
      },
    );
    return orderData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
