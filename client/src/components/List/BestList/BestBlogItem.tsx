import tw from "tailwind-styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { BsLockFill } from "react-icons/bs";
import ViewCount from "../../ViewLikeWrite/ViewCount";
import LikeCount from "../../ViewLikeWrite/LikeCount";
import WriteDate from "../../ViewLikeWrite/WriteDate";
import ThreeDotsBox from "../../SelectBox/ThreeDotsBox";
import saleDImage from "../../../image/saleDImage.svg";
import DefaultProfileImage from "../../Page/UserHome/DefaultProfileImg";
import { UserIdState } from "../../../state/UserState";

// export const BLComponent = tw.div`p-5 bg-gray-100 rounded-lg w-full min-[550px]:flex
// `;

// export const BLImage = tw.div`aspect-square
// min-[550px]:w-[6rem] min-[550px]:h-[6rem]
// sm:w-[7rem] sm:h-[7rem] md:w-[8rem] md:h-[8rem] rounded-t-3xl`;

// export const BLContent = tw.div`
// pt-5 min-[550px]:pt-0 min-[550px]:px-5 min-[550px]:w-4/5
// min-[550px]:h-[6rem] sm:h-[7rem] md:h-[8rem]
// flex flex-col justify-between`;

// export const BLTitle = tw.div`flex justify-between text-xl sm:text-2xl md:text-3xl`;
// export const Text = tw.div`text-sm truncate sm:text-base h-[4rem] break-all`;
// export const ActInfo = tw.div`flex items-center justify-center text-sm sm:text-base`;

export const BLContainer = tw.div`m-auto`;

const BLComponent = tw.div`flex m-auto bg-gray-100 rounded-3xl sm:rounded-xl
w-[17rem] sm:w-[35rem] md:w-[42rem] relative max-sm:flex-col items-center pb-2 sm:p-3
`;

// export const BLImage = tw.div`aspect-square w-[14.5rem] h-[14.5rem] sm:w-[8rem] sm:h-[8rem] rounded-t-3xl`;
const BLImage = tw.div`aspect-square w-[17rem] h-[17rem] sm:w-[8rem] sm:h-[8rem] rounded-t-3xl`;
const BLContent = tw.div`sm:px-5 w-4/5 h-[8rem] flex flex-col justify-between`;
const BLTitle = tw.div`flex justify-between text-2xl sm:text-2xl pt-2`;
const Text = tw.div`text-sm truncate sm:text-base h-[4rem] break-all`;
const ActInfo = tw.div`flex items-center justify-center text-sm sm:text-base flex-wrap`;

// blog 페이지일 때를 제외하고 list에 작성자 프로필, 닉네임 출력
export default function BestBlogItem({ list, children }: any) {
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
              <ActInfo className="my-1">
                <DefaultProfileImage
                  profileImg={profileImage}
                  width={25}
                  height={25}
                  borderW={0}
                >
                  blog
                </DefaultProfileImage>
                <div className="mx-1">{nickname}</div>
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
            <span className="mx-[0.15rem] hidden sm:block">
              <WriteDate>{createdAt && getParsedDate(createdAt)}</WriteDate>
            </span>
          </ActInfo>
        </div>
      </BLContent>
    </BLComponent>
  );
}
