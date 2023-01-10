import { useState } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
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

interface TabProps {
  Menus: {
    id: number;
    name: string;
    content: string;
  }[];
}

export default function Tab({ Menus }: TabProps) {
  const router = useRouter();
  // 어떤 Tab이 선택되어 있는지 확인하기 위한
  const [curIndex, setIndex] = useState(0);

  const TabMenu = tw.ul`
    flex items-center flex-row m-auto
    list-none bg-white
    text-xl
  `;

  const TabContent = tw.div`
  `;

  const onClickMenuHandler = (index: number) => {
    setIndex(index);
  };

  const keyword = router.query.keywords;
  console.log(keyword);

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
          <BlogList />
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
