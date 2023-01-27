// Tab 컴포넌트에서 사용하는 api
import axios from "axios";
import ErrorHandler from "./errorHandler";

// 블로그 게시글 리스트 조회 api
export const getBlogContentList = async (
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

// Sale-post-list
// 이 밑으로 함수들 다 임시로 적어둔 거에요
// 아마 data는 안 들어가고 parameter 들어갈 거 같아요
// export const getSalePostList = async (data: any) => {
//   try {
//     const saleListData = await axios.get(``, data);
//     return saleListData;
//   } catch (err: unknown) {
//     return ErrorHandler(err);
//   }
// };

// 내가 쓴 댓글 리스트 조회 api
export const getBlogCommentList = async (
  memberId: number,
  off: number,
  lim: number,
) => {
  try {
    const commentData = await axios.get(
      `/api/members/${memberId}/private/comments?offset=${off}&limit=${lim}`,
    );
    return commentData;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// export const getLikeList = async (data: any) => {
//   try {
//     const likeListData = await axios.get(``, data);
//     return likeListData;
//   } catch (err: unknown) {
//     return ErrorHandler(err);
//   }
// };
