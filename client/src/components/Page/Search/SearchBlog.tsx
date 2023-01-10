import tw from "tailwind-styled-components";
// import BlogItem from "../List/BlogItem";
import Image from "next/image";
import { useRouter } from "next/router";
// import { BLContainer } from "../List/BlogList";
import { BLComponent, BLImage, BLContent } from "../../List/BlogItem";
import ViewCount from "../../ViewLikeWrite/ViewCount";
import LikeCount from "../../ViewLikeWrite/LikeCount";
import WriteDate from "../../ViewLikeWrite/WriteDate";
import ThreeDotsBox from "../../SelectBox/ThreeDotsBox";
import ExampleImg from "../../image/header_ex.jpg";
import FilterButton from "../../Button/FilterButton";

const SRContainer = tw.div`w-[52rem] m-auto`;

function SearchBlog({ keyword }: { keyword: string | string[] | undefined }) {
  const router = useRouter();
  return (
    <SRContainer>
      <div className="py-10">
        <span className="text-MainColor font-semibold text-xl">{keyword} </span>
        블로그 검색결과
        <span> 5건</span>
      </div>
      <div className="flex justify-end">
        <FilterButton />
      </div>
      {Array(5)
        .fill(null)
        .map(idx => (
          <BLComponent
            key={idx}
            className={`${router.pathname === "/" && "bg-MainColor/40"}`}
          >
            <BLImage className="w-[15rem] h-[9rem]">
              <Image src={ExampleImg} alt="img" />
            </BLImage>
            <BLContent>
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">블로그 게시글 타이틀</h2>
                <ThreeDotsBox>블로그</ThreeDotsBox>
              </div>
              <p className="text-sm sm:text-base">
                게시글 본문 더미 데이터입니다. 게시글 본문 더미 데이터입니다.
                게시글 본문 더미 데이터입니다. 게시글 본문 더미 데이터입니다.
                게시글 본문 더미 데이터입니다.
              </p>
              <div className="flex justify-end ">
                <ViewCount />
                <LikeCount />
                <WriteDate />
              </div>
            </BLContent>
          </BLComponent>
        ))}

      {/* <BlogItem /> */}
    </SRContainer>
  );
}
export default SearchBlog;
