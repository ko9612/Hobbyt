// 리다이렉트될 화면
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { getBlogProfile } from "../src/api/profileApi";
import { getOauthInfo } from "../src/api/signApi";
import MsgModal from "../src/components/Modal/MsgModal";
import ScrollRoader from "../src/components/Scroll/ScrollRoader";
import {
  EmailState,
  LoginState,
  NicknameState,
  OauthState,
  UserIdState,
  UserProfileState,
} from "../src/state/UserState";

function Oauth() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const setNickname = useSetRecoilState(NicknameState);
  const setUserId = useSetRecoilState(UserIdState);
  const setEmail = useSetRecoilState(EmailState);
  const setLogin = useSetRecoilState(LoginState);
  const setOauthLogin = useSetRecoilState(OauthState);
  const setNavProfileImg = useSetRecoilState(UserProfileState);

  const accessToken = String(router.query.AccessToken);
  const refreshToken = String(router.query.RefreshToken);
  console.log(router.asPath); //

  const getUserInfo = async () => {
    const userInfo = await getOauthInfo();
    if ((userInfo as any).status === 200) {
      const profileData = await getBlogProfile((userInfo as any).data.memberId);

      setNickname((userInfo as any).data.nickname.slice(0, 6));
      setUserId((userInfo as any).data.memberId);
      setEmail((userInfo as any).data.email);
      setOauthLogin(true);
      setLogin(true);
      setNavProfileImg((profileData as any).data.profileImage);
      router.replace("/");
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (accessToken && refreshToken) {
        localStorage.setItem("authorization", accessToken);
        localStorage.setItem("refresh", refreshToken);
        getUserInfo();
      } else if (router.asPath.includes("error")) {
        alert("로그인할 수 없는 계정입니다.");
      }
    }
  }, [router.isReady]);

  return (
    <div className="h-full w-full absolute z-50 flex justify-center items-center">
      {showModal && (
        <MsgModal
          msg="로그인할 수 없는 계정입니다"
          setOpenModal={setShowModal}
        />
      )}
      <ScrollRoader />
    </div>
  );
}

export default Oauth;
