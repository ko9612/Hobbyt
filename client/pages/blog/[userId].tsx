import tw from "tailwind-styled-components";
import Header from "../../src/components/Page/UserHome/Header";
import UserProfileImage from "../../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../../src/components/Page/UserHome/UserProfile";
import Tab from "../../src/components/Tab/Tab";
import Navbar from "../../src/components/Nav/NavBar";
import { BlogMenus } from "../../src/components/Tab/TabArr";
import Footer from "../../src/components/Footer/Footer";

export const Content = tw.main`flex mr-auto`;
export const BlogContent = tw.main`
 w-full m-auto sm:w-[35rem] md:w-[42rem] lg:w-[48rem] lg:ml-[17.5rem] max-w-[48rem] px-4 md:px-6`;

export const BlogTab = tw.div`max-w-[41rem] sm:max-w-[41rem] m-auto`;

export const UserContent = tw.aside`min-w-[15rem] max-w-[15rem] h-full justify-center items-center relative -top-32 max-md:hidden`;

export const UserInfo = tw.div`sm:hidden md:block lg:block`;

function Blog() {
  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <BlogTab>
            <Tab Menus={BlogMenus} />
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

export default Blog;
