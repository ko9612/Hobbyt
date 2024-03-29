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
import { BLTitle } from "./BlogItem";

export const SLContent = tw.div`bg-gray-100 rounded-3xl justify-center items-center relative`;
export const SLImage = tw.div`mb-2 h-auto overflow-hidden aspect-square rounded-t-3xl`;
export const SLProductInfo = tw.div`px-4`;
const SLImageC = tw.div``;

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

  return (
    <SLContent>
      <SLImage>
        <Image
          src={thumbnailImage !== null ? thumbnailImage : saleDImage}
          alt="img"
          width={250}
          height={250}
          className={`object-cover w-full h-full ${
            thumbnailImage !== null && "rounded-t-3xl"
          }`}
        />
      </SLImage>
      <SLProductInfo>
        <BLTitle>
          <Link href={`/blog/${writerId}/sale/${id}`} className="w-5/6">
            <div className="flex items-center mt-1 font-semibold">
              <h2 className="text-lg font-semibold truncate">{title}</h2>
            </div>
          </Link>
          {writerId === userId && router.pathname.includes("/blog") ? (
            <SLImageC>
              <ThreeDotsBox item={list}>작품</ThreeDotsBox>
            </SLImageC>
          ) : null}
        </BLTitle>
        <div className="flex items-center h-[2rem]">
          <BsCalendar4 className="w-[1.5rem]" />
          <p className="pl-2 text-sm">
            {period !== null ? (
              <div className="flex flex-wrap">
                <span>{startedAt?.substring(2)}</span>
                <span>~{endAt?.substring(2)}</span>
              </div>
            ) : (
              "상시판매"
            )}
          </p>
        </div>
        <div className="flex items-center justify-between py-2 text-sm md:text-base h-[3rem]">
          {profileImage !== undefined && (
            <Link
              href={`/blog/${writerId}`}
              className="flex items-center w-[8rem]"
            >
              <div className="aspect-square w-6 h-6 mr-[0.25rem] sm:mr-2">
                <DefaultProfileImage
                  profileImg={profileImage}
                  width={20}
                  height={20}
                  borderW={1}
                >
                  sale
                </DefaultProfileImage>
              </div>
              <div className="max-[369px]:w-full max-[450px]:w-16 truncate">
                {nickname}
              </div>
            </Link>
          )}
          <div className="flex items-center ml-auto">
            <LikeCount>{likeCount}</LikeCount>
          </div>
        </div>
      </SLProductInfo>
    </SLContent>
  );
}
