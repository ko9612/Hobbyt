// 블로그 게시글 수정 페이지
// import { useRecoilState } from "recoil";
// import BlogWrite from "../../blogwrite";
// import { BlogEditState } from "../../../src/state/BlogPostState";
import Navbar from "../../../../../src/components/Nav/NavBar";
import Header from "../../../../../src/components/Page/UserHome/Header";
import UserProfileImage from "../../../../../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../../../../../src/components/Page/UserHome/UserProfile";
import Followig from "../../../../../src/components/Page/UserHome/Following";
import TodayCount from "../../../../../src/components/ViewLikeWrite/TodayCount";
import { Content, BlogContent, UserContent, UserInfo } from "../../../[userId]";
import Footer from "../../../../../src/components/Footer/Footer";
// import BlogWriteComponent from "../../../src/components/Page/BlogWrite/BWComponent";
import { EditorContent } from "../../../blogwrite";
import BlogEditComponent from "../../../../../src/components/Page/BlogWrite/BlogEditComponent";

export default function BlogEdit() {
  return (
    <>
      <Navbar />
      <Header />
      <Content>
        <BlogContent>
          <EditorContent>
            <BlogEditComponent />
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
