// import tw from "tailwind-styled-components";
import { BsCalendar4 } from "react-icons/bs";
import { Section, Title, BestContent, BestItem } from "./BestBlog";
import { SLComponent, SLContent, SLImage, SLProductInfo } from "../SaleList";
import ThreeDotsBox from "../../SelectBox/ThreeDotsBox";
import LikeCount from "../../ViewLikeWrite/LikeCount";

export default function BestBlogger() {
  return (
    <Section>
      <Title>금주의 작품</Title>
      <BestContent>
        <BestItem className="flex justify-between flex-wrap">
          {Array(6)
            .fill(null)
            .map(idx => (
              <SLComponent key={idx}>
                <SLContent>
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
              </SLComponent>
            ))}
        </BestItem>
      </BestContent>
    </Section>
  );
}
