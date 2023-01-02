import tw from "tailwind-styled-components";
import Header from "../src/components/UserHome/Header";
import UserProfileImage from "../src/components/UserHome/UserProfileImage";
import UserProfile from "../src/components/UserHome/UserProfile";
import Followig from "../src/components/UserHome/Following";
import BlogTab from "../src/components/Tab/BlogTab";
import TodayCount from "../src/components/ViewLikeWrite/TodayCount";
import Navbar from "../src/components/Nav/NavBar";

export const Content = tw.main`flex`;

export const UserContent = tw.aside`
 w-[16rem] h-full
 justify-center items-center
 ml-auto
 border border-blue-500
 relative -top-32
`;
export const UserInfo = tw.div`
`;

export const BlogContent = tw.main`
  border-2 border-green-500
  w-[59rem] sm:ml-[15rem]
`;

function Blog() {
  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <BlogTab />
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

export default Blog;

// const UserInfo = tw.div`
// sticky top-32
// `;
