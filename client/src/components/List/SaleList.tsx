import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";

import { getSaleList } from "../../api/tabApi";
import BlogSaleInfo from "../Page/UserHome/BlogSaleInfo";
import SaleItem from "./SaleItem";
import { BlogSelectState } from "../../state/BlogPostState";
import { SearchSaleDataProps } from "../../type/saleType";
import ScrollRoader from "../Scroll/ScrollRoader";

export const SLContainer = tw.div`m-auto`;
export const SLComponent = tw.div`grid grid-cols-1 min-[370px]:grid-cols-2 sm:grid-cols-3 mt-4 gap-3`;

export default function SaleList() {
  const router = useRouter();
  const homeId = Number(router.query.userId);

  // 최신순, 인기순 클릭 저장하고 있는 state // 기본적으로 최신순
  const select = useRecoilValue(BlogSelectState);

  // 불러온 데이터 저장
  const [listData, setListData] = useState<SearchSaleDataProps[]>([]);
  // 무한 스크롤
  const [hasNext, setHasNext] = useState(false);
  const [ref, inview] = useInView({ threshold: 0 });
  const limit = 12;
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 처음: 판매 게시글 리스트 api 요청
  const getData = async () => {
    if (select === "최신순") {
      const res = await getSaleList(homeId, 0, limit, "SALE_NEWEST");
      const listRes = (res as any).data;
      setListData([listRes]);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    } else {
      const res = await getSaleList(homeId, 0, limit, "SALE_MOST_LIKE");
      const listRes = (res as any).data;
      setListData([listRes]);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    }
  };

  // 처음 이후 : 판매 게시글 리스트 api 요청
  const moreGetData = async () => {
    if (select === "최신순") {
      const res = await getSaleList(homeId, offset, limit, "SALE_NEWEST");
      const moreListRes = (res as any).data;
      setListData([...listData, moreListRes]);
      setHasNext(moreListRes.hasNext);
      setOffset(offset + limit);
      setIsLoading(false);
    } else {
      const res = await getSaleList(homeId, offset, limit, "SALE_MOST_LIKE");
      const moreListRes = (res as any).data;
      setListData([...listData, moreListRes]);
      setHasNext(moreListRes.hasNext);
      setOffset(offset + limit);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, [router.isReady, select, homeId]);

  useEffect(() => {
    if (hasNext && inview) {
      setIsLoading(true);
      setTimeout(async () => {
        moreGetData();
      }, 1000);
    }
  }, [inview]);

  return (
    <SLContainer>
      <BlogSaleInfo>판매</BlogSaleInfo>
      {listData[0] &&
        listData.map((item: any, index: number) => (
          <SLComponent key={index}>
            {item.sales &&
              item.sales.map((el: any) => (
                <div key={el.id}>
                  <SaleItem list={el} key={el.id} />
                </div>
              ))}
          </SLComponent>
        ))}
      <div ref={ref} className="flex justify-center p-8">
        {isLoading && <ScrollRoader />}
      </div>
    </SLContainer>
  );
}
