import dynamic from "next/dynamic";
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

export default function BlogWrite() {
  const ToastEditor = dynamic(
    () => import("../src/components/ToastUI/TextEditor"),
    { ssr: false },
  );

  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <TitleInput />
          <ToastEditor />
          <DefalutTag />
          <DefalutButton onClick={() => {}}>저장</DefalutButton>
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
