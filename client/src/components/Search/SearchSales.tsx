import tw from "tailwind-styled-components";
import { BsCalendar4 } from "react-icons/bs";
import LikeCount from "../ViewLikeWrite/LikeCount";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";
import FilterButton from "../Button/FilterButton";
import {
  SLContainer,
  SLContent,
  SLImage,
  SLProductInfo,
} from "../List/SaleList";

export const Content = tw.article`
flex items-center pt-5
`;

export const Item = tw.div`
w-[56rem] mx-auto grid sm:grid-cols-3 grid-cols-2 gap-8
`;

export default function SearchSales({
  keyword,
}: {
  keyword: string | string[] | undefined;
}) {
  return (
    <SLContainer>
      <div className="py-10">
        <span className="text-MainColor font-semibold text-xl">{keyword} </span>
        작품 검색결과
        <span> 12건</span>
      </div>
      <div className="flex justify-end">
        <FilterButton />
      </div>
      <Content>
        <Item>
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
        </Item>
      </Content>
    </SLContainer>
  );
}
