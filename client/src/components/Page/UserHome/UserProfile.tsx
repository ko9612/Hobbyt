import { BsCalendar4 } from "react-icons/bs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBlogProfile } from "../../../api/profileApi";

export default function UserProfile() {
  const handle = () => {};
  const [data, setData] = useState([]);

  // api 요청 함수
  // eslint-disable-next-line consistent-return
  const request = async () => {
    try {
      const res = await getBlogProfile();
      console.log(`프로필 조회 요청 res`, res);
      // const
      setData(res.data);
    } catch (err: unknown) {
      return console.error(err);
    }
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <div className="items-center justify-center block m-auto text-center">
      <h1 className="mb-2 text-3xl font-bold">{data?.nickname}</h1>
      <div className="inline-flex mb-5">
        <BsCalendar4 className="mt-1" />
        <p className="ml-2 text-gray-400">{data?.createdAt}</p>
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
