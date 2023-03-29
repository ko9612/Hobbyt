import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BlogSaleInfo from "../Page/UserHome/BlogSaleInfo";
import BlogItem from "./BlogItem";
import { SearchBlogDataProps } from "../../type/blogType";
import ScrollRoader from "../Scroll/ScrollRoader";
import { BlogSelectState } from "../../state/BlogPostState";
import { getBlogContentList } from "../../api/tabApi";

export const BLContainer = tw.div`w-[43rem] m-auto`;

// interface ListProps {
//   list: BlogItemProps[];
// }

function BlogList({ list }: SearchBlogDataProps) {
  const router = useRouter();
  const uid = Number(router.query.userId);
  // 최신순, 인기순 클릭 저장하고 있는 state
  //  기본적으로 최신순으로 되어 있음
  const select = useRecoilValue(BlogSelectState);

  // api 리스트 데이터 저장
  const [listData, setListData] = useState([list]);
  // 무한 스크롤
  const [hasNext, setHasNext] = useState(false);
  const [ref, inview] = useInView({ threshold: 0 });
  const limit = 7;
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 처음 : 블로그 게시글 리스트 api 요청
  const getData = async () => {
    if (select === "최신순") {
      const res = await getBlogContentList(uid, 0, limit, "POST_NEWEST");
      const listRes = (res as any).data;
      setListData([listRes]);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    } else if (select === "인기순") {
      const res = await getBlogContentList(uid, 0, limit, "POST_MOSTLIKE");
      const listRes = (res as any).data;
      setListData([listRes]);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    }
  };

  // 처음 이후 : 블로그 게시글 리스트 api 요청
  const moreGetData = async () => {
    if (select === "최신순") {
      const res = await getBlogContentList(uid, offset, limit, "POST_NEWEST");
      const moreListRes = (res as any).data;
      setListData([...listData, moreListRes]);
      setHasNext(moreListRes.hasNext);
      setOffset(offset + limit);
      setIsLoading(false);
    } else {
      const res = await getBlogContentList(uid, offset, limit, "POST_MOSTLIKE");
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
  }, [router.isReady, select]);

  useEffect(() => {
    if (hasNext && inview) {
      setIsLoading(true);
      setTimeout(async () => {
        moreGetData();
      }, 1000);
    }
  }, [inview]);

  console.log("블로그", listData);

  return (
    <BLContainer>
      <BlogSaleInfo>블로그</BlogSaleInfo>
      {listData[0] &&
        listData.map((item: any, index: number) => (
          <div key={index}>
            {item.posts &&
              item.posts.map((el: any) => (
                <div key={el.id}>
                  <BlogItem list={el} />
                </div>
              ))}
          </div>
        ))}
      <div ref={ref} className="flex justify-center p-8 border-4 border-black">
        {isLoading && <ScrollRoader />}
      </div>
    </BLContainer>
  );
}
export default BlogList;
