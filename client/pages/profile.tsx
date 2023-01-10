import Header from "../src/components/Page/UserHome/Header";
import UserProfileImage from "../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../src/components/Page/UserHome/UserProfile";
import Followig from "../src/components/Page/UserHome/Following";
import TodayCount from "../src/components/ViewLikeWrite/TodayCount";
import Navbar from "../src/components/Nav/NavBar";
import ProfileEdit from "../src/components/Page/UserHome/ProfileEdit";
import { Content, BlogContent, UserContent, UserInfo } from "./blog";

export default function Profile() {
  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <ProfileEdit />
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
    </>
  );
}
