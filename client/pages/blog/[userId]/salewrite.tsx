import Header from "../../../src/components/Page/UserHome/Header";
import Navbar from "../../../src/components/Nav/NavBar";
import UserProfileImage from "../../../src/components/Page/UserHome/UserProfileImage";
import Footer from "../../../src/components/Footer/Footer";
import UserProfile from "../../../src/components/Page/UserHome/UserProfile";
import SaleWriteContent from "../../../src/components/Page/SaleWrite/SaleWriteContent";
import { Content, BlogContent, UserContent, UserInfo } from "../[userId]";

export default function saleWrite() {
  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <SaleWriteContent />
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
  );
}
