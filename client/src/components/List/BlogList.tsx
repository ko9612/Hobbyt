import tw from "tailwind-styled-components";
import ViewCount from "../ViewLikeWrite/ViewCount";
import LikeCount from "../ViewLikeWrite/LikeCount";
import WriteDate from "../ViewLikeWrite/WriteDate";
import BlogSaleInfo from "../UserHome/BlogSaleInfo";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";

export const BLContainer = tw.div`w-[56rem] m-auto`;
export const BLComponent = tw.div`flex m-auto mt-4 p-5 bg-gray-100 rounded-lg`;
export const BLImage = tw.div` w-[15rem] h-[9rem] border border-red-300`;
export const BLContent = tw.div` ml-5 border border-red-300 mb-5`;

function BlogList() {
  return (
    <BLContainer>
      <BlogSaleInfo />
      <BLComponent>
        <BLImage>이미지 자리</BLImage>
        <BLContent>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">블로그 게시글 타이틀</h2>
            <ThreeDotsBox>블로그</ThreeDotsBox>
          </div>
          <p>
            게시글 본문 더미 데이터입니다. 게시글 본문 더미 데이터입니다. 게시글
            본문 더미 데이터입니다. 게시글 본문 더미 데이터입니다. 게시글 본문
            더미 데이터입니다.
          </p>
          <div className="flex justify-end ">
            <ViewCount />
            <LikeCount />
            <WriteDate />
          </div>
        </BLContent>
      </BLComponent>
    </BLContainer>
  );
}
export default BlogList;
