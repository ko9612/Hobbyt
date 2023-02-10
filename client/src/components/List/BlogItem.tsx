import tw from "tailwind-styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";
import { BsLockFill } from "react-icons/bs";
import ViewCount from "../ViewLikeWrite/ViewCount";
import LikeCount from "../ViewLikeWrite/LikeCount";
import WriteDate from "../ViewLikeWrite/WriteDate";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";
import { BlogItemProps } from "../../type/blogType";
import DefalutImage from "../../image/pictureDefalut.svg";
import DefaultProfileImage from "../Page/UserHome/DefaultProfileImg";
import { UserIdState } from "../../state/UserState";

export const BLContainer = tw.div`m-auto`;
export const BLComponent = tw.div`flex m-auto mt-4 p-5 bg-gray-100 rounded-lg border-2 border-red-500 justify-between`;
export const BLImage = tw.div`w-1/5`;
export const BLContent = tw.div`ml-5 w-4/5 flex flex-col justify-between`;
export const BLTitle = tw.div`flex justify-between border-2 border-red-500`;
export const Text = tw.div`text-sm truncate sm:text-base border-2 border-blue-500 h-[4rem]`;
const ActInfo = tw.div`flex items-center`;

interface ListProps {
  list: BlogItemProps;
}

// blog 페이지일 때를 제외하고 list에 작성자 프로필, 닉네임 출력
export default function BlogItem({ list }: ListProps) {
  const TextViewer = dynamic(() => import("../ToastUI/TextViewer"), {
    ssr: false,
  });

  const router = useRouter();
  const userId = useRecoilValue(UserIdState);
  const {
    id,
    title,
    viewCount,
    likeCount,
    createdAt,
    content,
    thumbnailImage,
    profileImage,
    nickname,
    isPublic,
    writerId,
  } = list || {};

  // 날짜 바꿔주는 함수
  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  return (
    <BLComponent
      className={`${router.pathname === "/" && "bg-MainColor/40 w-[45rem]"}`}
    >
      <BLImage>
        <Image
          src={
            thumbnailImage !== null
              ? `/api/images/${thumbnailImage}`
              : DefalutImage
          }
          alt="img"
          className={thumbnailImage !== null ? "rounded-xl" : ""}
          width={150}
          height={150}
        />
      </BLImage>
      <BLContent>
        <BLTitle>
          <Link href={`/blog/${writerId}/post/${id}`}>
            <h2 className="overflow-hidden text-2xl w-[28rem] font-semibold text-clip flex items-center">
              {title}
              {!isPublic && <BsLockFill className="ml-3 text-gray-400" />}
            </h2>
          </Link>
          {(writerId === userId && router.pathname !== "/") ||
          router.pathname.includes("/blog") ? (
            <ThreeDotsBox item={list}>블로그</ThreeDotsBox>
          ) : null}
        </BLTitle>
        <Text>
          <TextViewer initialValue={content} />
        </Text>
        <div
          className={`${
            !router.pathname.includes("/blog") && "flex justify-between"
          }`}
        >
          {!router.pathname.includes("/blog") && (
            <Link href={`/blog/${writerId}`}>
              <ActInfo>
                <div className="w-[2.5rem]">
                  <DefaultProfileImage
                    // profileImg={profileImage}
                    profileImg={DefalutImage}
                    width={25}
                    height={25}
                    borderW={1}
                  />
                </div>
                <div>{nickname}</div>
              </ActInfo>
            </Link>
          )}
          <ActInfo
            className={`${
              !router.pathname.includes("/blog") &&
              !router.pathname.includes("/blog")
                ? "justify-end"
                : "float-right"
            }`}
          >
            <span className="mx-[0.25rem]">
              <ViewCount>{viewCount}</ViewCount>
            </span>
            <span className="mx-[0.25rem]">
              <LikeCount>{likeCount}</LikeCount>
            </span>
            <span className="mx-[0.25rem]">
              <WriteDate>{createdAt && getParsedDate(createdAt)}</WriteDate>
            </span>
          </ActInfo>
        </div>
      </BLContent>
    </BLComponent>
  );
}
