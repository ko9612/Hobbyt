// Tab 컴포넌트에서 사용하는 api
import axios from "axios";
import { customAxios } from "../util/LoginRefresh";
import ErrorHandler from "./errorHandler";

// 블로그 게시글 리스트 조회 api
export const getBlogContentList = async (
  homeId: number,
  off: number,
  lim: number,
  sort: string,
) => {
  try {
    const blogContent = await axios.get(
      `/api/members/${homeId}/private/posts?offset=${off}&limit=${lim}&orderBy=${sort}`,
    );
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 판매 게시글 리스트 조회 api
export const getSaleList = async (
  homeId: number,
  off: number,
  lim: number,
  sort: string,
) => {
  try {
    const saleList = await axios.get(
      `/api/members/${homeId}/private/sales?offset=${off}&limit=${lim}&orderBy=${sort}`,
    );
    return saleList;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 내가 쓴 댓글 리스트 조회 api
export const getBlogCommentList = async (
  homeId: number,
  off: number,
  lim: number,
) => {
  try {
    const commentData = await axios.get(
      `/api/members/${homeId}/private/comments?offset=${off}&limit=${lim}`,
    );
    return commentData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 내가 누른 블로그 게시글 좋아요 리스트 조회 api
export const getBlogLikeList = async (
  homeId: number,
  off: number,
  lim: number,
) => {
  try {
    const likeList = await axios.get(
      `/api/members/${homeId}/private/post-likes?offset=${off}&limit=${lim}`,
    );
    return likeList;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 내가 누른 판매 게시글 좋아요 리스트 api
export const getSaleLikeList = async (
  homeId: number,
  off: number,
  lim: number,
) => {
  try {
    const likeList = await axios.get(
      `/api/members/${homeId}/private/sale-likes?offset=${off}&limit=${lim}`,
    );
    return likeList;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 팔로잉, 팔로워
// 팔로우 요청, 취소 post
export const postFollowing = async (homeId: number) => {
  try {
    const Follow = await customAxios.post(`/api/members/${homeId}/follow`);
    return Follow;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 회원용 팔로워 조회
export const getFollower = async (homeId: number, page: number) => {
  try {
    const Follower = await customAxios.get(
      `/api/members/${homeId}/follower?page=${page}&size=10`,
    );
    return Follower;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 회원용 팔로잉 조회
export const getFollowing = async (homeId: number, page: number) => {
  try {
    const Following = await customAxios.get(
      `/api/members/${homeId}/following?page=${page}&size=10`,
    );
    return Following;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 비회원용 팔로워 조회
export const getFollowerN = async (homeId: number, page: number) => {
  try {
    const Follower = await axios.get(
      `/api/members/${homeId}/follower?page=${page}&size=10`,
    );
    return Follower;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 비회원용 팔로잉 조회
export const getFollowingN = async (homeId: number, page: number) => {
  try {
    const Following = await axios.get(
      `/api/members/${homeId}/following?page=${page}&size=10`,
    );
    return Following;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 판매작품 조회
export const getProductsList = async (page: number) => {
  try {
    const list = await customAxios.get(
      `/api/members/myPage/products?page=${page}&size=10`,
    );
    return list;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 구매작품 조회
export const getOrderList = async (page: number) => {
  try {
    const list = await customAxios.get(
      `/api/members/myPage/orders?page=${page}&size=10`,
    );
    return list;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 판매관리 조회
export const getManagementList = async (page: number) => {
  try {
    const list = await customAxios.get(
      `/api/members/myPage/products/management?page=${page}&size=10`,
    );
    return list;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
