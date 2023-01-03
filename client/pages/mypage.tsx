import tw from "tailwind-styled-components";
import Navbar from "../src/components/Nav/NavBar";
import BlogTab from "../src/components/Tab/Tab";
import { SaleMenus } from "../src/components/Tab/TabArr";

export default function Mypage() {
  const MypageContent = tw.div`
    w-[80rem] border ml-auto
    `;

  const MypageTitle = tw.div`
    border-2 border-green-400 w-[64rem] m-auto pt-32
    `;

  return (
    <>
      <Navbar />
      <MypageContent>
        <MypageTitle>
          <h1 className="text-3xl font-bold border border-red-500">내 정보</h1>
          <BlogTab Menus={SaleMenus} />
        </MypageTitle>
      </MypageContent>
    </>
  );
}
