// 주문 상세 내역 조회
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Navbar from "../../../../../src/components/Nav/NavBar";
import Footer from "../../../../../src/components/Footer/Footer";
import { Main, MainContent } from "../../../../index";
import { LoginState, UserIdState } from "../../../../../src/state/UserState";
import OrderDetailContentSeller from "../../../../../src/components/Page/OrderListInfo/OrderDetailContentSeller";

export default function Orderdetail() {
  const router = useRouter();
  const [isLogin, setLogin] = useRecoilState(LoginState);
  const [userId] = useRecoilState(UserIdState);
  const uid = Number(router.query.userId);

  useEffect(() => {
    if (router.isReady) {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("authorization")) {
          setLogin(true);
          if (uid !== userId) {
            alert("유효한 접근이 아닙니다.");
            router.replace("/");
          }
        } else {
          setLogin(false);
          alert("로그인이 필요한 페이지입니다");
          router.replace("/signin");
        }
      }
    }
  }, [router.isReady]);

  return (
    <div>
      {isLogin && uid === userId && (
        <>
          <Navbar />
          <Main>
            <MainContent className="py-10">
              <OrderDetailContentSeller />
            </MainContent>
          </Main>
          <Footer />
        </>
      )}
    </div>
  );
}
