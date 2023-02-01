// 판매 게시글 수정 페이지
import Header from "../../../src/components/Page/UserHome/Header";
import Navbar from "../../../src/components/Nav/NavBar";
import UserProfileImage from "../../../src/components/Page/UserHome/UserProfileImage";
import Footer from "../../../src/components/Footer/Footer";
import UserProfile from "../../../src/components/Page/UserHome/UserProfile";
import Followig from "../../../src/components/Page/UserHome/Following";
import TodayCount from "../../../src/components/ViewLikeWrite/TodayCount";
import SaleEditContent from "../../../src/components/Page/SaleWrite/SaleEditContent";
import { Content, BlogContent, UserContent, UserInfo } from "../../blog";

export default function saleWrite() {
  return (
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
  );
}
