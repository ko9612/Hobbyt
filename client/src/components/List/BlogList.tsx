import tw from "tailwind-styled-components";
import BlogSaleInfo from "../Page/UserHome/BlogSaleInfo";
import BlogItem from "./BlogItem";
import { IdataProps } from "../../type/blogType";

export const BLContainer = tw.div`w-[43rem] m-auto`;

function BlogList({ list }: IdataProps[]) {
  // console.log(`블로그 아이템`, list);

  return (
    <BLContainer>
      <BlogSaleInfo>블로그</BlogSaleInfo>
      {list.posts &&
        list.posts.map((item: any, index: number) => (
          <BlogItem list={item} key={index} />
        ))}
    </BLContainer>
  );
}
export default BlogList;
