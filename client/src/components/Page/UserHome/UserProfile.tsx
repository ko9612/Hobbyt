import { BsCalendar4 } from "react-icons/bs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Image from "next/image";
import { getBlogProfile } from "../../../api/profileApi";
import { UserIdState } from "../../../state/UserState";
import { ProfileImageState } from "../../../state/ProfileState";
import DefaultImage from "../../../image/saleDImage.svg";

export default function UserProfile() {
  const handle = () => {};
  const [data, setData] = useState([]);
  // 임시상태 - 본인 개인홈

  // 로그인한 사람 아이디 저장한 State
  const userId = useRecoilValue(UserIdState);
  // 불러온 데이터의 유저 프로필 저장
  const setUserProfile = useSetRecoilState(ProfileImageState);
  // api 요청 함수
  // eslint-disable-next-line consistent-return
  const request = async () => {
    try {
      // 블로그 주인 userID api 함수로 보내줘야함
      const res = await getBlogProfile(userId);
      console.log(`프로필 조회 요청 res`, res);
      // const
      setData(res.data);
      // setUserProfile(res.data.profileImage);
    } catch (err: unknown) {
      return console.error(err);
    }
  };

  const getParsedDate = (createdAt: string) =>
    new Date(createdAt).toLocaleDateString("ko-KR");

  useEffect(() => {
    request();
  }, []);

  // const imageSrc = `http://${data.profileImage}`;
  // console.log(imageSrc);

  return (
    <div className="items-center justify-center block m-auto text-center">
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
        <Link href="/blog/following" onClick={handle}>
          <button className="mr-2">팔로잉 {data?.followingCount}</button>
        </Link>
        <Link href="/blog/follower">
          <button>팔로워 {data?.followerCount}</button>
        </Link>
      </div>
    </div>
  );
}
