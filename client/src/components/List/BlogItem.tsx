import tw from "tailwind-styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import ViewCount from "../ViewLikeWrite/ViewCount";
import LikeCount from "../ViewLikeWrite/LikeCount";
import WriteDate from "../ViewLikeWrite/WriteDate";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";
import ExampleImg from "../../image/header_ex.jpg";
import { IdataProps } from "../../type/blogType";

export const BLContainer = tw.div`m-auto`;
export const BLComponent = tw.div`flex m-auto mt-4 p-5 bg-gray-100 rounded-lg h-[10rem] border-2`;
export const BLImage = tw.div`border border-red-300`;
export const BLContent = tw.div`ml-5 border border-red-300 mb-5 w-[30rem]`;
const BLTitle = tw.div`flex justify-between w-[28rem] border-2 border-blue-500`;

export default function BlogItem({ list }: IdataProps) {
  const router = useRouter();
  const { id, title, viewCount, likeCount, createdAt, content } = list || {};
  console.log(`BlogItem파일에`, list);

  return (
    <BLComponent className={`${router.pathname === "/" && "bg-MainColor/40"}`}>
      <BLImage>
        <Image src={ExampleImg} alt="img" width={150} height={150} />
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
        <p className="text-sm truncate sm:text-base h-2/3">{content}</p>
        <div className="flex justify-end h-1/3">
          <ViewCount>{viewCount}</ViewCount>
          <LikeCount>{likeCount}</LikeCount>
          <WriteDate>{createdAt}</WriteDate>
        </div>
      </BLContent>
    </BLComponent>
  );
}
