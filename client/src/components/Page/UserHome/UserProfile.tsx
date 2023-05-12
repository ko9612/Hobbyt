import { BsCalendar4 } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Followig from "./Following";
import TodayCount from "../../ViewLikeWrite/TodayCount";
import { UserProfileDataState } from "../../../state/ProfileState";

export default function UserProfile() {
  const handle = () => {};
  const router = useRouter();
  const homeUserId = Number(router.query.userId);

  const userData = useRecoilValue(UserProfileDataState);
  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  return (
    <div className="items-center justify-center block m-auto text-center">
      <h1 className="mb-2 text-3xl font-bold">{userData.nickname}</h1>
      <div className="inline-flex mb-5">
        <BsCalendar4 className="mt-1" />
        <p className="ml-2 text-gray-400">
          {userData?.createdAt && getParsedDate(userData.createdAt)}
        </p>
      </div>
      <p className="mb-7">{userData.description}</p>
      <div className="inline-flex mb-7">
        <Link href={`/blog/${homeUserId}/following`} onClick={handle}>
          <button className="mr-2">팔로잉 {userData?.followingCount}</button>
        </Link>
        <Link href={`/blog/${homeUserId}/follower`}>
          <button>팔로워 {userData?.followerCount}</button>
        </Link>
      </div>
      <div>
        <Followig isFollowing={userData?.isFollowing} />
      </div>
      <div>
        <TodayCount
          total={userData?.views?.total}
          today={userData?.views?.today}
        />
      </div>
    </div>
  );
}
