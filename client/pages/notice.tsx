import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../src/components/Nav/NavBar";
import { Main } from "./index";
import NoticeList from "../src/components/List/NoticeList";
import Footer from "../src/components/Footer/Footer";

export const Title = tw.div`w-[52rem] m-auto mt-20 mb-10`;
export const Content = tw.div`w-[52rem] m-auto mt-20`;
export const HR = tw.div`p-0.5 bg-gray-200`;

export default function Notice() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("authorization")) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
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
            <Title>
              <h1 className="text-3xl font-bold">알림</h1>
            </Title>
            <HR />
            <Content>
              <NoticeList />
            </Content>
          </Main>
          <Footer />
        </>
      )}
    </div>
  );
}
