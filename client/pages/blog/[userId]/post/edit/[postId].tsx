import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import Navbar from "../../../../../src/components/Nav/NavBar";
import Header from "../../../../../src/components/Page/UserHome/Header";
import UserProfileImage from "../../../../../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../../../../../src/components/Page/UserHome/UserProfile";
import { Content, BlogContent, UserContent, UserInfo } from "../../../[userId]";
import Footer from "../../../../../src/components/Footer/Footer";
import { EditorContent } from "../../blogwrite";
import BlogEditComponent from "../../../../../src/components/Page/BlogWrite/BlogEditComponent";
import { UserIdState } from "../../../../../src/state/UserState";
import UrlAccessControl from "../../../../../src/util/UrlAccessControl";

export default function BlogEdit() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const uid = Number(router.query.userId);
  const userId = useRecoilValue(UserIdState);

  UrlAccessControl({ router, setIsLogin, uid, userId });

  return (
    <div>
      {isLogin && uid === userId && (
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
                <UserProfileImage wid={250} hei={250} />
                <UserProfile />
              </UserInfo>
            </UserContent>
          </Content>
          <Footer />
        </>
      )}
    </div>
  );
}
