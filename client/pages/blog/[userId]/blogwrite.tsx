import tw from "tailwind-styled-components";
import Header from "../../../src/components/Page/UserHome/Header";
import Navbar from "../../../src/components/Nav/NavBar";
import UserProfileImage from "../../../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../../../src/components/Page/UserHome/UserProfile";
import { Content, BlogContent, UserContent, UserInfo } from "../[userId]";
import Footer from "../../../src/components/Footer/Footer";
import BlogWriteComponent from "../../../src/components/Page/BlogWrite/BWComponent";

export const EditorContent = tw.div`w-[43rem] m-auto`;

export default function BlogWrite() {
  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <EditorContent>
            <BlogWriteComponent />
          </EditorContent>
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
