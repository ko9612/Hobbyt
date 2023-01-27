import { BsCalendar4 } from "react-icons/bs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBlogProfile } from "../../../api/profileApi";

export default function UserProfile() {
  const handle = () => {};
  const [data, setData] = useState([]);
  // 임시상태 - 본인 개인홈

  // api 요청 함수
  // eslint-disable-next-line consistent-return
  const request = async () => {
    try {
      // 블로그 주인 userID api 함수로 보내줘야함
      const res = await getBlogProfile();
      console.log(`프로필 조회 요청 res`, res);
      // const
      setData(res.data);
    } catch (err: unknown) {
      return console.error(err);
    }
  };

  const getParsedDate = (createdAt: string) =>
    new Date(createdAt).toLocaleDateString("ko-KR");

  useEffect(() => {
    request();
  }, []);

  return (
    <div className="items-center justify-center block m-auto text-center">
      <h1 className="mb-2 text-3xl font-bold">{data?.nickname}</h1>
      <div className="inline-flex mb-5">
        <BsCalendar4 className="mt-1" />
        <p className="ml-2 text-gray-400">
          {data?.createdAt && getParsedDate(data.createdAt)}
        </p>
      </div>
      <p className="mb-7">{data?.description}</p>
      <div className="inline-flex mb-7">
        <Link href="/blog" onClick={handle}>
          <button className="mr-2">{data?.followingCount}</button>
          <button>{data?.followerCount}</button>
        </Link>
      </div>
    </div>
  );
}
