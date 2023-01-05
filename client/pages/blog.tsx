import tw from "tailwind-styled-components";
import Header from "../src/components/UserHome/Header";
import UserProfileImage from "../src/components/UserHome/UserProfileImage";
import UserProfile from "../src/components/UserHome/UserProfile";
import Followig from "../src/components/UserHome/Following";
import BlogTab from "../src/components/Tab/Tab";
import TodayCount from "../src/components/ViewLikeWrite/TodayCount";
import Navbar from "../src/components/Nav/NavBar";
import ProfileButton from "../src/components/Button/ProfileButton";
import { BlogMenus } from "../src/components/Tab/TabArr";

export const Content = tw.main`flex`;

export const UserInfo = tw.div`
`;

export const BlogContent = tw.main`
  border-2 border-green-500
  w-[48rem] sm:ml-[18rem]
`;

export const UserContent = tw.aside`
 w-[16rem] h-full
 justify-center items-center
 ml-auto
 border border-blue-500
 relative -top-32
`;

function Blog() {
  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <BlogTab Menus={BlogMenus} />
        </BlogContent>
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
    </>
  );
}

export default Blog;

// const UserInfo = tw.div`
// sticky top-32
// `;
