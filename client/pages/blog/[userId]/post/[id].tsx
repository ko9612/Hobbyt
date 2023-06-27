import tw from "tailwind-styled-components";

import Navbar from "../../../../src/components/Nav/NavBar";
import Header from "../../../../src/components/Page/UserHome/Header";
import Footer from "../../../../src/components/Footer/Footer";
import UserProfile from "../../../../src/components/Page/UserHome/UserProfile";
import UserProfileImage from "../../../../src/components/Page/UserHome/UserProfileImage";
import { Content, BlogContent, UserContent, UserInfo } from "../../[userId]";
import BlogPostDetail from "../../../../src/components/Page/BlogWrite/BlogPostDetail";

const BlogDetails = tw.div`md:w-[43rem] m-auto`;

export default function BlogDetail() {
  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <BlogDetails>
            <BlogPostDetail />
          </BlogDetails>
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
