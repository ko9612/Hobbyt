import tw from "tailwind-styled-components";
import { blogdummyData } from "../dummy/blogdummy";
import Navbar from "../src/components/Nav/NavBar";
import Header from "../src/components/Page/UserHome/Header";
import Footer from "../src/components/Footer/Footer";
import UserProfile from "../src/components/Page/UserHome/UserProfile";
import UserProfileImage from "../src/components/Page/UserHome/UserProfileImage";
import Followig from "../src/components/Page/UserHome/Following";
import TodayCount from "../src/components/ViewLikeWrite/TodayCount";
import { Content, BlogContent, UserContent, UserInfo } from "./blog";
import BlogPostDetail from "../src/components/Page/PostDetail/BlogPostDetail";

export default function BlogDetail() {
  const [data] = blogdummyData; // 나중에 useCallback 사용하기

  const BlogDetails = tw.div`
  w-[43rem] m-auto
  `;

  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <BlogDetails>
            <BlogPostDetail data={data} />
          </BlogDetails>
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
      <Footer />
    </>
  );
}
