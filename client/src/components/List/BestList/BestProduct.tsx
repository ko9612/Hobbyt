// import tw from "tailwind-styled-components";
import { BsCalendar4 } from "react-icons/bs";
import { Section, Title, BestContent, BestItem } from "./BestBlog";
import { SLContent, SLImage, SLProductInfo } from "../SaleItem";
import ThreeDotsBox from "../../SelectBox/ThreeDotsBox";
import LikeCount from "../../ViewLikeWrite/LikeCount";
import FilterButton from "../../Button/FilterButton";

export default function BestBlogger() {
  return (
    <Section>
      <Title>금주의 작품</Title>
      <div className="flex justify-end">
        <FilterButton />
      </div>
      <BestContent className="pt-5">
        <BestItem className="grid grid-cols-2 gap-8 sm:grid-cols-3">
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
                    <LikeCount>123123</LikeCount>
                  </div>
                </SLProductInfo>
              </SLContent>
            ))}
        </BestItem>
      </BestContent>
    </Section>
  );
}
