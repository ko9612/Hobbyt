import tw from "tailwind-styled-components";
import { BsCalendar4 } from "react-icons/bs";
import LikeCount from "../ViewLikeWrite/LikeCount";
import BlogSaleInfo from "../UserHome/BlogSaleInfo";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";

export const SLContainer = tw.div` w-[48rem] m-auto`;

export const SLComponent = tw.div`grid grid-cols-3 mt-4 border`;

export const SLContent = tw.div`
w-full inline-block bg-gray-100 rounded-lg justify-center items-center
`;

export const SLImage = tw.div`
 h-[13rem] border border-red-300 rounded-lg mb-2
`;

export const SLProductInfo = tw.div`mx-4`;

export default function SaleList() {
  return (
    <SLContainer>
      <BlogSaleInfo />
      <SLComponent>
        <SLContent>
          <SLImage>
            <ThreeDotsBox>작품</ThreeDotsBox>
          </SLImage>
          <SLProductInfo>
            <p className="">작품 이름</p>
            <div className="flex">
              <BsCalendar4 />
              <p>22.12.14 ~ 22.12.16</p>
            </div>
            <div className="float-right">
              <LikeCount />
            </div>
          </SLProductInfo>
        </SLContent>
      </SLComponent>
    </SLContainer>
  );
}
