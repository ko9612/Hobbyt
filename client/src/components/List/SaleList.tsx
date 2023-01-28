import tw from "tailwind-styled-components";
import { BsCalendar4 } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import LikeCount from "../ViewLikeWrite/LikeCount";
import BlogSaleInfo from "../Page/UserHome/BlogSaleInfo";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";
import saleDIamge from "../../image/saleDImage.svg";

export const SLContainer = tw.div`m-auto`;
export const SLComponent = tw.div`grid grid-cols-3 mt-4 gap-3`;
export const SLContent = tw.div`w-full inline-block bg-gray-100 rounded-3xl justify-center items-center`;
export const SLImage = tw.div`rounded-lg mb-2 relative`;
export const SLProductInfo = tw.div`mx-4`;
const SLImageC = tw.div`absolute left-[11.5rem] top-1`;

export default function SaleList() {
  const dummy = [
    {
      title: "판매 게시글 w제목 ",
      id: 1,
      content: "판매게시글 내용~~",
      thumbnailImage: null,
    },
    {
      title: "판매 게시글 제목2 ",
      id: 2,
      content: "판매게시글 내용~~",
      thumbnailImage: null,
    },
    {
      title: "판매 게시글 제목3 ",
      id: 3,
      content: "판매게시글 내용~~",
      thumbnailImage: null,
    },
    {
      title: "판매 게시글 제목4 ",
      id: 4,
      content: "판매게시글 내용~~",
      thumbnailImage: null,
    },
    {
      title: "판매 게시글 제목5 ",
      id: 5,
      content: "판매게시글 내용~~",
      thumbnailImage: null,
    },
    {
      title: "판매 게시글 제목6 ",
      id: 6,
      content: "판매게시글 내용~~",
      thumbnailImage: null,
    },
  ];

  return (
    <SLContainer>
      <BlogSaleInfo>판매</BlogSaleInfo>
      <SLComponent>
        {dummy.map(item => (
          <SLContent key={item.id}>
            <SLImage>
              <SLImageC>
                <ThreeDotsBox item={dummy}>작품</ThreeDotsBox>
              </SLImageC>
              <Image
                src={item.thumbnailImage || saleDIamge}
                alt="img"
                width={225}
                height={225}
              />
            </SLImage>
            <SLProductInfo>
              <Link href="/saledetail">
                <p className="mt-3">{item.title}</p>
                <div className="flex">
                  <BsCalendar4 />
                  <p className="pl-2">22.12.14 ~ 22.12.16</p>
                </div>
              </Link>
              <div className="float-right pb-2">
                <LikeCount>0</LikeCount>
              </div>
            </SLProductInfo>
          </SLContent>
        ))}
      </SLComponent>
    </SLContainer>
  );
}
