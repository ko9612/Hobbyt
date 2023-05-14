// 내 정보 관리
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../../src/components/Nav/NavBar";
import Tab from "../../src/components/Tab/Tab";
import { SaleMenus } from "../../src/components/Tab/TabArr";
import Footer from "../../src/components/Footer/Footer";
import { Main } from "../index";
import { UserIdState } from "../../src/state/UserState";
import UrlAccessControl from "../../src/util/UrlAccessControl";

const MypageContent = tw.div`max-w-[52rem] m-auto`;

const MypageTitle = tw.div`
mt-8 sm:mt-20 mb-2
  `;

export default function Mypage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const uid = Number(router.query.userId);
  const userId = useRecoilValue(UserIdState);

  UrlAccessControl({ router, setIsLogin, uid, userId });

  return (
    <div>
      {isLogin && uid === userId && (
        <>
          <Navbar />
          <Main>
            <MypageContent>
              <MypageTitle>
                <h1 className="mb-10 text-3xl font-bold">내 정보</h1>
              </MypageTitle>
              <Tab Menus={SaleMenus} />
            </MypageContent>
          </Main>
          <Footer />
        </>
      )}
    </div>
  );
}
