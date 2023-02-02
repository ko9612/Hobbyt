import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";
import { getSaleList, getSaleListF } from "../../api/tabApi";
import { UserIdState } from "../../state/UserState";
// import { BsCalendar4 } from "react-icons/bs";
// import Link from "next/link";
// import Image from "next/image";
// import LikeCount from "../ViewLikeWrite/LikeCount";
import BlogSaleInfo from "../Page/UserHome/BlogSaleInfo";
// import ThreeDotsBox from "../SelectBox/ThreeDotsBox";
// import saleDIamge from "../../image/saleDImage.svg";
import SaleItem from "./SaleItem";

export const SLContainer = tw.div`m-auto`;
const SLComponent = tw.div`grid grid-cols-3 mt-4 gap-3`;

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

  const userID = useRecoilValue(UserIdState);

  // 최신순, 인기순 클릭 저장하고 있는 state // 기본적으로 최신순
  const [select, setSelect] = useState("최신순");

  // 불러온 데이터 저장
  const [listData, setListData] = useState([]);

  // 판매 게시글 리스트 api 요청
  const getData = async () => {
    if (select === "최신순") {
      const res = await getSaleList(userID, 0, 9);
      const listRes = res.data;
      setListData(listRes);
      console.log("listRes", res.data);
    } else if (select === "인기순") {
      const res = await getSaleListF(userID, 0, 9);
      const listRes = res.data;
      setListData(listRes);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SLContainer>
      <BlogSaleInfo>판매</BlogSaleInfo>
      <SLComponent>
        {listData.sales &&
          listData.sales.map(item => <SaleItem list={item} key={item.id} />)}
      </SLComponent>
    </SLContainer>
  );
}

// eslint-disable-next-line no-lone-blocks
{
  /* <SLContent key={item.id}>
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
</SLContent> */
}
