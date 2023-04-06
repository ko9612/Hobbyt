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
import DefalutImage from "../../image/pictureDefalut.svg";
import DefaultProfileImage from "../Page/UserHome/DefaultProfileImg";
import { UserIdState } from "../../state/UserState";

export const BLContainer = tw.div`m-auto`;
export const BLComponent = tw.div`flex m-auto mt-4 p-5 bg-gray-100 rounded-lg border-2 border-red-500 sm:max-w-[38rem]`;
export const BLImage = tw.div`w-1/5 h-full`;
export const BLContent = tw.div`ml-5 w-4/5 flex flex-col justify-between`;
export const BLTitle = tw.div`flex justify-between border-2 border-red-500`;
export const Text = tw.div`text-sm truncate sm:text-base border-2 border-blue-500 h-[4rem] break-all`;
export const ActInfo = tw.div`flex items-center`;

// interface ListProps {
//   list: BlogItemProps;
// }

// blog 페이지일 때를 제외하고 list에 작성자 프로필, 닉네임 출력
export default function BlogItem({ list }: any) {
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

  // console.log(`리스트?`, list);
  // console.log("프로필 이미지", profileImage);

  return (
    <BLComponent className={`${router.pathname === "/" && "w-[41rem]"}`}>
      <BLImage>
        <Image
          src={thumbnailImage !== null ? thumbnailImage : DefalutImage}
          alt="img"
          className="rounded-xl object-cover h-[8rem] w-[8rem] sm:max-w-[8rem] sm:max-h-[8rem]"
          width={150}
          height={150}
        />
      </BLImage>
      <BLContent>
        <BLTitle>
          <Link href={`/blog/${writerId}/post/${id}`}>
            {/* <h2 className="truncate text-2xl w-[28rem] font-semibold text-clip flex items-center mt-1"> */}
            <h2 className="truncate text-2xl w-[17rem] md:w-[28rem] font-semibold text-clip flex items-center mt-1">
              {title}
              {router.pathname.startsWith("/blog") && !isPublic && (
                <BsLockFill className="ml-3 text-gray-400" />
              )}
            </h2>
          </Link>
          {writerId === userId && router.pathname.includes("/blog") ? (
            <ThreeDotsBox item={list}>블로그</ThreeDotsBox>
          ) : null}
        </BLTitle>
        <Text>{regText}</Text>
        <div
          className={`${profileImage !== undefined && "flex justify-between"}`}
        >
          {profileImage !== undefined && (
            <Link href={`/blog/${writerId}`}>
              <ActInfo>
                <div className="w-[2.5rem] ">
                  <DefaultProfileImage
                    profileImg={profileImage}
                    width={25}
                    height={25}
                    borderW={0}
                  >
                    blog
                  </DefaultProfileImage>
                </div>
                <div>{nickname}</div>
              </ActInfo>
            </Link>
          )}
          <ActInfo
            className={`${
              profileImage === undefined ? "justify-end" : "float-right"
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
        {/* <div id="list">
          {props.applicant.map(item => {
            <li key={item.id}>{item.name}</li>;
          })}
        </div> */}
      </BLContent>
    </BLComponent>
  );
}
