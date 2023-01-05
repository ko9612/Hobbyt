import tw from "tailwind-styled-components";
import Navbar from "../src/components/Nav/NavBar";
import Tab from "../src/components/Tab/Tab";
import { SaleMenus } from "../src/components/Tab/TabArr";
import Footer from "../src/components/Footer/Footer";

export default function Mypage() {
  const MypageContent = tw.div`
    w-[62rem] border-2 ml-auto border-red-500
    `;

  const MypageTitle = tw.div`
    border-2 border-green-400 w-[52rem] m-auto pt-10
    `;
  // pt 얼마나 해야할까..

  return (
    <>
      <Navbar />
      <MypageContent>
        <MypageTitle>
          <h1 className="mb-10 text-3xl font-bold">내 정보</h1>
          <Tab Menus={SaleMenus} />
        </MypageTitle>
      </MypageContent>
      <Footer />
    </>
  );
}
