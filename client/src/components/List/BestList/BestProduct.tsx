// import tw from "tailwind-styled-components";
import { BsCalendar4 } from "react-icons/bs";
import { Section, Title, BestContent, BestItem } from "./BestBlog";
import { SLContent, SLImage, SLProductInfo } from "../SaleList";
import ThreeDotsBox from "../../SelectBox/ThreeDotsBox";
import LikeCount from "../../ViewLikeWrite/LikeCount";
import FilterButton from "../../Button/FilterButton";

// export const SLContent = tw.div`
// w-full inline-block bg-gray-100 rounded-lg justify-center items-center
// `;

// export const SLImage = tw.div`
//  h-[13rem] border border-red-300 rounded-lg mb-2
// `;

// export const SLProductInfo = tw.div`mx-4`;

export default function BestBlogger() {
  return (
    <Section>
      <Title>금주의 작품</Title>
      <div className="max-w-[56rem] mx-auto flex justify-end">
        <FilterButton />
      </div>
      <BestContent className="pt-5">
        <BestItem className="grid sm:grid-cols-3 grid-cols-2 gap-8">
          {Array(12)
            .fill(null)
            .map(idx => (
              <SLContent key={idx}>
                <SLImage>
                  <ThreeDotsBox>작품</ThreeDotsBox>
                </SLImage>
                <SLProductInfo>
                  <p>작품 이름</p>
                  <div className="flex">
                    <BsCalendar4 />
                    <p>22.12.14 ~ 22.12.16</p>
                  </div>
                  <div className="float-right">
                    <LikeCount />
                  </div>
                </SLProductInfo>
              </SLContent>
            ))}
        </BestItem>
      </BestContent>
    </Section>
  );
}
