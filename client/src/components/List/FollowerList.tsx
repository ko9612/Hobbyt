import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, List, Content } from "./FollowingList";
import DefalutImage from "../../image/userDImage.svg";
import FollowButton from "../Button/FollowButton";
import { getFollower, postFollowing } from "../../api/tabApi";

export default function Following() {
  const router = useRouter();
  // 개인홈 주인 id
  const homeUserId = Number(router.query.userId);
  // 불러온 팔로워 리스트 저장
  const [data, setData] = useState([]);

  // 팔로잉, 팔로워 버튼 클릭시 api 호출 함수
  const postData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.value);
    console.log("id", id);

    const res = await postFollowing(id);
    console.log(res.data);
  };

  // 팔로워 리스트 불러오는 api 호출 함수
  const getData = async () => {
    // 개인홈 주인 아이디
    console.log(`homeUserId`, router);
    const res = await getFollower(homeUserId);
    console.log("팔로워 리스트", res.data);
    setData(res.data);
  };

  useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, [router.isReady]);

  return (
    <Container>
      {data?.contents &&
        data?.contents.map(item => (
          <List key={item.id}>
            <Image
              src={DefalutImage || item.profileImage}
              width={50}
              height={50}
              alt="유저 이미지"
              className="w-[4rem]"
            />
            <Content className="ml-3">
              <p>{item.nickname}</p>
              <p className="w-[32rem] truncate">{item.description}</p>
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
