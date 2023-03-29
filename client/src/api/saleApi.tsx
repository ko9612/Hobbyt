// 판매 api

import axios from "axios";
import { customAxios } from "../util/LoginRefresh";
import ErrorHandler from "./errorHandler";

// 판매 게시글 작성
export const postSaleWrite = async (data: any) => {
  try {
    const saleWriteData = await customAxios.post("/api/sales", data);
    return saleWriteData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 판매 게시글 상세 조회
export const getSaleDetailAnons = async (id: number | undefined) => {
  try {
    const SaleContent = await axios.get(`/api/sales/${id}`);
    return SaleContent;
  } catch (err: any) {
    return err.response;
  }
};

export const getSaleDetail = async (id: number | undefined) => {
  try {
    const SaleContent = await customAxios.get(`/api/sales/${id}`);
    return SaleContent;
  } catch (err: any) {
    return err.response;
  }
};

// 판매 게시글 수정
export const patchSaleContent = async (data: any, id: number) => {
  try {
    const SaleContent = await customAxios.patch(`/api/sales/${id}`, data);
    return SaleContent;
  } catch (err: any) {
    return err.response;
  }
};

// 판매 게시글 삭제
export const deleteSaleContent = async (id: any) => {
  try {
    const saleContent = await customAxios.delete(`/api/sales/${id}`);
    return saleContent;
  } catch (err: any) {
    return err.response;
  }
};

// 판매 게시글 좋아요
export const postSaleLike = async (id: any) => {
  try {
    const likeData = await customAxios.post(`/api/sales/${id}/like`);
    return likeData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
