import tw from "tailwind-styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import ViewCount from "../ViewLikeWrite/ViewCount";
import LikeCount from "../ViewLikeWrite/LikeCount";
import WriteDate from "../ViewLikeWrite/WriteDate";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";
// import ExampleImg from "../../image/header_ex.jpg";
import { IdataProps } from "../../type/blogType";
import DefalutImage from "../../image/pictureDefalut.svg";

export const BLContainer = tw.div`m-auto`;
export const BLComponent = tw.div`flex m-auto mt-4 p-5 bg-gray-100 rounded-lg border-2 border-red-500`;
export const BLImage = tw.div`w-[30rem]`;
export const BLContent = tw.div`ml-5 mb-5 w-[30rem]`;
const BLTitle = tw.div`flex justify-between w-[28rem] border-2 border-red-500`;
export const Text = tw.div`text-sm truncate sm:text-base w-[30rem] border-2 border-blue-500 h-[4rem]`;

export default function BlogItem({ list }: IdataProps) {
  const TextViewer = dynamic(() => import("../ToastUI/TextViewer"), {
    ssr: false,
  });

  const router = useRouter();
  const {
    id,
    title,
    viewCount,
    likeCount,
    createdAt,
    content,
    thumbnailImage,
  } = list || {};

  // 날짜 바꿔주는 함수
  const getParsedDate = (data: string) =>
    new Date(data).toLocaleDateString("ko-KR");

  return (
    <BLComponent className={`${router.pathname === "/" && "bg-MainColor/40"}`}>
      <BLImage>
        <Image
          src={thumbnailImage || DefalutImage}
          alt="img"
          width={150}
          height={150}
        />
      </BLImage>
      <BLContent>
        <BLTitle>
          <Link href={`/post/${id}`}>
            <h2 className="overflow-hidden text-2xl w-[28rem] font-semibold text-clip">
              {title}
            </h2>
          </Link>
          <ThreeDotsBox item={list}>블로그</ThreeDotsBox>
        </BLTitle>
        <Text>
          <TextViewer initialValue={content} />
        </Text>
        <div className="flex justify-end">
          <ViewCount>{viewCount}</ViewCount>
          <LikeCount>{likeCount}</LikeCount>
          <WriteDate>{createdAt && getParsedDate(createdAt)}</WriteDate>
        </div>
      </BLContent>
    </BLComponent>
  );
}
