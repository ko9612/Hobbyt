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

// 검색 Api
// 검색-블로그 게시글
export const getSearchBlogList = async (
  keyword: string | string[] | undefined,
  off: number,
  lim: number,
  sort: string,
) => {
  try {
    const NewestBlog = await axios.get(
      `http://59.12.62.150:8080/api/search/posts?keyword=${keyword}&offset=${off}&limit=${lim}&orderBy=${sort}`,
    );
    return NewestBlog;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 검색- 판매 게시글
export const getSearchSaleList = async (
  keyword: string | string[] | undefined,
  off: number,
  lim: number,
  sort: string,
) => {
  try {
    const NewestSale = await axios.get(
      `http://59.12.62.150:8080/api/search/sales?keyword=${keyword}&offset=${off}&limit=${lim}&orderBy=${sort}`,
    );
    return NewestSale;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 팔로잉, 팔로워
// 팔로잉 요청, 취소 post
export const postFollowing = async (userId: number) => {
  try {
    const Follow = await axios.post(`/api/members/${userId}/following`, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    return Follow;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
