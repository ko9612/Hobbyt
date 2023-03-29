import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import BlogItem from "../../List/BlogItem";
import FilterButton from "../../Button/FilterButton";
import { SearchBlogDataProps, BlogItemProps } from "../../../type/blogType";
import { BlogSelectState } from "../../../state/BlogPostState";
import { getSearchBlogList } from "../../../api/SearchApi";
import ScrollRoader from "../../Scroll/ScrollRoader";

const SRContainer = tw.div`m-auto`;

function SearchBlog() {
  const router = useRouter();
  const select = useRecoilValue(BlogSelectState);
  // get으로 불러온 데이터 저장state
  const [listData, setListData] = useState<SearchBlogDataProps[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩state
  const [ref, inView] = useInView({ threshold: 0 }); // hook, ref=관찰할 대상에 설정, inView=타겟이 보이지 않으면 false, 보이면 true
  // 검색 키워드
  const keyword = router.query.keywords;
  const limit = 5;
  const [offset, setOffset] = useState(0);

  // 검색: 검색 후, 첫 블로그 게시글 리스트 api 요청
  const getSearchBlogData = async () => {
    if (select === "최신순") {
      const res = await getSearchBlogList(keyword, 0, limit, "POST_NEWEST");
      const listRes = (res as any).data;
      setListData([listRes]);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    } else {
      const res = await getSearchBlogList(keyword, 0, limit, "POST_MOSTLIKE");
      const listRes = (res as any).data;
      setListData([listRes]);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    }
  };

  console.log(listData);

  // 첫 요청 이후, 블로그 게시글 리스트 api 요청(무한 스크롤)
  const moreSearchBlogData = async () => {
    if (select === "최신순") {
      const res = await getSearchBlogList(
        keyword,
        offset,
        limit,
        "POST_NEWEST",
      );
      const listRes = (res as any).data;
      setListData([...listData, listRes]);
      setHasNext(listRes.hasNext);
      setOffset(offset + limit);
      setIsLoading(false);
    } else {
      const res = await getSearchBlogList(
        keyword,
        offset,
        limit,
        "POST_MOSTLIKE",
      );
      const listRes = (res as any).data;
      setListData([...listData, listRes]);
      setHasNext(listRes.hasNext);
      setOffset(offset + limit);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSearchBlogData();
  }, [select, keyword]);

  useEffect(() => {
    if (hasNext && inView) {
      setIsLoading(true);
      setTimeout(async () => {
        moreSearchBlogData();
      }, 1000);
    }
  }, [inView]);

  console.log("서치", listData);

  return (
    <SRContainer>
      <div className="py-10 text-lg">
        <span className="text-3xl font-semibold text-MainColor">
          {keyword}{" "}
        </span>
        블로그 검색결과
      </div>
      <div className="flex justify-end">
        <FilterButton />
      </div>
      {listData &&
        listData.map((item, idx) => (
          <div key={idx}>
            {item.posts &&
              item.posts.map((el: BlogItemProps) => (
                <div key={el.id}>
                  {el.isPublic && <BlogItem list={el} key={el.id} />}
                </div>
              ))}
          </div>
        ))}
      <div ref={ref} className="flex justify-center p-8">
        {isLoading && <ScrollRoader />}
      </div>
    </SRContainer>
  );
}
export default SearchBlog;
