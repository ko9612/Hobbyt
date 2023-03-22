// 판매 게시글 수정 페이지
import Header from "../../../../../src/components/Page/UserHome/Header";
import Navbar from "../../../../../src/components/Nav/NavBar";
import UserProfileImage from "../../../../../src/components/Page/UserHome/UserProfileImage";
import Footer from "../../../../../src/components/Footer/Footer";
import UserProfile from "../../../../../src/components/Page/UserHome/UserProfile";
import SaleEditContent from "../../../../../src/components/Page/SaleWrite/SaleEditContent";
import { Content, BlogContent, UserContent, UserInfo } from "../../../[userId]";

export default function SaleEdit() {
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
          </UserInfo>
        </UserContent>
      </Content>
      <Footer />
    </>
  );
}
