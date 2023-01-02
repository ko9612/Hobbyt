import { useState } from "react";
import tw from "tailwind-styled-components";
import BlogList from "../List/BlogList";
import SaleList from "../List/SaleList";
import MyCommentList from "../List/MyCommentList";
import LikeList from "../List/LikeList";
import ProductstList from "../List/ProductsList";
// import { TabType } from "./TabArr";

// type TabProps = {
//   Menus: TabType;
// };

export default function Tab({ Menus }) {
  // 어떤 Tab이 선택되어 있는지 확인하기 위한
  const [curIndex, setIndex] = useState(0);

  const TabMenu = tw.ul`
    flex justify-center items-center flex-row
    w-[62rem] m-auto
    list-none bg-white
    text-2xl
  `;

  const TabContent = tw.div`
  `;

  const onClickMenuHandler = (index: number) => {
    setIndex(index);
  };

  console.log(`Menus`, Menus);

  return (
    <>
      <TabMenu>
        {Menus.map(section => (
          <li
            role="presentation"
            key={section.id}
            className={
              curIndex === section.idx
                ? "tab-submenu tab-focused"
                : "tab-submenu"
            }
            onClick={() => onClickMenuHandler(section.idx)}
          >
            {section.name}
          </li>
        ))}
      </TabMenu>
      <TabContent>
        {/* <p>{menuArr[curIndex].content}</p> */}
        {Menus[curIndex].id === 0 ? <BlogList /> : null}
        {Menus[curIndex].id === 1 ? <SaleList /> : null}
        {Menus[curIndex].id === 2 ? <MyCommentList /> : null}
        {Menus[curIndex].id === 3 ? <LikeList /> : null}
        {Menus[curIndex].id === 4 ? <ProductstList /> : null}
        {Menus[curIndex].id === 5 ? <ProductstList /> : null}
        {Menus[curIndex].id === 6 ? <ProductstList /> : null}
        {Menus[curIndex].id === 7 ? <ProductstList /> : null}
      </TabContent>
    </>
  );
}

// const menuArr = [
//   { name: "블로그", idx: 0, content: "Tab menu 블로그" },
//   { name: "판매", idx: 1, content: "Tab menu 판매" },
//   { name: "댓글", idx: 2, content: "Tab menu 댓글" },
//   { name: "좋아요", idx: 3, content: "Tab menu 좋아요" },
// ];
