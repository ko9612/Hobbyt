// 블로그 api 모아두는 곳

import axios from "axios";
import ErrorHandler from "./errorHandler";

// 블로그 게시글 리스트 조회 api
export const getBlogContent = async (
  userId: number,
  off: number,
  lim: number,
) => {
  try {
    const blogContent = await axios.get(
      `/api/members/${userId}/private/posts?offset=${off}&limit=${lim}`,
    );
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 게시글 상세 조회 api
export const getBlogDetail = async (id: number) => {
  try {
    const blogContent = await axios.get(`/api/posts/${id}`, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 게시글 작성 api
export const postBlogContent = async (data: any) => {
  try {
    const blogContent = await axios.post("/api/posts", data, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 게시글 수정 api
export const patchBlogContent = async (data: any, id: any) => {
  try {
    const blogContent = await axios.patch(`/api/posts/${id}`, data);
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 게시글 삭제 api
export const deleteBlogContent = async (id: any) => {
  try {
    const blogContent = await axios.delete(`/api/posts/${id}`);
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 댓글 작성 api
export const postBlogComment = async (data: any) => {
  try {
    const blogComment = await axios.post("/api/post-comments", data);
    return blogComment;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 댓글 수정 api
export const patchBlogComment = async (data: any, id: any) => {
  try {
    const blogComment = await axios.patch(`/api/post-comments/${id}`, data);
    return blogComment;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 댓글 삭제 api
export const deleteBlogComment = async (id: any) => {
  try {
    const blogComment = await axios.delete(`/api/post-comments/${id}`);
    return blogComment;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 좋아요 추가 api
export const postLikePlus = async (id: any) => {
  try {
    const likeData = await axios.post(`/api/posts/${id}/like`);
    return likeData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 좋아요 취소 api
export const deleteLikeMinus = async (id: any) => {
  try {
    const likeData = await axios.post(`/api/posts/${id}/like`);
    return likeData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
