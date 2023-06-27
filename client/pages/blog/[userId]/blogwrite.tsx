import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import Header from "../../../src/components/Page/UserHome/Header";
import Navbar from "../../../src/components/Nav/NavBar";
import UserProfileImage from "../../../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../../../src/components/Page/UserHome/UserProfile";
import { Content, BlogContent, UserContent, UserInfo } from "../[userId]";
import Footer from "../../../src/components/Footer/Footer";
import BlogWriteComponent from "../../../src/components/Page/BlogWrite/BWComponent";
import UrlAccessControl from "../../../src/util/UrlAccessControl";
import { UserIdState } from "../../../src/state/UserState";

export const EditorContent = tw.div`md:w-[43rem] m-auto`;

export default function BlogWrite() {
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
      )}
    </div>
  );
}
