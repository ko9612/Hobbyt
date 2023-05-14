// 검색-블로그 게시글
import axios from "axios";
import ErrorHandler from "./errorHandler";

export const getSearchBlogList = async (
  keyword: string | string[] | undefined,
  off: number,
  lim: number,
  sort: string,
) => {
  try {
    const NewestBlog = await axios.get(
      `/api/search/posts?keyword=${keyword}&offset=${off}&limit=${lim}&orderBy=${sort}`,
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
      `/api/search/sales?keyword=${keyword}&offset=${off}&limit=${lim}&orderBy=${sort}`,
    );
    return NewestSale;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
