import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import BlogList from "../List/BlogList";
import SaleList from "../List/SaleList";
import MyCommentList from "../List/Comment/MyCommentList";
import LikeList from "../List/LikeList";
import ProductstList from "../Page/MyList/ProductsList";
import MyInfoList from "../Page/MyList/MyInfoList";
import PurchaseList from "../Page/MyList/PurchaseList";
import SalesManagementList from "../Page/MyList/SalesManagementList";
import SearchBlog from "../Page/Search/SearchBlog";
import SearchSales from "../Page/Search/SearchSales";
import { getBlogContentList } from "../../api/tabApi";
import { BlogSelectState } from "../../state/BlogPostState";
import FollowingList from "../List/FollowingList";
import FollowerList from "../List/FollowerList";
import { BlogTabProps } from "../../type/blogType";

interface TabProps {
  Menus: {
    id: number;
    name: string;
    content: string;
  }[];
}

const TabMenu = tw.ul`flex items-center flex-row m-auto list-none bg-white text-xl`;
const TabContent = tw.div``;

export default function Tab({ Menus }: TabProps) {
  const router = useRouter();
  // 어떤 Tab이 선택되어 있는지 확인하기 위한
  const [curIndex, setIndex] = useState(0);
  // 최신순, 인기순 클릭 저장하고 있는 state
  //  기본적으로 최신순으로 되어 있음
  const [select, setSelect] = useRecoilState(BlogSelectState);

  const uid = Number(router.query.userId);

  const [hasNext, setHasNext] = useState(false);
  // const [ref, inview] = useInView({ threshold: 0 });
  const limit = 7;
  const [offset, setOffset] = useState(0);

  // 탭 클릭 함수
  const onClickMenuHandler = (index: number) => {
    setIndex(index);
    console.log("index", index);
  };

  // api 리스트 데이터 저장
  const [listData, setListData] = useState<BlogTabProps[]>([]);

  // 처음 : 블로그 게시글 리스트 api 요청
  const getData = async () => {
    if (select === "최신순") {
      const res = await getBlogContentList(uid, offset, limit, "POST_NEWEST");
      const listRes = (res as any).data;
      setListData(listRes);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    } else if (select === "인기순") {
      const res = await getBlogContentList(uid, offset, limit, "POST_MOSTLIKE");
      const listRes = (res as any).data;
      setListData(listRes);
      setOffset(limit);
      setHasNext(listRes.hasNext);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (
        Menus[curIndex].name === "블로그" &&
        router.pathname.includes("/blog")
      ) {
        getData();
      }
    }
  }, [select, uid, curIndex, router.isReady]);

  // curIndex 바뀌면 select값 최신순으로 초기화
  useEffect(() => {
    setSelect("최신순");
  }, [curIndex]);

  // router.path 에 /follower 가 있으면
  //  처음 랜더링될 때 setIndex가 1이 된다
  useEffect(() => {
    console.log(router.asPath);
    if (router.pathname.includes("/follower")) {
      setIndex(1);
    }
  }, []);

  // console.log("탭 리스트", listData);
  // console.log("ref1", typeof ref);

  return (
    <>
      <TabMenu>
        {Menus.map((section, index: number) => (
          <li
            role="presentation"
            key={index}
            className={
              curIndex === index ? "tab-submenu tab-focused" : "tab-submenu"
            }
            onClick={() => onClickMenuHandler(index)}
          >
            {section.name}
          </li>
        ))}
      </TabMenu>
      <TabContent>
        {Menus[curIndex].name === "블로그" &&
        router.pathname.includes("/blog") ? (
          <BlogList list={listData} />
        ) : null}
        {Menus[curIndex].name === "판매" &&
        router.pathname.includes("/blog") ? (
          <SaleList />
        ) : null}
        {Menus[curIndex].name === "블로그" && router.pathname === "/search" ? (
          <SearchBlog />
        ) : null}
        {Menus[curIndex].name === "판매" && router.pathname === "/search" ? (
          <SearchSales />
        ) : null}
        {Menus[curIndex].name === "댓글" ? <MyCommentList /> : null}
        {Menus[curIndex].name === "좋아요" ? <LikeList /> : null}
        {Menus[curIndex].name === "내 정보 관리" ? <MyInfoList /> : null}
        {Menus[curIndex].name === "판매 작품" ? <ProductstList /> : null}
        {Menus[curIndex].name === "구매 작품" ? <PurchaseList /> : null}
        {Menus[curIndex].name === "판매 관리" ? <SalesManagementList /> : null}
        {Menus[curIndex].name === "팔로잉" ? <FollowingList /> : null}
        {Menus[curIndex].name === "팔로워" ? <FollowerList /> : null}
      </TabContent>
    </>
  );
}
