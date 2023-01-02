import { useState } from "react";
import tw from "tailwind-styled-components";
import Navbar from "../src/components/Nav/NavBar";
import BlogTab from "../src/components/Tab/Tab";

interface SaleMenusType {
  id: number;
  name: string;
  idx: number;
  content: string;
}

export default function Mypage() {
  const MypageContent = tw.div`
    w-[80rem] border ml-auto
    `;

  const MypageTitle = tw.div`
    border-2 border-green-400 w-[64rem] m-auto pt-32
    `;

  const [saleMenus] = useState<SaleMenusType[]>([
    { id: 4, name: "내 정보 관리", idx: 4, content: "Tab 내정보 관리" },
    { id: 5, name: "판매 작품", idx: 5, content: "Tab 판매 작품" },
    { id: 6, name: "구매 작품", idx: 6, content: "Tab 구매 작품" },
    { id: 7, name: "판매 관리", idx: 7, content: "Tab 판매 관리" },
  ]);

  return (
    <>
      <Navbar />
      <MypageContent>
        <MypageTitle>
          <h1 className="text-3xl font-bold border border-red-500">내 정보</h1>
          <BlogTab Menus={saleMenus} />
        </MypageTitle>
      </MypageContent>
    </>
  );
}
