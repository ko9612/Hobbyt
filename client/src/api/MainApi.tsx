// 메인 Api
import axios from "axios";
import ErrorHandler from "./errorHandler";

// 금주의 블로그 게시글
export const getBestBlogList = async () => {
  try {
    const bestBlog = await axios.get(
      `http://59.12.62.150:8080/api/main/hot-posts`,
    );
    return bestBlog;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 금주의 블로거
export const getBestBloggerList = async () => {
  try {
    const bestBlogger = await axios.get(
      `http://59.12.62.150:8080/api/main/hot-bloggers?count=6`,
    );
    return bestBlogger;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};

// 금주의 작품
export const getBestSaleList = async (sort: string) => {
  try {
    const bestSale = await axios.get(
      `http://59.12.62.150:8080/api/main/sales?count=9&orderBy=${sort}`,
    );
    return bestSale;
  } catch (err: unknown) {
    return ErrorHandler(err);
  }
};
