import Header from "../../../src/components/Page/UserHome/Header";
import UserProfileImage from "../../../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../../../src/components/Page/UserHome/UserProfile";
import Navbar from "../../../src/components/Nav/NavBar";
import ProfileEdit from "../../../src/components/Page/UserHome/ProfileEdit";
import { Content, BlogContent, UserContent, UserInfo } from "../[userId]";

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
          </UserInfo>
        </UserContent>
      </Content>
    </>
  );
}
