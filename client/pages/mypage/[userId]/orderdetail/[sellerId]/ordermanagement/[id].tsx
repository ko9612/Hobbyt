// 주문 상세 내역 조회
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Navbar from "../../../../../../src/components/Nav/NavBar";
import Footer from "../../../../../../src/components/Footer/Footer";
import { Main, MainContent } from "../../../../../index";
import { LoginState, UserIdState } from "../../../../../../src/state/UserState";
import OrderDetailContent from "../../../../../../src/components/Page/OrderListInfo/OrderDetailContent";

export default function Orderdetail() {
  const router = useRouter();
  const [isLogin, setLogin] = useRecoilState(LoginState);
  const [userId] = useRecoilState(UserIdState);
  const uid = Number(router.query.userId);
  const sid = Number(router.query.sellerId);

  useEffect(() => {
    if (router.isReady) {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("authorization")) {
          setLogin(true);
          if (uid !== userId || sid !== userId) {
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
              <OrderDetailContent />
            </MainContent>
          </Main>
          <Footer />
        </>
      )}
    </div>
  );
}
