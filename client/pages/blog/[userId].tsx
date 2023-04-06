import tw from "tailwind-styled-components";
import Header from "../../src/components/Page/UserHome/Header";
import UserProfileImage from "../../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../../src/components/Page/UserHome/UserProfile";
import Tab from "../../src/components/Tab/Tab";
import Navbar from "../../src/components/Nav/NavBar";
import { BlogMenus } from "../../src/components/Tab/TabArr";
import Footer from "../../src/components/Footer/Footer";

export const Content = tw.main`flex sm:justify-center justify-start`;
export const UserInfo = tw.div`sm:hidden md:block lg:block`;
export const BlogContent = tw.main`
  border-4 border-green-500
  max-w-[48rem] lg:ml-[18rem] sm:border-red-500
  sm:max-w-[41rem] lg:max-w-[48rem] md:ml-[2rem]
`;
export const UserContent = tw.aside`
 min-w-[15rem] max-w-[15rem] h-full
 justify-center items-center
 ml-auto
 border border-blue-500
 relative -top-32
 sm:hidden md:block lg:block
`;

// export const Content = tw.main`flex sm:justify-center`;
// export const UserInfo = tw.div``;
// export const BlogContent = tw.main`
//   border-2 border-green-500
//   w-[48rem] lg:ml-[18rem] sm:border-red-500
// `;
// export const UserContent = tw.aside`
//  w-[16rem] h-full
//  justify-center items-center
//  ml-auto
//  border border-blue-500
//  relative -top-32
//  sm:hidden md:block lg:block
// `;
export const BlogTab = tw.div`max-w-[41rem] sm:max-w-[41rem] m-auto`;

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

// export const Content = tw.main`flex sm:justify-center sm:`;
// export const UserInfo = tw.div`sm:hidden md:block lg:block`;
// export const BlogContent = tw.main`
//   border-2 border-green-500
//   w-[48rem] lg:ml-[18rem] sm:border-red-500
// `;
// export const UserContent = tw.aside`
//  w-[16rem] h-full
//  justify-center items-center
//  ml-auto
//  border border-blue-500
//  relative -top-32
// `;
