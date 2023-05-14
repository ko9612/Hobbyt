import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { getBlogLoginProfile, getBlogProfile } from "../../../api/profileApi";
import { LoginState } from "../../../state/UserState";
import {
  HeaderImageState,
  ProfileImageState,
  UserProfileDataState,
} from "../../../state/ProfileState";
import MsgModal from "../../Modal/MsgModal";

export default function Header() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const [headerImg, setHeaderImg] = useRecoilState(HeaderImageState);
  const [, setProfileImg] = useRecoilState(ProfileImageState);
  // 블로그 주인 id
  const router = useRouter();
  const homeUserId = Number(router.query.userId);

  // 로그인 여부
  const [isLogin] = useRecoilState(LoginState);
  // 프로필 정보
  const [userData, setUserData] = useRecoilState(UserProfileDataState);

  useEffect(() => {
    if (router.isReady) {
      // 개인홈 프로필 조회 api 요청 함수
      const request = async () => {
        if (isLogin === true) {
          // 로그인한 유저용 프로필 조회
          // 블로그 주인 userID api 함수로 보내줘야함
          const res = await getBlogLoginProfile(homeUserId);
          if ((res as any).status === 200) {
            setHeaderImg((res as any).data.headerImage);
            setProfileImg((res as any).data.profileImage);
            setUserData((res as any).data);
          } else {
            if ((res as any).status === 404) {
              setErrMsg("존재하지 않는 페이지입니다.");
            } else {
              setErrMsg("Server Error");
            }
            setShowModal(true);
          }
        } else {
          // 비회원용 프로필 조회
          const res = await getBlogProfile(homeUserId);
          if ((res as any).status === 200) {
            setHeaderImg((res as any).data.headerImage);
            setProfileImg((res as any).data.profileImage);
            setUserData((res as any).data);
          } else {
            if ((res as any).status === 404) {
              setErrMsg("존재하지 않는 페이지입니다.");
            } else {
              setErrMsg("Server Error");
            }
            setShowModal(true);
          }
        }
      };
      request();
    }
  }, [router.isReady, homeUserId]);

  const newHeaderImage = `${headerImg}`;

  return (
    <>
      {showModal && <MsgModal msg={errMsg} setOpenModal={setShowModal} />}
      <header>
        <Image
          src={newHeaderImage}
          alt="개인홈 이미지 헤더"
          width={1200}
          height={300}
          className="overflow-hidden h-32 sm:h-80 w-[62rem] ml-auto"
        />
      </header>
    </>
  );
}
