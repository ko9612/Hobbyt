import tw from "tailwind-styled-components";
import { useState } from "react";
import {
  BsPencilSquare,
  BsHeart,
  BsHeartFill,
  BsLink45Deg,
  BsCalendar4,
  BsTruck,
  BsExclamationTriangleFill,
} from "react-icons/bs";
import { PdContent } from "./ProductContent";

const PdGuideSeaction = tw.section`
  
`;

const ListTitle = tw.div`
flex items-center
`;

const TitleText = tw.p`
pl-2
`;

export default function ProductGuide() {
  const [isClickHeart, setIsClickHeart] = useState(false);

  const ClickHeartHandler = () => {
    setIsClickHeart(!isClickHeart);
  };

  return (
    <PdGuideSeaction>
      <PdContent>
        <ListTitle className="font-semibold">
          <BsPencilSquare size="1.25rem" />
          <TitleText>환불/교환 안내</TitleText>
        </ListTitle>
        <div className="py-4">
          판매 게시글 환불/ 교환 글입니다. 판매 게시글 환불/ 교환 글입니다. 판매
          게시글 환불/ 교환 글입니다. 판매 게시글 환불/ 교환 글입니다. 판매
          게시글 환불/ 교환 글입니다. 판매 게시글 환불/ 교환 글입니다. 판매
          게시글 환불/ 교환 글입니다.
        </div>
        <div className="flex flex-col items-center pt-4">
          {isClickHeart ? (
            <BsHeartFill
              role="button"
              size="2rem"
              className="text-MainColor"
              onClick={ClickHeartHandler}
            />
          ) : (
            <BsHeart
              role="button"
              size="2rem"
              className="text-MainColor"
              onClick={ClickHeartHandler}
            />
          )}
          123
        </div>
        <div className="text-end">
          <button className="hover:text-gray-500 focus:text-gray-500">
            수정
          </button>
          &nbsp;|&nbsp;
          <button className="hover:text-gray-500 focus:text-gray-500">
            삭제
          </button>
        </div>
      </PdContent>
      <PdContent>
        <ListTitle className="font-semibold">
          <BsLink45Deg size="1.25rem" />
          <p className="pl-2">제작과정 확인하기</p>
          <button className="pl-2 font-medium text-MainColor hover:text-SubColor focus:text-SubColor">
            click
          </button>
        </ListTitle>
      </PdContent>
      <PdContent className="border-none">
        <ListTitle>
          <BsCalendar4 size="1.25rem" />
          <TitleText>22.12.14 ~ 22.12.20</TitleText>
        </ListTitle>
        <ListTitle className="py-1">
          <BsExclamationTriangleFill size="1.25rem" />
          <TitleText>만 14세 이상 구매 가능</TitleText>
        </ListTitle>
        <ListTitle>
          <BsTruck size="1.25rem" />
          <TitleText>
            평균 <span className="font-semibold">3</span>일 소요
          </TitleText>
        </ListTitle>
      </PdContent>
    </PdGuideSeaction>
  );
}
