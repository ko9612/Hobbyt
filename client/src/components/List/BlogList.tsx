import tw from "tailwind-styled-components";
import BlogSaleInfo from "../Page/UserHome/BlogSaleInfo";
import BlogItem from "./BlogItem";
import { IdataProps } from "../../type/blogType";

export const BLContainer = tw.div`w-[43rem] m-auto`;
// export const BLComponent = tw.div`flex m-auto mt-4 p-5 bg-gray-100 rounded-lg`;
// export const BLImage = tw.div` w-[15rem] h-[9rem] border border-red-300`;
// export const BLContent = tw.div` ml-5 border border-red-300 mb-5`;

function BlogList({ list }: IdataProps[]) {
  return (
    <BLContainer>
      <BlogSaleInfo>블로그</BlogSaleInfo>
      {list &&
        list.map((item: any, index: number) => (
          <BlogItem list={item} key={index} />
        ))}
    </BLContainer>
  );
}
export default BlogList;
