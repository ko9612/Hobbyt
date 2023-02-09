// Tab 컴포넌트에서 사용하는 api
import axios from "axios";
import ErrorHandler from "./errorHandler";

// 블로그 게시글 리스트 조회 최신순 api
export const getBlogContentList = async (
  userId: number,
  off: number,
  lim: number,
) => {
  try {
    const blogContent = await axios.get(
      `/api/members/${userId}/private/posts?offset=${off}&limit=${lim}&orderBy=POST_NEWEST`,
    );
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 블로그 게시글 리스트 조회 인기순 api
export const getBlogContentListF = async (
  userId: number,
  off: number,
  lim: number,
) => {
  try {
    const blogContent = await axios.get(
      `/api/members/${userId}/private/posts?offset=${off}&limit=${lim}&orderBy=POST_MOSTLIKE`,
    );
    return blogContent;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 판매 게시글 리스트 조회 최신순 api
export const getSaleList = async (userId: number, off: number, lim: number) => {
  try {
    const saleList = await axios.get(
      `/api/members/${userId}/private/sales?offset=${off}&limit=${lim}&orderBy=SALE_NEWEST`,
    );
    return saleList;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 판매 게시글 리스트 조회 인기순 api
export const getSaleListF = async (
  userId: number,
  off: number,
  lim: number,
) => {
  try {
    const saleList = await axios.get(
      `/api/members/${userId}/private/sales?offset=${off}&limit=${lim}&orderBy=SALE_MOST_LIKE`,
    );
    return saleList;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 내가 쓴 댓글 리스트 조회 api
export const getBlogCommentList = async (
  userId: number,
  off: number,
  lim: number,
) => {
  try {
    const commentData = await axios.get(
      `/api/members/${userId}/private/comments?offset=${off}&limit=${lim}`,
    );
    return commentData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 내가 누른 좋아요 리스트 조회 api
export const getLikeList = async (userId: number, off: number, lim: number) => {
  try {
    const likeList = await axios.get(
      `/api/members/${userId}/private/post-likes?offset=${off}&limit=${lim}`,
    );
    return likeList;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 팔로잉, 팔로워
// 팔로우 요청, 취소 post
export const postFollowing = async (homeUserId: number) => {
  try {
    const Follow = await axios.post(
      `/api/members/${homeUserId}/follow`,
      {},
      {
        headers: { Authorization: localStorage.getItem("authorization") },
      },
    );
    return Follow;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 팔로워 조회
export const getFollower = async (homeUserId: number) => {
  try {
    const Follower = await axios.get(
      `/api/members/${homeUserId}/follower?page=0&size=10`,
      {
        headers: { Authorization: localStorage.getItem("authorization") },
      },
    );
    return Follower;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 팔로잉 조회
export const getFollowing = async (homeUserId: number) => {
  try {
    const Following = await axios.get(
      `/api/members/${homeUserId}/following?page=0&size=10`,
      {
        headers: { Authorization: localStorage.getItem("authorization") },
      },
    );
    return Following;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 판매작품 조회
export const getProductsList = async () => {
  try {
    const list = await axios.get(
      `/api/members/myPage/products?page=0&size=10`,
      {
        headers: { Authorization: localStorage.getItem("authorization") },
      },
    );
    return list;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 구매작품 조회
export const getOrderList = async () => {
  try {
    const list = await axios.get(`/api/members/myPage/orders?page=0&size=10`, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return list;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 판매관리 조회
export const getManagementList = async () => {
  try {
    const list = await axios.get(
      `/api/members/myPage/products/management?page=0&size=10`,
      {
        headers: { Authorization: localStorage.getItem("authorization") },
      },
    );
    return list;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
