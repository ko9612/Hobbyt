import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useInView } from "react-intersection-observer";
import BlogItem, { BLContainer } from "./BlogItem"; // 새로 추가
import { getBlogLikeList, getSaleLikeList } from "../../api/tabApi";
import { ILikeList } from "../../type/blogType";
import MyLikeFilterBut from "../Button/MyLikeFilterBut";
import { BlogLikeSelectState } from "../../state/BlogPostState";
import ScrollRoader from "../Scroll/ScrollRoader";
import SaleItem from "./SaleItem";
import { SLComponent } from "./SaleList";

export default function LikeList() {
  // 블로그 주인 아이디
  const router = useRouter();
  const homeId = Number(router.query.userId);

  // console.log("홈아이디", homeId);
  // 블로그, 판매 필터 클릭 저장하는 state // 기본적으로 블로그
  const likeSelect = useRecoilValue(BlogLikeSelectState);

  // 불러온 데이터 저장
  const [listData, setListData] = useState<ILikeList[]>([]);
  // 무한 스크롤
  const [hasNext, setHasNext] = useState(false);
  const [ref, inview] = useInView({ threshold: 0 });
  const limit = 9;
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 처음: 좋아요 리스트 api 요청
  const getData = async () => {
    if (likeSelect === "블로그") {
      const res = await getBlogLikeList(homeId, 0, limit);
      const listRes = res.data;
      setListData([listRes]);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    } else if (likeSelect === "판매") {
      const res = await getSaleLikeList(homeId, 0, limit);
      const listRes = res.data;
      setListData([listRes]);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    }
  };
  // 처음 이후 : 좋아요 리스트 api 요청
  const moreGetData = async () => {
    if (likeSelect === "블로그") {
      const res = await getBlogLikeList(homeId, offset, limit);
      const moreListRes = (res as any).data;
      setListData([...listData, moreListRes]);
      setOffset(offset + limit);
      setHasNext(moreListRes.hasNext);
      setIsLoading(false);
    } else if (likeSelect === "판매") {
      const res = await getSaleLikeList(homeId, offset, limit);
      const moreListRes = (res as any).data;
      setListData([...listData, moreListRes]);
      setOffset(offset + limit);
      setHasNext(moreListRes.hasNext);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, [router.isReady, likeSelect]);

  useEffect(() => {
    if (hasNext && inview) {
      setIsLoading(true);
      setTimeout(async () => {
        moreGetData();
      }, 1000);
    }
  }, [inview]);

  // // 날짜 바꿔주는 함수
  // const getParsedDate = (date: string) =>
  //   new Date(date).toLocaleDateString("ko-KR");

  // // 텍스트에서 html 제거하는 정규식
  // const regText = (content: string) => {
  //   const newText = content.replace(/<[^>]*>?/g, "");
  //   return newText;
  // };

  console.log("내 좋아요 리스트", listData);

  return (
    <BLContainer>
      <MyLikeFilterBut />
      {listData[0] &&
        listData.map((item: any) => (
          <div key={item}>
            {likeSelect === "블로그" ? (
              <div>
                {item.cards &&
                  item.cards.map((el: any) => (
                    <div key={el.id}>
                      <BlogItem list={el} />
                    </div>
                  ))}
              </div>
            ) : (
              <SLComponent>
                {item.cards &&
                  item.cards.map((el: any) => (
                    <div key={el.id}>
                      <SaleItem list={el}>sale</SaleItem>
                    </div>
                  ))}
              </SLComponent>
            )}
          </div>
        ))}
      <div ref={ref} className="flex justify-center p-8 border-4 border-black">
        {isLoading && <ScrollRoader />}
      </div>
    </BLContainer>
  );
}
