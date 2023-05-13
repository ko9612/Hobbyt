import tw from "tailwind-styled-components";
import { BsCalendar4 } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";
import saleDImage from "../../image/saleDImage.svg";
import LikeCount from "../ViewLikeWrite/LikeCount";
import DefaultProfileImage from "../Page/UserHome/DefaultProfileImg";
import { SaleItemProps } from "../../type/saleType";
import { UserIdState } from "../../state/UserState";

export const SLContent = tw.div`inline-block bg-gray-100 rounded-3xl justify-center items-center
w-[14.5rem] sm:w-[13rem]`;
export const SLImage = tw.div`mb-2 relative h-auto overflow-hidden aspect-square rounded-t-3xl`;
export const SLProductInfo = tw.div`mx-4 text-sm sm:text-base`;
const SLImageC = tw.div`absolute left-[11.5rem] top-1`;

interface ListProps {
  list: SaleItemProps;
}

// blog 페이지일 때를 제외하고 list에 작성자 프로필, 닉네임 출력
export default function SaleItem({ list }: ListProps) {
  const router = useRouter();
  const userId = useRecoilValue(UserIdState);
  const {
    id,
    thumbnailImage,
    title,
    period,
    likeCount,
    nickname,
    writerId,
    profileImage,
  } = list || {};
  const { startedAt, endAt } = period || {};

  // console.log(
  //   `writerId = ${writerId} // userId = ${userId} // router.pathname = ${router.pathname.includes(
  //     "/blog",
  //   )}`,
  // );

  return (
    <SLContent>
      <SLImage>
        {writerId === userId && router.pathname.includes("/blog") ? (
          <SLImageC>
            <ThreeDotsBox item={list}>작품</ThreeDotsBox>
          </SLImageC>
        ) : null}
        <Image
          src={thumbnailImage !== null ? thumbnailImage : saleDImage}
          alt="img"
          width={250}
          height={250}
          className={
            thumbnailImage !== null
              ? `object-cover rounded-t-3xl w-full h-full scale-105 `
              : `h-full object-cover scale-105`
          }
        />
      </SLImage>
      <SLProductInfo>
        <Link href={`/blog/${writerId}/sale/${id}`}>
          <h2 className="my-3 text-lg font-semibold truncate">{title}</h2>
          <div className="flex items-center">
            <BsCalendar4 className="w-[1.5rem]" />
            <p className="flex flex-wrap pl-2 text-sm">
              {period !== null ? (
                <div>
                  <span>{startedAt?.substring(2)}</span>
                  <span> ~ </span>
                  <span>{endAt?.substring(2)}</span>
                </div>
              ) : (
                "상시판매"
              )}
            </p>
          </div>
        </Link>
        <div className="flex items-center justify-between py-2">
          {profileImage !== undefined && (
            <Link href={`/blog/${writerId}`} className="flex items-center">
              <div className="w-[2rem] mr-[0.1rem] sm:mr-2">
                <DefaultProfileImage
                  profileImg={profileImage}
                  width={20}
                  height={20}
                  borderW={1}
                >
                  sale
                </DefaultProfileImage>
              </div>
              <div>{nickname}</div>
            </Link>
          )}
          <div className="flex items-center pb-2 ml-auto">
            <LikeCount>{likeCount}</LikeCount>
          </div>
        </div>
      </SLProductInfo>
    </SLContent>
  );
}
