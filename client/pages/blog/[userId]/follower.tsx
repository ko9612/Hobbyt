import Navbar from "../../../src/components/Nav/NavBar";
import Header from "../../../src/components/Page/UserHome/Header";
import {
  Content,
  BlogContent,
  BlogTab,
  UserContent,
  UserInfo,
} from "../[userId]";
import Tab from "../../../src/components/Tab/Tab";
import UserProfileImage from "../../../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../../../src/components/Page/UserHome/UserProfile";
import Followig from "../../../src/components/Page/UserHome/Following";
// import ProfileButton from "../../../src/components/Button/ProfileButton";
import TodayCount from "../../../src/components/ViewLikeWrite/TodayCount";
import Footer from "../../../src/components/Footer/Footer";
import { FollowingMenus } from "../../../src/components/Tab/TabArr";

export default function Follow() {
  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <BlogTab>
            <Tab Menus={FollowingMenus} />
          </BlogTab>
        </BlogContent>
        <UserContent>
          <UserInfo>
            <UserProfileImage />
            <UserProfile />
            <div className="w-[10rem] m-auto">
              <Followig />
              {/* <ProfileButton /> */}
            </div>
            <TodayCount />
          </UserInfo>
        </UserContent>
      </Content>
      <Footer />
    </>
  );
}
