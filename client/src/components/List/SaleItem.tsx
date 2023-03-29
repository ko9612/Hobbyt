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

export const SLContent = tw.div`w-full inline-block bg-gray-100 rounded-3xl justify-center items-center`;
export const SLImage = tw.div`mb-2 relative h-auto`;
export const SLProductInfo = tw.div`mx-4`;
const SLImageC = tw.div`absolute left-[11.5rem] top-1`;

interface ListProps {
  list: SaleItemProps;
  children: string;
}

// blog 페이지일 때를 제외하고 list에 작성자 프로필, 닉네임 출력
export default function SaleItem({ list, children }: ListProps) {
  const router = useRouter();
  const userId = useRecoilValue(UserIdState);
  const {
    id,
    thumbnailImage,
    title,
    period,
    likeCount,
    nickname,
    isAlwaysOnSale,
    writerId,
    profileImage,
  } = list || {};
  const { startedAt, endAt } = period || {};

  return (
    <SLContent>
      <SLImage>
        {/* {(writerId === userId && router.pathname !== "/") ||
        router.pathname.includes("/blog") ? ( */}
        {writerId === userId && router.pathname.includes("/blog") ? (
          <SLImageC>
            <ThreeDotsBox item={list}>작품</ThreeDotsBox>
          </SLImageC>
        ) : null}
        <Image
          src={
            thumbnailImage !== "기본 이미지"
              ? `/api/images/${thumbnailImage}`
              : saleDImage
          }
          alt="img"
          width={250}
          height={250}
          className={`object-cover rounded-t-3xl ${
            children === "best" || children === "search"
              ? `w-[15rem] h-[15rem]`
              : `w-54 h-54`
          }`}
        />
      </SLImage>
      <SLProductInfo>
        <Link href={`/blog/${writerId}/sale/${id}`}>
          <h2 className="my-3 truncate">{title}</h2>
          <div className="flex items-center">
            <BsCalendar4 />
            <p className="pl-2 text-sm">
              {!isAlwaysOnSale ? `${startedAt}~${endAt}` : "상시 판매"}
            </p>
          </div>
        </Link>
        {!router.pathname.includes("/blog") && (
          <Link
            href={`/blog/${writerId}`}
            className="flex items-center float-left py-2"
          >
            <div className="w-[2rem] mr-2">
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
        <div className="float-right py-2">
          <LikeCount>{likeCount}</LikeCount>
        </div>
      </SLProductInfo>
    </SLContent>
  );
}
