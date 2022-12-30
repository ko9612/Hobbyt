import tw from "tailwind-styled-components";
import { BsCalendar4, BsThreeDots } from "react-icons/bs";
import LikeCount from "../ViewLikeWrite/LikeCount";
import BlogSaleInfo from "../UserHome/BlogSaleInfo";

export default function SaleList() {
  const SLContainer = tw.div` w-[52rem] m-auto`;

  const SLComponent = tw.div`grid grid-cols-3 mt-4 border gap-6`;

  const SLContent = tw.div`
  w-full inline-block bg-gray-100 rounded-lg justify-center items-center
  `;

  const SLImage = tw.div`
   h-[13rem] border border-red-300 rounded-lg mb-2
  `;

  const SLProductInfo = tw.div`mx-4`;

  return (
    <SLContainer>
      <BlogSaleInfo />
      <SLComponent>
        <SLContent>
          <SLImage>
            <BsThreeDots size="28" color="#d6d6d6" />
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
