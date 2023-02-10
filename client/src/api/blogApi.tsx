// 블로그 api 모아두는 곳

import axios from "axios";
import ErrorHandler from "./errorHandler";

// 블로그 게시글 상세 조회 api
export const getBlogDetail = async (id: number | undefined) => {
  try {
    const blogContent = await axios.get(`/api/posts/${id}`);
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
export const patchBlogContent = async (data: any, postId: number) => {
  try {
    const blogContent = await axios.patch(`/api/posts/${postId}`, data, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 게시글 삭제 api
export const deleteBlogContent = async (id: any) => {
  try {
    const blogContent = await axios.delete(`/api/posts/${id}`, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

/// ///////////////////////////////

// 블로그 댓글 작성 api
export const postBlogComment = async (data: any) => {
  try {
    const blogComment = await axios.post("/api/post-comments", data, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return blogComment;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 댓글 수정 api
export const patchBlogComment = async (data: any, id: any) => {
  try {
    const blogComment = await axios.patch(`/api/post-comments/${id}`, data, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return blogComment;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 댓글 삭제 api
export const deleteBlogComment = async (id: any) => {
  try {
    const blogComment = await axios.delete(`/api/post-comments/${id}`, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return blogComment;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

/// ///////////////////////////////

// 블로그 좋아요 api
export const postLikePlus = async (postId: number) => {
  try {
    const likeData = await axios.post(
      `/api/posts/${postId}/like`,
      {},
      {
        headers: { Authorization: localStorage.getItem("authorization") },
      },
    );
    return likeData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 이미지 업로드
export const postImageUpload = async (data: any) => {
  try {
    const Image = await axios.post("/api/images", data, {
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    });
    return Image;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 썸네일 업로드
export const postThumbnailUpload = async (data: any) => {
  try {
    const Image = await axios.post("/api/images/thumbnails", data, {
      headers: {
        Authorization: localStorage.getItem("authorization"),
      },
    });
    return Image;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
