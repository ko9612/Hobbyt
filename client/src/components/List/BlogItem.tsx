import tw from "tailwind-styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import ViewCount from "../ViewLikeWrite/ViewCount";
import LikeCount from "../ViewLikeWrite/LikeCount";
import WriteDate from "../ViewLikeWrite/WriteDate";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";
import ExampleImg from "../../image/header_ex.jpg";

export const BLContainer = tw.div`w-[48rem] m-auto`;
export const BLComponent = tw.div`flex m-auto mt-4 p-5 bg-gray-100 rounded-lg`;
export const BLImage = tw.div`  border border-red-300`;
export const BLContent = tw.div` ml-5 border border-red-300 mb-5`;

export default function BlogItem() {
  const router = useRouter();
  return (
    <BLComponent className={`${router.pathname === "/" && "bg-MainColor/40"}`}>
      <BLImage className="w-[15rem] h-[9rem]">
        <Image src={ExampleImg} alt="img" />
      </BLImage>
      <BLContent>
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">블로그 게시글 타이틀</h2>
          <ThreeDotsBox>블로그</ThreeDotsBox>
        </div>
        <p className="text-sm sm:text-base">
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
  );
}
