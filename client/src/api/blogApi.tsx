import axios from "axios";
import {
  AxiosBlogPostSubmitType,
  PostBlogEditRequestDataType,
} from "../type/blogType";
import { customAxios } from "../util/LoginRefresh";
import ErrorHandler from "./errorHandler";

// 블로그 게시글 상세 조회 api
export const getBlogDetailAnons = async (id: number | undefined) => {
  try {
    const blogContent = await axios.get(`/api/posts/${id}`);
    return blogContent;
  } catch (err: any) {
    return err.response;
  }
};

export const getBlogDetail = async (id: number | undefined) => {
  try {
    const blogContent = await customAxios.get(`/api/posts/${id}`);
    return blogContent;
  } catch (err: any) {
    return err.response;
  }
};

// 블로그 게시글 작성 api
export const postBlogContent = async (data: any) => {
  try {
    const blogContent = await customAxios.post("/api/posts", data);
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 게시글 수정 api
export const patchBlogContent = async <T = AxiosBlogPostSubmitType,>(
  data: PostBlogEditRequestDataType,
  postId: number,
): Promise<T> => {
  try {
    const blogContent = await customAxios.patch(`/api/posts/${postId}`, data);
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 게시글 삭제 api
export const deleteBlogContent = async (id: any) => {
  try {
    const blogContent = await customAxios.delete(`/api/posts/${id}`);
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 댓글 작성 api
export const postBlogComment = async (data: any) => {
  try {
    const blogComment = await customAxios.post("/api/post-comments", data);
    return blogComment;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 댓글 수정 api
export const patchBlogComment = async (data: object, id: number) => {
  try {
    const blogComment = await customAxios.patch(
      `/api/post-comments/${id}`,
      data,
    );
    return blogComment;
  } catch (err: any) {
    return err.response;
  }
};

// 블로그 댓글 삭제 api
export const deleteBlogComment = async (id: number) => {
  try {
    const blogComment = await customAxios.delete(`/api/post-comments/${id}`);
    return blogComment;
  } catch (err: any) {
    return err.response;
  }
};

// 블로그 좋아요 api
export const postLikePlus = async (postId: number) => {
  try {
    const likeData = await customAxios.post(`/api/posts/${postId}/like`);
    return likeData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 이미지 업로드
export const postImageUpload = async (data: object) => {
  try {
    const Image = await customAxios.post("/api/images", data);
    return Image;
  } catch (err: any) {
    return err.response;
  }
};

// 썸네일 업로드
export const postThumbnailUpload = async (data: object) => {
  try {
    const Image = await customAxios.post("/api/images/thumbnails", data);
    return Image;
  } catch (err: any) {
    return err.response;
  }
};
