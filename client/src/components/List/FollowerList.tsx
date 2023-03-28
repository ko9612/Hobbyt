import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { Container, List, Content } from "./FollowingList";
import DefalutImage from "../../image/userDImage.svg";
import FollowButton from "../Button/FollowButton";
import { getFollower, getFollowerN, postFollowing } from "../../api/tabApi";
import { LoginState } from "../../state/UserState";

export default function Following() {
  const router = useRouter();
  // 개인홈 주인 id
  const homeId = Number(router.query.userId);
  // 로그인 유무
  const isLogin = useRecoilValue(LoginState);
  // 불러온 팔로워 리스트 저장
  const [data, setData] = useState([]);

  // 팔로잉, 팔로워 버튼 클릭시 api 호출 함수
  const postData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.value);
    const res = await postFollowing(id);
    if ((res as any).status === 200) {
      router.reload();
    }
  };

  // 회원용 팔로워 리스트 불러오는 api 호출 함수
  const getData = async () => {
    const res = await getFollower(homeId);
    setData(res.data);
  };

  // 비회원용 팔로워 리스트 불러오는 api 호출 함수
  const getDataN = async () => {
    const res = await getFollowerN(homeId);
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

  // useEffect(() => {}, []);

  console.log("팔로워 리스트 // 팔로잉 여부", data);

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
