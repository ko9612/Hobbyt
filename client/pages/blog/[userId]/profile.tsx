import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import Header from "../../../src/components/Page/UserHome/Header";
import UserProfileImage from "../../../src/components/Page/UserHome/UserProfileImage";
import UserProfile from "../../../src/components/Page/UserHome/UserProfile";
import Navbar from "../../../src/components/Nav/NavBar";
import ProfileEdit from "../../../src/components/Page/UserHome/ProfileEdit";
import { Content, BlogContent, UserContent, UserInfo } from "../[userId]";
import UrlAccessControl from "../../../src/util/UrlAccessControl";
import { UserIdState } from "../../../src/state/UserState";

export default function Profile() {
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
              <ProfileEdit />
            </BlogContent>
            <UserContent>
              <UserInfo>
                <UserProfileImage wid={250} hei={250} />
                <UserProfile />
              </UserInfo>
            </UserContent>
          </Content>
        </>
      )}
    </div>
  );
}
