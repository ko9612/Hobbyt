import { useState } from "react";
import tw from "tailwind-styled-components";
import BlogList from "./BlogList";

export default function BlogTab() {
  // 어떤 Tab이 선택되어 있는지 확인하기 위한
  const [curIndex, setIndex] = useState(0);

  const TabMenu = tw.ul`
    flex justify-center items-center flex-row
    m-auto
    list-none w-[52rem]
    text-2xl
  `;

  const menuArr = [
    { name: "블로그", idx: 0, content: "Tab menu 블로그" },
    { name: "판매", idx: 1, content: "Tab menu 판매" },
    { name: "댓글", idx: 2, content: "Tab menu 댓글" },
    { name: "좋아요", idx: 3, content: "Tab menu 좋아요" },
  ];

  const onClickMenuHandler = (index: number) => {
    setIndex(index);
  };

  return (
    <>
      <TabMenu>
        {menuArr.map(section => (
          <li
            role="presentation"
            key={section.idx}
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
      <div>
        {/* <p>{menuArr[curIndex].content}</p> */}
        {menuArr[curIndex].idx === 0 ? <BlogList /> : null}
      </div>
    </>
  );
}
