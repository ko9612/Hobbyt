import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { postFollowing } from "../../../api/tabApi";
import { LoginState, UserIdState } from "../../../state/UserState";
import DMButton from "../../Button/DMButton";
import FollowButton from "../../Button/FollowButton";
import ProfileButton from "../../Button/ProfileButton";

interface FollowingType {
  isFollowing: null | boolean;
}

export default function Followig({ isFollowing }: FollowingType) {
  const router = useRouter();
  // 개인홈 주인 id
  const homeId = Number(router.query.userId);
  // 로그인한 유저 id
  const userId = useRecoilValue(UserIdState);
  // 로그인 여부
  const isLogin = useRecoilValue(LoginState);

  console.log("isFollowing", isFollowing);

  // 팔로우 요청 post api
  const handleClick = async () => {
    try {
      const res = await postFollowing(homeId);
      console.log("팔로잉 post 요청", res);
      router.reload();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      {isLogin === true ? (
        <div>
          {homeId === userId ? (
            <div className="inline-flex items-center border-2 border-red-500">
              <Link href={`/blog/${userId}/profile`}>
                <ProfileButton />
              </Link>
            </div>
          ) : (
            <div className="inline-flex items-center justify-between border-2 border-blue-500">
              <div className="mr-4">
                <DMButton>블로그</DMButton>
              </div>
              {isFollowing === null ? null : (
                <FollowButton
                  onClick={handleClick}
                  id={isFollowing !== true ? "팔로우" : "팔로잉"}
                  value={0}
                >
                  {isFollowing !== true ? "팔로우" : "팔로잉"}
                </FollowButton>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
