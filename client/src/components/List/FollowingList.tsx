import tw from "tailwind-styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import DefalutImage from "../../image/userDImage.svg";
import { getFollowing, getFollowingN, postFollowing } from "../../api/tabApi";
// import { DefalutButton } from "../Button/DefalutButton";
import FollowButton from "../Button/FollowButton";
import { LoginState } from "../../state/UserState";

export const Container = tw.ul`mt-6`;
export const List = tw.li`flex mb-3 border-2 border-red-500`;
export const Content = tw.div`border-2 border-blue-400 w-[32rem]`;

export default function FollowingList() {
  // 불러온 데이터 저장
  const [data, setData] = useState();
  const router = useRouter();
  // 개인홈 주인 id
  const homeId = Number(router.query.userId);
  // 로그인 유무
  const isLogin = useRecoilValue(LoginState);

  // 팔로잉, 팔로워 버튼 클릭시 api 호출 함수
  const postData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.value);
    const res = await postFollowing(id);
    if ((res as any).status === 200) {
      router.reload();
    }
    console.log("팔로우 버튼 클릭시", res.data);
  };

  // 회원용 팔로잉 리스트 불러오는 api 호출 함수
  const getData = async () => {
    const res = await getFollowing(homeId);
    console.log("회원 팔로잉리스트", res);
    setData(res.data);
  };

  // 비회원용 팔로잉 리스트 불러오는 api 호출 함수
  const getDataN = async () => {
    const res = await getFollowingN(homeId);
    console.log("비회원 팔로잉리스트", res);
    setData(res.data);
  };

  useEffect(() => {
    if (router.isReady) {
      if (isLogin) {
        getData();
      } else {
        getDataN();
      }
    }
  }, [router.isReady]);

  return (
    <Container>
      {data?.contents &&
        data?.contents.map(item => (
          <List key={item.id}>
            <Image
              src={item.profileImage || DefalutImage}
              width={50}
              height={50}
              alt="유저 이미지"
              className="w-[4rem] h-[4rem] rounded-full object-cover"
            />
            <Content className="ml-3">
              <p className="text-xl font-semibold">{item.nickname}</p>
              <p className="w-[32rem] truncate text-gray-400">
                {item.description}
              </p>
            </Content>
            {item.isFollowing === null ? null : (
              <FollowButton
                id={item.isFollowing === true ? "팔로잉" : "팔로우"}
                onClick={postData}
                value={item.id}
              >
                {item.isFollowing === true ? "팔로잉" : "팔로우"}
              </FollowButton>
            )}
          </List>
        ))}
    </Container>
  );
}
