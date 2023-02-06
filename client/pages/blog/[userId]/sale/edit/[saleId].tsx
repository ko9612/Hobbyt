// 판매 게시글 수정 페이지
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Header from "../../../../../src/components/Page/UserHome/Header";
import Navbar from "../../../../../src/components/Nav/NavBar";
import UserProfileImage from "../../../../../src/components/Page/UserHome/UserProfileImage";
import Footer from "../../../../../src/components/Footer/Footer";
import UserProfile from "../../../../../src/components/Page/UserHome/UserProfile";
import Followig from "../../../../../src/components/Page/UserHome/Following";
import TodayCount from "../../../../../src/components/ViewLikeWrite/TodayCount";
import SaleEditContent from "../../../../../src/components/Page/SaleWrite/SaleEditContent";
import { Content, BlogContent, UserContent, UserInfo } from "../../../../blog";
import { LoginState, UserIdState } from "../../../../../src/state/UserState";

export default function SaleEdit() {
  const router = useRouter();
  const isLogin = useRecoilValue(LoginState);
  const uid = Number(router.query.userId);
  const userId = useRecoilValue(UserIdState);

  useEffect(() => {
    if (router.isReady) {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("authorization")) {
          if (uid !== userId) {
            alert("유효한 접근이 아닙니다.");
            router.replace("/");
          }
        } else {
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
          <Header />
          <Content>
            <BlogContent>
              <SaleEditContent />
            </BlogContent>
            <UserContent>
              <UserInfo>
                <UserProfileImage />
                <UserProfile />
                <div className="w-[10rem] m-auto">
                  <Followig />
                </div>
                <TodayCount />
              </UserInfo>
            </UserContent>
          </Content>
          <Footer />
        </>
      )}
    </div>
  );
}
