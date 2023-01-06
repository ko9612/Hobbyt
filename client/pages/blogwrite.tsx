import dynamic from "next/dynamic";
import tw from "tailwind-styled-components";
import Header from "../src/components/UserHome/Header";
import Navbar from "../src/components/Nav/NavBar";
import UserProfileImage from "../src/components/UserHome/UserProfileImage";
import UserProfile from "../src/components/UserHome/UserProfile";
import Followig from "../src/components/UserHome/Following";
import TodayCount from "../src/components/ViewLikeWrite/TodayCount";
import TitleInput from "../src/components/ToastUI/TitleInput";
import DefalutTag from "../src/components/Tag/DefalutTag";
import DefalutButton from "../src/components/Button/DefalutButton";
import { Content, BlogContent, UserContent, UserInfo } from "./blog";
import Footer from "../src/components/Footer/Footer";

export default function BlogWrite() {
  const ToastEditor = dynamic(
    () => import("../src/components/ToastUI/TextEditor"),
    { ssr: false },
  );

  const EditorContent = tw.div`
  w-[43rem] m-auto
  `;

  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <EditorContent>
            <TitleInput />
            <ToastEditor />
            <DefalutTag />
            <DefalutButton onClick={() => {}}>저장</DefalutButton>
          </EditorContent>
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
