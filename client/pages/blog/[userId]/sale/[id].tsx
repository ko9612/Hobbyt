import Header from "../../../../src/components/Page/UserHome/Header";
import UserProfileImage from "../../../../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../../../../src/components/Page/UserHome/UserProfile";
import Followig from "../../../../src/components/Page/UserHome/Following";
import TodayCount from "../../../../src/components/ViewLikeWrite/TodayCount";
import Navbar from "../../../../src/components/Nav/NavBar";
import ProfileButton from "../../../../src/components/Button/ProfileButton";
import Footer from "../../../../src/components/Footer/Footer";
import { Content, UserContent, UserInfo } from "../../../blog";
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
            <UserProfileImage />
            <UserProfile />
            <div className="w-[10rem] m-auto">
              <Followig />
              <ProfileButton />
            </div>
            <TodayCount />
          </UserInfo>
        </UserContent>
      </Content>
      <Footer />
    </>
  );
}
