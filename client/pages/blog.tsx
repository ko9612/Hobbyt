import tw from "tailwind-styled-components";
import Header from "../src/components/UserHome/Header";
import UserProfileImage from "../src/components/UserHome/UserProfileImage";
import UserProfile from "../src/components/UserHome/UserProfile";
import Followig from "../src/components/UserHome/Following";
import BlogTab from "../src/components/Tab/BlogTab";
import TodayCount from "../src/components/ViewLikeWrite/TodayCount";

export default function Blog() {
  const Content = tw.main`
    flex
  `;

  const UserInfo = tw.aside`
   w-[16rem] h-full
   justify-center items-center
   ml-auto
   border border-red-500
   relative -top-32
  `;

  const BlogContent = tw.main`
    border-2 border-green-500
    w-[59rem] ml-[5rem]
  `;

  return (
    <>
      <Header />
      <Content>
        <BlogContent>
          <BlogTab />
        </BlogContent>
        <UserInfo>
          <UserProfileImage />
          <UserProfile />
          <div className="w-[10rem] m-auto">
            <Followig />
          </div>
          <TodayCount />
        </UserInfo>
      </Content>
    </>
  );
}
