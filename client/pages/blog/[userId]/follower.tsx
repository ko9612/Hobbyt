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
            <UserProfileImage wid={250} hei={250} />
            <UserProfile />
          </UserInfo>
        </UserContent>
      </Content>
      <Footer />
    </>
  );
}
