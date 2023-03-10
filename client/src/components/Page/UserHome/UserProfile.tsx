import { BsCalendar4 } from "react-icons/bs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
// import Image from "next/image";
import { useRouter } from "next/router";
import { getBlogProfile, getBlogLoginProfile } from "../../../api/profileApi";
import { LoginState, UserIdState } from "../../../state/UserState";
import { ProfileImageState } from "../../../state/ProfileState";
// import DefaultImage from "../../../image/saleDImage.svg";
import Followig from "./Following";
import TodayCount from "../../ViewLikeWrite/TodayCount";

export default function UserProfile() {
  const handle = () => {};
  const [data, setData] = useState([]);

  // 로그인한 사람 아이디 저장한 State
  const userId = useRecoilValue(UserIdState);
  // 불러온 데이터의 유저 프로필 저장
  const setUserProfile = useSetRecoilState(ProfileImageState);
  // 블로그 주인 id
  const router = useRouter();
  const homeUserId = Number(router.query.userId);
  // 로그인 여부
  const isLogin = useRecoilValue(LoginState);

  // 개인홈 프로필 조회 api 요청 함수
  // eslint-disable-next-line consistent-return
  const request = async () => {
    console.log("로그인 여부", isLogin);
    if (isLogin === true) {
      // 로그인한 유저용 프로필 조회
      // 블로그 주인 userID api 함수로 보내줘야함
      const res = await getBlogLoginProfile(homeUserId);
      console.log(`회원용 프로필 조회 요청 res`, res);
      setData(res.data);
      // router.reload();
      // setUserProfile(res.data.profileImage);
    } else {
      // 비회원용 프로필 조회
      const res = await getBlogProfile(homeUserId);
      console.log(`비회원용 프로필 조회 요청 res`, res);
      setData(res.data);
      // router.reload();
      // setUserProfile(res.data.profileImage);
    }
  };

  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  useEffect(() => {
    if (router.isReady) {
      request();
    }
  }, [router.isReady]);

  return (
    <div className="items-center justify-center block m-auto text-center border-2 border-purple-600">
      {/* <Image src={DefaultImage} width={250} height={250} /> */}
      <h1 className="mb-2 text-3xl font-bold">{data?.nickname}</h1>
      <div className="inline-flex mb-5">
        <BsCalendar4 className="mt-1" />
        <p className="ml-2 text-gray-400">
          {data?.createdAt && getParsedDate(data.createdAt)}
        </p>
      </div>
      <p className="mb-7">{data?.description}</p>
      <div className="inline-flex mb-7">
        <Link href={`/blog/${homeUserId}/following`} onClick={handle}>
          <button className="mr-2">팔로잉 {data?.followingCount}</button>
        </Link>
        <Link href={`/blog/${homeUserId}/follower`}>
          <button>팔로워 {data?.followerCount}</button>
        </Link>
      </div>
      <div>
        <Followig isFollowing={data?.isFollowing} />
      </div>
      <div>
        <TodayCount total={data?.views?.total} today={data?.views?.today} />
      </div>
    </div>
  );
}
