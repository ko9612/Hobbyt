import tw from "tailwind-styled-components";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Navbar from "../src/components/Nav/NavBar";
import Tab from "../src/components/Tab/Tab";
import { SaleMenus } from "../src/components/Tab/TabArr";
import Footer from "../src/components/Footer/Footer";
import { Main } from "./index";
import { LoginState } from "../src/state/UserState";

const MypageContent = tw.div`
border-2 border-green-400 w-[52rem] m-auto
  `;

const MypageTitle = tw.div`
mt-20 mb-2
  `;

export default function Mypage() {
  const router = useRouter();
  const [isLogin, setLogin] = useRecoilState(LoginState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("authorization")) {
        setLogin(true);
      } else {
        setLogin(false);
        alert("로그인이 필요한 페이지입니다");
        router.push("/signin");
      }
    }
  }, []);

  return (
    <div>
      {isLogin && (
        <>
          <Navbar />
          <Main>
            <MypageContent>
              <MypageTitle>
                <h1 className="mb-10 text-3xl font-bold">내 정보</h1>
              </MypageTitle>
              {/* <DynamicComponentMypage Menus={SaleMenus} /> */}
              <Tab Menus={SaleMenus} />
            </MypageContent>
          </Main>
          <Footer />
        </>
      )}
    </div>
  );
}

// w-[62rem] border-2 ml-auto border-red-500
