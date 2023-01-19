// import tw from "tailwind-styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../src/components/Nav/NavBar";
import Footer from "../../src/components/Footer/Footer";
import { Main, MainContent } from "../index";
import OrderProgress from "../../src/components/Page/OrderListInfo/OrderProgress";
import SellerInfo from "../../src/components/Page/OrderListInfo/SellerInfo";
import PurchaserInfo from "../../src/components/Page/OrderListInfo/PurChaserInfo";
import DepositInfo from "../../src/components/Page/OrderListInfo/DepositInfo";
import OrderInfo from "../../src/components/Page/OrderListInfo/OrderInfo";

export default function Orderdetail() {
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
            <MainContent className="py-10">
              <OrderProgress />
              <SellerInfo />
              <PurchaserInfo />
              <DepositInfo />
              <OrderInfo />
            </MainContent>
          </Main>
          <Footer />
        </>
      )}
    </div>
  );
}
