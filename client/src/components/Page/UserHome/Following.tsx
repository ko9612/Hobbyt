import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { postFollowing } from "../../../api/tabApi";
import { LoginState, UserIdState } from "../../../state/UserState";
import DMButton from "../../Button/DMButton";
import FollowButton from "../../Button/FollowButton";
import ProfileButton from "../../Button/ProfileButton";

export default function Followig() {
  const router = useRouter();
  // 개인홈 주인 id
  const homeUserId = Number(router.query.userId);
  // 로그인한 유저 id
  const userId = useRecoilValue(UserIdState);
  // 로그인 여부
  const isLogin = useRecoilValue(LoginState);

  // 팔로우 요청 post api
  const handleClick = async () => {
    const res = await postFollowing(homeUserId);
    console.log("팔로잉 post 요청", res);
  };

  // useEffect(() => {
  //   if(router.isReady){
  //     handleClick();
  //   }
  // },[router.isReady])

  // router.query의 userId와 로그인한 유저의 userId가 같다면 프로필 수정 버튼만 보이기
  // 로그인을 안 한 유저라면 아무 것도 안 뜨고,
  // 로그인은 했지만 개인홈 주인을 팔로잉하지 않았다면 팔로우 버튼이 보이고
  // 로그인 했고, 개인홈 주인을 팔로잉 중이라면 팔로잉 버튼과 디엠 버튼이 보인다.
  // const status = async () => {
  //   if (isLogin) {
  //   }
  // };

  return (
    <div className="flex justify-between">
      {isLogin === true ? (
        <div>
          {homeUserId === userId ? (
            <ProfileButton />
          ) : (
            <div>
              <DMButton />
              <FollowButton onClick={handleClick} id="팔로잉" value={0}>
                팔로잉
              </FollowButton>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
