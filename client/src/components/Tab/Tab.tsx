import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";
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
import { getBlogContentList, getBlogContentListF } from "../../api/tabApi";
import { UserIdState } from "../../state/UserState";
import { BlogSelectState } from "../../state/BlogPostState";
import FollowingList from "../List/FollowingList";
import Follower from "../List/Follower";

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
  // 로그인할 때 저장한 유저 아이디
  const userID = useRecoilValue(UserIdState);
  // 최신순, 인기순 클릭 저장하고 있는 state
  //  기본적으로 최신순으로 되어 있음
  const [select, setSelect] = useRecoilState(BlogSelectState);

  // 탭 클릭 함수
  const onClickMenuHandler = (index: number) => {
    setIndex(index);
  };

  // api 리스트 데이터 저장
  const [listData, setListData] = useState([]);

  // 블로그 게시글 리스트 api 요청
  const getData = async () => {
    if (select === "최신순") {
      const res = await getBlogContentList(userID, 0, 5);
      const listRes = res.data;
      setListData(listRes);
      console.log(`listRes`, listRes);
    } else if (select === "인기순") {
      const res = await getBlogContentListF(userID, 0, 5);
      const listRes = res.data;
      setListData(listRes);
    }
  };

  // useEffect(() => {
  //   if (router.isReady) {
  //     getData();
  //   }
  // }, [router.isReady]);

  useEffect(() => {
    if (Menus[curIndex].name === "블로그" && router.pathname === "/blog") {
      getData();
    }
  }, [select, curIndex]);

  // curIndex 바뀌면 select값 최신순으로 초기화
  useEffect(() => {
    setSelect("최신순");
  }, [curIndex]);

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
        {Menus[curIndex].name === "블로그" && router.pathname === "/blog" ? (
          <BlogList list={listData} />
        ) : null}
        {Menus[curIndex].name === "판매" && router.pathname === "/blog" ? (
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
        {Menus[curIndex].name === "팔로우" ? <Follower /> : null}
      </TabContent>
    </>
  );
}
