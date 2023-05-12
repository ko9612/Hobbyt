// 임시 - 나중에 지울 것
import tw from "tailwind-styled-components";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import BlogItem from "../BlogItem";
import { BlogItemProps } from "../../../type/blogType";
import { getBestBlogList } from "../../../api/mainApi";

export const Section = tw.section`
max-w-[52rem] py-10
`;

export const Title = tw.p`
text-2xl lg:py-2 max-w-[52rem]
`;

export const BestContent = tw.article`
flex items-center
`;

export const BestItem = tw.div`
 mx-auto
`;

const CarouselPaging = tw.div`
flex justify-center items-center py-6
`;

const Arrow = tw.div`
min-[340px]:w-1/6 hidden min-[340px]:block
`;

const SmArrow = tw.div`
min-[340px]:hidden
`;

interface MainBlogItemProps {
  hotPosts: BlogItemProps[];
}

export default function BestBlog() {
  const [listData, setListData] = useState<MainBlogItemProps[]>();

  const [currentBlog, setCurrentBlog] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const nextClick = () => {
    if (listData && currentBlog >= listData[0].hotPosts.length - 1) {
      setCurrentBlog(0);
    } else {
      setCurrentBlog(currentBlog + 1);
    }
  };

  const prevClick = () => {
    if (listData && currentBlog === 0) {
      setCurrentBlog(listData[0].hotPosts.length - 1);
    } else {
      setCurrentBlog(currentBlog - 1);
    }
  };

  const getBestBlogData = async () => {
    const res = await getBestBlogList();
    const listRes = (res as any).data;
    setListData([listRes]);
  };

  useEffect(() => {
    getBestBlogData();
    // next, prev 버튼 누를 때
    if (slideRef.current) {
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentBlog}00%)`;
    }

    // 자동 슬라이드
    const interval = setInterval(() => {
      if (slideRef.current) {
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${currentBlog}00%)`;
        if (
          listData &&
          listData[0] &&
          currentBlog >= listData[0].hotPosts.length - 1
        ) {
          setTimeout(() => {
            if (slideRef.current) {
              slideRef.current.style.transition = `0s`;
              slideRef.current.style.transform = `translateY(0)`;
            }
          }, 501);
          setCurrentBlog(0);
        } else {
          setCurrentBlog(currentBlog + 1);
        }
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [currentBlog]);

  return (
    <Section>
      <Title>금주의 인기 블로그</Title>
      {listData && listData[0] && (
        <BestContent>
          <Arrow>
            <BsChevronLeft
              className="rounded-full text-MainColor hover:bg-MainColor/20 hover:p-2"
              size="2.5rem"
              role="button"
              onClick={prevClick}
            />
          </Arrow>
          <div className="mx-4 overflow-hidden">
            <BestItem ref={slideRef}>
              <div className="flex">
                {listData[0].hotPosts.map((item: BlogItemProps) => (
                  <div key={item && item.id} className="w-full">
                    <BlogItem list={item} key={item.id} />
                  </div>
                ))}
              </div>
            </BestItem>
          </div>
          <Arrow>
            <BsChevronRight
              className="rounded-full text-MainColor hover:bg-MainColor/20 hover:p-2"
              size="2.5rem"
              role="button"
              onClick={nextClick}
            />
          </Arrow>
        </BestContent>
      )}

      {listData && listData[0] && (
        <CarouselPaging>
          <SmArrow>
            <BsChevronLeft
              className="rounded-full text-MainColor hover:bg-MainColor/20"
              role="button"
              onClick={prevClick}
            />
          </SmArrow>
          <span className="px-2">{currentBlog + 1}</span>/
          <span className="px-2">
            {listData && listData[0].hotPosts.length}
          </span>
          <SmArrow>
            <BsChevronRight
              className="rounded-full text-MainColor hover:bg-MainColor/20"
              role="button"
              onClick={nextClick}
            />
          </SmArrow>
        </CarouselPaging>
      )}
    </Section>
  );
}
