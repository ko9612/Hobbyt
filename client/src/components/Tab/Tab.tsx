import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
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
import { UserIdState } from "../../state/UserState";

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

  const onClickMenuHandler = (index: number) => {
    setIndex(index);
  };

  const keyword = router.query.keywords;

  // api 리스트 데이터 저장
  const [listData, setListData] = useState([]);

  // 블로그 게시글 리스트 api 요청
  const getData = async () => {
    // 함수 안에 숫자들은 임의 숫자예요
    // 빨간줄 떠도 잘 돼요,,,
    const res = await getBlogContentList(userID, 0, 5);
    const listRes = res.data;

    setListData(listRes);
    console.log(`listRes`, listRes);
  };

  useEffect(() => {
    getData();
  }, []);

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
          <SearchBlog keyword={keyword} />
        ) : null}
        {Menus[curIndex].name === "판매" && router.pathname === "/search" ? (
          <SearchSales keyword={keyword} />
        ) : null}
        {Menus[curIndex].name === "댓글" ? <MyCommentList /> : null}
        {Menus[curIndex].name === "좋아요" ? <LikeList /> : null}
        {Menus[curIndex].name === "내 정보 관리" ? <MyInfoList /> : null}
        {Menus[curIndex].name === "판매 작품" ? <ProductstList /> : null}
        {Menus[curIndex].name === "구매 작품" ? <PurchaseList /> : null}
        {Menus[curIndex].name === "판매 관리" ? <SalesManagementList /> : null}
      </TabContent>
    </>
  );
}
