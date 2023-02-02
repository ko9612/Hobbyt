import tw from "tailwind-styled-components";
import { BsCalendar4 } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";
import saleDImage from "../../image/saleDImage.svg";
import LikeCount from "../ViewLikeWrite/LikeCount";

export const SLContent = tw.div`w-full inline-block bg-gray-100 rounded-3xl justify-center items-center`;
export const SLImage = tw.div`rounded-lg mb-2 relative`;
export const SLProductInfo = tw.div`mx-4`;
const SLImageC = tw.div`absolute left-[11.5rem] top-1`;

export default function SaleItem({ list }) {
  console.log("판매리스트아이템", list);
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
          <p className="mt-3">{list.title}</p>
          <div className="flex">
            <BsCalendar4 />
            <p className="pl-2">
              {list.period !== null
                ? `${list.period?.startedAt}~${list.period?.endAt}`
                : "상시 판매"}
            </p>
          </div>
        </Link>
        <div className="float-right pb-2">
          <LikeCount>{list.likeCount}</LikeCount>
        </div>
      </SLProductInfo>
    </SLContent>
  );
}
