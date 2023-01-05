import tw from "tailwind-styled-components";
import Navbar from "../src/components/Nav/NavBar";
import Tab from "../src/components/Tab/Tab";
import { SaleMenus } from "../src/components/Tab/TabArr";
import Footer from "../src/components/Footer/Footer";
import { Main } from "./index";

export default function Mypage() {
  const MypageContent = tw.div`
  border-2 border-green-400 w-[52rem] m-auto
    `;

  const MypageTitle = tw.div`
  mt-20 mb-2
    `;

  return (
    <>
      <Navbar />
      <Main>
        <MypageContent>
          <MypageTitle>
            <h1 className="mb-10 text-3xl font-bold">내 정보</h1>
          </MypageTitle>
          <Tab Menus={SaleMenus} />
        </MypageContent>
        <Footer />
      </Main>
    </>
  );
}

// w-[62rem] border-2 ml-auto border-red-500
