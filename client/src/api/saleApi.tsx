// 판매 api

import axios from "axios";
import ErrorHandler from "./errorHandler";

// 판매 게시글 작성
const postSaleWrite = async (data: any) => {
  try {
    const saleWriteData = await axios.post(
      "http://59.12.62.150:8080/api/sales",
      data,
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      },
    );
    return saleWriteData;
  } catch (err: unknown) {
    console.log(err);
    return ErrorHandler(err);
  }
};

export default postSaleWrite;

// 판매 게시글 상세 조회
export const getSaleDetail = async (id: number | undefined) => {
  try {
    const SaleContent = await axios.get(
      `http://59.12.62.150:8080/api/sales/${id}`,
    );
    return SaleContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 판매 게시글 수정
export const patchSaleContent = async (data: any, id: number) => {
  try {
    const SaleContent = await axios.patch(
      `http://59.12.62.150:8080/api/sales/${id}`,
      data,
      {
        headers: { authorization: localStorage.getItem("authorization") },
      },
    );
    return SaleContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 판매 게시글 삭제
export const deleteSaleContent = async (id: any) => {
  try {
    const saleContent = await axios.delete(
      `http://59.12.62.150:8080/api/sales/${id}`,
      {
        headers: { authorization: localStorage.getItem("authorization") },
      },
    );
    return saleContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 판매 게시글 좋아요
export const postSaleLike = async (id: any) => {
  try {
    const likeData = await axios.post(
      `/api/sales/${id}/like`,
      {},
      {
        headers: { authorization: localStorage.getItem("authorization") },
      },
    );
    return likeData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
