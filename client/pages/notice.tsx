import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Navbar from "../src/components/Nav/NavBar";
import NoticeList from "../src/components/List/NoticeList";
import Footer from "../src/components/Footer/Footer";

export const Container = tw.div``;
export const Main = tw.main`lg:ml-[17rem]`;
export const Title = tw.div`w-full m-auto md:max-w-[50rem] lg:max-w-full`;
const Text = tw.div`m-auto mt-10 mb-4 ml-6 lg:mt-20 lg:ml-32 lg:mb-10`;
export const Content = tw.div`max-w-[52rem] sm:max-w-[40rem] md:max-w-[45rem] m-auto mt-10 lg:mt-16`;
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
          <Container>
            <Navbar />
            <Main>
              <Title>
                <Text>
                  <h1 className="text-3xl font-bold">알림</h1>
                </Text>
                <HR />
              </Title>
              <Content>
                <NoticeList />
              </Content>
            </Main>
          </Container>
          <Footer />
        </>
      )}
    </div>
  );
}
