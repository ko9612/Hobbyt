import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";
import { getSaleList, getSaleListF } from "../../api/tabApi";
import { UserIdState } from "../../state/UserState";
import BlogSaleInfo from "../Page/UserHome/BlogSaleInfo";
import SaleItem from "./SaleItem";
import { BlogSelectState } from "../../state/BlogPostState";

export const SLContainer = tw.div`m-auto`;
const SLComponent = tw.div`grid grid-cols-3 mt-4 gap-3`;

export default function SaleList() {
  const userID = useRecoilValue(UserIdState);

  // 최신순, 인기순 클릭 저장하고 있는 state // 기본적으로 최신순
  const select = useRecoilValue(BlogSelectState);

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
  }, [select]);

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
