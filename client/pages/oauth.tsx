// 리다이렉트될 화면
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { getOauthInfo } from "../src/api/signApi";
import ScrollRoader from "../src/components/Scroll/ScrollRoader";
import {
  EmailState,
  NicknameState,
  OauthState,
  UserIdState,
} from "../src/state/UserState";

function Oauth() {
  const router = useRouter();

  const setNickname = useSetRecoilState(NicknameState);
  const setUserId = useSetRecoilState(UserIdState);
  const setEmail = useSetRecoilState(EmailState);
  const setOauthLogin = useSetRecoilState(OauthState);

  const accessToken = String(router.query.AccessToken);
  const refreshToken = String(router.query.RefreshToken);
  console.log(router.asPath); //

  const getUserInfo = async () => {
    const userInfo = await getOauthInfo();

    if ((userInfo as any).status === 200) {
      console.log(userInfo);
      setNickname((userInfo as any).data.nickname.slice(0, 6));
      setUserId((userInfo as any).data.memberId);
      setEmail((userInfo as any).data.email);
      setOauthLogin(true);
      router.replace("/");
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (accessToken && refreshToken) {
        localStorage.setItem("authorization", accessToken);
        localStorage.setItem("refresh", refreshToken);
        getUserInfo();
      }
    }
  }, [router.isReady]);

  return (
    <div className="h-full w-full absolute z-50 flex justify-center items-center">
      <ScrollRoader />
    </div>
  );
}

export default Oauth;
