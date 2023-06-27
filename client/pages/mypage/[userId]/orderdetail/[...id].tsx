// 주문 상세 내역 조회
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useState } from "react";

import Navbar from "../../../../src/components/Nav/NavBar";
import Footer from "../../../../src/components/Footer/Footer";
import { Main, MainContent } from "../../../index";
import { UserIdState } from "../../../../src/state/UserState";
import OrderDetailContent from "../../../../src/components/Page/OrderListInfo/OrderDetailContent";
import UrlAccessControl from "../../../../src/util/UrlAccessControl";

export default function Orderdetail() {
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
