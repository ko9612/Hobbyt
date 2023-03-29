import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import FilterButton from "../../Button/FilterButton";
import { SLContainer } from "../../List/SaleList";
import { SearchSaleDataProps, SaleItemProps } from "../../../type/saleType";
import { BlogSelectState } from "../../../state/BlogPostState";
import SaleItem from "../../List/SaleItem";
import { getSearchSaleList } from "../../../api/SearchApi";
import ScrollRoader from "../../Scroll/ScrollRoader";

export const Content = tw.article`
flex items-center mb-14
`;

export const Item = tw.div`
mx-auto grid sm:grid-cols-3 grid-cols-2 gap-14
`;

export default function SearchSales() {
  const router = useRouter();
  const select = useRecoilValue(BlogSelectState);
  // get으로 불러온 데이터 저장state
  const [listData, setListData] = useState<SearchSaleDataProps[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩state
  const [ref, inView] = useInView({ threshold: 0 }); // hook, ref=관찰할 대상에 설정, inView=타겟이 보이지 않으면 false, 보이면 true
  // 검색 키워드
  const keyword = router.query.keywords;
  const limit = 9;
  const [offset, setOffset] = useState(0);

  // 검색: 검색 후, 첫 판매 게시글 리스트 api 요청
  const getSearchSaleData = async () => {
    if (select === "최신순") {
      const res = await getSearchSaleList(keyword, 0, 9, "SALE_NEWEST");
      const listRes = (res as any).data;
      setListData([listRes]);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    } else {
      const res = await getSearchSaleList(keyword, 0, 9, "SALE_MOST_LIKE");
      const listRes = (res as any).data;
      setListData([listRes]);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    }
  };

  // 첫 요청 이후, 블로그 게시글 리스트 api 요청(무한 스크롤)

  const moreSearchSaleData = async () => {
    if (select === "최신순") {
      const res = await getSearchSaleList(
        keyword,
        offset,
        limit,
        "SALE_NEWEST",
      );
      const listRes = (res as any).data;
      setListData([...listData, listRes]);
      setHasNext(listRes.hasNext);
      setOffset(offset + limit);
      setIsLoading(false);
    } else {
      const res = await getSearchSaleList(
        keyword,
        offset,
        limit,
        "SALE_MOST_LIKE",
      );
      const listRes = (res as any).data;
      setListData([...listData, listRes]);
      setHasNext(listRes.hasNext);
      setOffset(offset + limit);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSearchSaleData();
  }, [select, keyword]);

  useEffect(() => {
    if (hasNext && inView) {
      setIsLoading(true);
      setTimeout(async () => {
        moreSearchSaleData();
      }, 1000);
    }
  }, [inView]);

  console.log("서치", listData);

  return (
    <SLContainer>
      <div className="py-10 text-lg">
        <span className="text-3xl font-semibold text-MainColor">
          {keyword}{" "}
        </span>
        작품 검색결과
      </div>
      <div className="flex justify-end pb-5">
        <FilterButton />
      </div>
      {listData &&
        listData.map((item, idx) => (
          <Content key={idx}>
            <Item>
              {item.sales &&
                item.sales.map((el: SaleItemProps) => (
                  <SaleItem list={el} key={el.id} />
                ))}
            </Item>
          </Content>
        ))}
      <div ref={ref} className="flex justify-center p-8">
        {isLoading && <ScrollRoader />}
      </div>
    </SLContainer>
  );
}
