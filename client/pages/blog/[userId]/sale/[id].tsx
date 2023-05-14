import Header from "../../../../src/components/Page/UserHome/Header";
import UserProfileImage from "../../../../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../../../../src/components/Page/UserHome/UserProfile";
import Navbar from "../../../../src/components/Nav/NavBar";
import Footer from "../../../../src/components/Footer/Footer";
import { Content, UserContent, UserInfo } from "../../[userId]";
import SaleDetailContent from "../../../../src/components/Page/SaleDetail/SaleDetailContent";

export default function Saledetail() {
  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <SaleDetailContent />
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
