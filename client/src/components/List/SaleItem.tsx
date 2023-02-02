import tw from "tailwind-styled-components";
import { BsCalendar4 } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";
import saleDImage from "../../image/saleDImage.svg";
import LikeCount from "../ViewLikeWrite/LikeCount";
import DefaultProfileImage from "../Page/UserHome/DefaultProfileImg";

export const SLContent = tw.div`w-full inline-block bg-gray-100 rounded-3xl justify-center items-center`;
export const SLImage = tw.div`rounded-lg mb-2 relative`;
export const SLProductInfo = tw.div`mx-4`;
const SLImageC = tw.div`absolute left-[11.5rem] top-1`;

// blog 페이지일 때를 제외하고 list에 작성자 프로필, 닉네임 출력
export default function SaleItem({ list }: any) {
  const router = useRouter();
  return (
    <SLContent>
      <SLImage>
        <SLImageC>
          <ThreeDotsBox item={list}>작품</ThreeDotsBox>
        </SLImageC>
        <Image
          src={list.thumbnailImage || saleDImage}
          alt="img"
          width={225}
          height={225}
        />
      </SLImage>
      <SLProductInfo>
        <Link href={`/sale/${list.id}`}>
          <p className="my-3">{list.title}</p>
          <div className="flex items-center">
            <BsCalendar4 />
            <p className="pl-2 text-sm">
              {list.period !== null
                ? `${list.period?.startedAt}~${list.period?.endAt}`
                : "상시 판매"}
            </p>
          </div>
        </Link>
        {router.pathname !== "/blog" && (
          <div className="flex items-center float-left py-2">
            <div className="w-[1.75rem]">
              <DefaultProfileImage
                profileImg={list.writerImg}
                width={20}
                height={20}
                borderW={1}
              />
            </div>
            <div>{list.nickname}</div>
          </div>
        )}
        <div className="float-right py-2">
          <LikeCount>{list.likeCount}</LikeCount>
        </div>
      </SLProductInfo>
    </SLContent>
  );
}
