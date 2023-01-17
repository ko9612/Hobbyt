// Tab 컴포넌트에서 사용하는 api
import axios from "axios";
import ErrorHandler from "./errorHandler";

// Blog-post-list
export const getBlogPostList = async (id: any) => {
  try {
    const blogListData = await axios.get(`/api/${id}`);
    return blogListData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// Sale-post-list
// 이 밑으로 함수들 다 임시로 적어둔 거에요
// 아마 data는 안 들어가고 parameter 들어갈 거 같아요
export const getSalePostList = async (data: any) => {
  try {
    const saleListData = await axios.get(``, data);
    return saleListData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

export const getCommentList = async (data: any) => {
  try {
    const commentListData = await axios.get(``, data);
    return commentListData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

export const getLikeList = async (data: any) => {
  try {
    const likeListData = await axios.get(``, data);
    return likeListData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
