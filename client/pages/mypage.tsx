import tw from "tailwind-styled-components";
import Navbar from "../src/components/Nav/NavBar";
import BlogTab from "../src/components/Tab/Tab";
import { SaleMenus } from "../src/components/Tab/TabArr";
import Footer from "../src/components/Footer/Footer";

export default function Mypage() {
  const MypageContent = tw.div`
    w-[80rem] border ml-auto
    `;

  const MypageTitle = tw.div`
    border-2 border-green-400 w-[62rem] m-auto pt-10
    `;
  // pt 얼마나 해야할까..

  return (
    <>
      <Navbar />
      <MypageContent>
        <MypageTitle>
          <h1 className="text-3xl font-bold border border-red-500 mb-10">
            내 정보
          </h1>
          <BlogTab Menus={SaleMenus} />
        </MypageTitle>
      </MypageContent>
      <Footer />
    </>
  );
}
