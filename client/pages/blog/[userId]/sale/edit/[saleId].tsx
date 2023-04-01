// 판매 게시글 수정 페이지
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import Header from "../../../../../src/components/Page/UserHome/Header";
import Navbar from "../../../../../src/components/Nav/NavBar";
import UserProfileImage from "../../../../../src/components/Page/UserHome/UserProfileImage";
import Footer from "../../../../../src/components/Footer/Footer";
import UserProfile from "../../../../../src/components/Page/UserHome/UserProfile";
import SaleEditContent from "../../../../../src/components/Page/SaleWrite/SaleEditContent";
import { Content, BlogContent, UserContent, UserInfo } from "../../../[userId]";
import { UserIdState } from "../../../../../src/state/UserState";
import UrlAccessControl from "../../../../../src/util/UrlAccessControl";

export default function SaleEdit() {
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
          <Header />
          <Content>
            <BlogContent>
              <SaleEditContent />
            </BlogContent>
            <UserContent>
              <UserInfo>
                <UserProfileImage wid={250} hei={250} />
                <UserProfile />
              </UserInfo>
            </UserContent>
          </Content>
          <Footer />
        </>
      )}
    </div>
  );
}
