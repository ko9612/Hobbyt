import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useInView } from "react-intersection-observer";
import { BLContainer, BLComponent, BLImage, BLContent, Text } from "./BlogItem"; // 새로 추가
import ViewCount from "../ViewLikeWrite/ViewCount";
import LikeCount from "../ViewLikeWrite/LikeCount";
import WriteDate from "../ViewLikeWrite/WriteDate";
import { getBlogLikeList, getSaleLikeList } from "../../api/tabApi";
import { ILikeList } from "../../type/blogType";
import DefalutImage from "../../image/pictureDefalut.svg";
import MyLikeFilterBut from "../Button/MyLikeFilterBut";
import { BlogLikeSelectState } from "../../state/BlogPostState";
import ScrollRoader from "../Scroll/ScrollRoader";

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
  const limit = 12;
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 처음: 좋아요 리스트 api 요청
  const getData = async () => {
    if (likeSelect === "블로그") {
      const res = await getBlogLikeList(homeId, offset, limit);
      const listRes = res.data;
      setListData([listRes]);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    } else if (likeSelect === "판매") {
      const res = await getSaleLikeList(homeId, offset, limit);
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
      const moreListRes = res.data;
      setListData([...listData, moreListRes]);
      setOffset(offset + limit);
      setHasNext(moreListRes.hasNext);
      setIsLoading(false);
    } else if (likeSelect === "판매") {
      const res = await getSaleLikeList(homeId, offset, limit);
      const moreListRes = res.data;
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

  // 날짜 바꿔주는 함수
  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  // 텍스트에서 html 제거하는 정규식
  const regText = (content: string) => {
    const newText = content.replace(/<[^>]*>?/g, "");
    return newText;
  };

  console.log("내 좋아요 리스트", listData);

  return (
    <BLContainer>
      <MyLikeFilterBut />
      {listData[0] &&
        listData.map((item: any, index: number) => (
          <div key={index}>
            {item.cards &&
              item.cards.map((el: any) => (
                <BLComponent key={el.id}>
                  <BLImage>
                    <Image
                      src={
                        el.thumbnailImage !== null
                          ? el.thumbnailImage
                          : DefalutImage
                      }
                      alt="img"
                      width={150}
                      height={150}
                      className={
                        el.thumbnailImage !== null
                          ? "rounded-xl object-cover w-[7.82rem] h-[7.82rem]"
                          : ""
                      }
                    />
                  </BLImage>
                  <BLContent>
                    <Link href={`/blog/${el.writerId}/post/${el.postId}`}>
                      <div className="flex justify-between">
                        <h2 className="text-2xl font-semibold">{el.title}</h2>
                      </div>
                      <Text>{el.content && regText(el.content)}</Text>
                    </Link>
                    <div className="flex justify-end ">
                      <ViewCount>{el.viewCount}</ViewCount>
                      <LikeCount>{el.likeCount}</LikeCount>
                      <WriteDate>
                        {el.createdAt && getParsedDate(el.createdAt)}
                      </WriteDate>
                    </div>
                  </BLContent>
                </BLComponent>
              ))}
          </div>
        ))}
      {/* {listData?.cards &&
        listData?.cards.map((item: any, idx: number) => (
          <BLComponent key={idx}>
            <BLImage>
              <Image
                src={
                  item.thumbnailImage !== null
                    ? item.thumbnailImage
                    : DefalutImage
                }
                alt="img"
                width={150}
                height={150}
                className={
                  item.thumbnailImage !== null
                    ? "rounded-xl object-cover w-[7.82rem] h-[7.82rem]"
                    : ""
                }
              />
            </BLImage>
            <BLContent>
              <Link href={`/blog/${item.writerId}/post/${item.postId}`}>
                <div className="flex justify-between">
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                </div>
                <Text>{item.content && regText(item.content)}</Text>
              </Link>
              <div className="flex justify-end ">
                <ViewCount>{item.viewCount}</ViewCount>
                <LikeCount>{item.likeCount}</LikeCount>
                <WriteDate>
                  {item.createdAt && getParsedDate(item.createdAt)}
                </WriteDate>
              </div>
            </BLContent>
          </BLComponent>
        ))} */}
      <div ref={ref} className="flex justify-center p-8 border-4 border-black">
        {isLoading && <ScrollRoader />}
      </div>
    </BLContainer>
  );
}
