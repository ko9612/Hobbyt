import { useState } from "react";
import tw from "tailwind-styled-components";
import BlogList from "../List/BlogList";
import SaleList from "../List/SaleList";
import MyCommentList from "../List/MyCommentList";
import LikeList from "../List/LikeList";
import ProductstList from "../List/MyList/ProductsList";
import MyInfoList from "../List/MyList/MyInfoList";

interface TabProps {
  Menus: {
    id: number;
    name: string;
    content: string;
  }[];
}

export default function Tab({ Menus }: TabProps) {
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
        {Menus[curIndex].name === "블로그" ? <BlogList /> : null}
        {Menus[curIndex].name === "판매" ? <SaleList /> : null}
        {Menus[curIndex].name === "댓글" ? <MyCommentList /> : null}
        {Menus[curIndex].name === "좋아요" ? <LikeList /> : null}
        {Menus[curIndex].name === "내 정보 관리" ? <MyInfoList /> : null}
        {Menus[curIndex].name === "판매 작품" ? <ProductstList /> : null}
        {Menus[curIndex].name === "구매 작품" ? <ProductstList /> : null}
        {Menus[curIndex].name === "판매 관리" ? <ProductstList /> : null}
      </TabContent>
    </>
  );
}
