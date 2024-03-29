import tw from "tailwind-styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { BsLockFill } from "react-icons/bs";

import ViewCount from "../ViewLikeWrite/ViewCount";
import LikeCount from "../ViewLikeWrite/LikeCount";
import WriteDate from "../ViewLikeWrite/WriteDate";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";
import DefaultProfileImage from "../Page/UserHome/DefaultProfileImg";
import { UserIdState } from "../../state/UserState";
import saleDImage from "../../image/saleDImage.svg";
import ParseDateFC from "../../util/ParseDateFC";

export const BLContainer = tw.div`m-auto`;
export const BLComponent = tw.div`flex m-auto bg-gray-100 rounded-3xl sm:rounded-xl
sm:w-[35rem] md:w-[42rem] relative max-sm:flex-col items-center pb-2 sm:p-3`;
export const BLImage = tw.div`aspect-square w-full sm:w-[8rem] overflow-hidden sm:h-[8rem] rounded-t-3xl sm:rounded-xl`;
export const BLContent = tw.div`sm:px-5 w-4/5 h-[5rem] sm:h-[8rem] flex flex-col justify-between`;
export const BLTitle = tw.div`flex justify-between text-lg sm:text-xl md:text-2xl pt-2`;
export const Text = tw.div`text-sm truncate sm:text-base h-[4rem] break-all hidden sm:block`;
export const ActInfo = tw.div`flex items-center justify-center text-sm sm:text-base`;

// blog 페이지일 때를 제외하고 list에 작성자 프로필, 닉네임 출력
export default function BlogItem({ list, children }: any) {
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

  // 텍스트에서 html 제거하는 정규식
  const regText = content.replace(/<[^>]*>?/g, "");

  return (
    <BLComponent>
      <BLImage>
        <Image
          src={thumbnailImage !== null ? thumbnailImage : saleDImage}
          alt="img"
          className="object-cover w-full h-full rounded-t-3xl sm:rounded-xl"
          width={150}
          height={150}
        />
      </BLImage>
      <BLContent>
        <BLTitle>
          <Link href={`/blog/${writerId}/post/${id}`} className="w-5/6">
            <div className="flex items-center mt-1 font-semibold">
              <h2 className="truncate">{title}</h2>
              {router.pathname.startsWith("/blog") && !isPublic && (
                <BsLockFill className="ml-3 text-gray-400" />
              )}
            </div>
          </Link>
          {writerId === userId && router.pathname.includes("/blog") ? (
            <ThreeDotsBox item={list}>블로그</ThreeDotsBox>
          ) : null}
        </BLTitle>
        <Text>{regText}</Text>
        <div
          className={`${
            profileImage !== undefined && "flex justify-between items-center"
          }`}
        >
          {profileImage !== undefined && (
            <Link href={`/blog/${writerId}`}>
              <ActInfo>
                <div className="mr-[0.25rem] sm:mr-2">
                  <DefaultProfileImage
                    profileImg={profileImage}
                    width={25}
                    height={25}
                    borderW={0}
                  >
                    blog
                  </DefaultProfileImage>
                </div>
                <div className="hidden max-[369px]:block min-[550px]:block">
                  {nickname}
                </div>
              </ActInfo>
            </Link>
          )}
          <ActInfo
            className={`${
              profileImage === undefined ? "justify-end" : "float-right"
            }`}
          >
            <span className="mx-[0.15rem]">
              <ViewCount>{viewCount}</ViewCount>
            </span>
            <span className="mx-[0.15rem]">
              <LikeCount>{likeCount}</LikeCount>
            </span>
            {children === "메인" ? null : (
              <span className="mx-[0.15rem] hidden sm:block">
                <WriteDate>{createdAt && ParseDateFC(createdAt)}</WriteDate>
              </span>
            )}
          </ActInfo>
        </div>
      </BLContent>
    </BLComponent>
  );
}
