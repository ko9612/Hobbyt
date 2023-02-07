import Image from "next/image";
import { useEffect } from "react";
import { Container, List, Content } from "./FollowingList";
import DefalutImage from "../../image/userDImage.svg";
import FollowButton from "../Button/FollowButton";
import { postFollowing } from "../../api/tabApi";

export default function Following() {
  const dummy = [
    {
      nickName: "팔로워 유저 1",
      description: "자기소개",
      userId: 1,
      profileImage: null,
      isFollowing: false,
    },
    {
      nickName: "팔로워 유저 1",
      description:
        "자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개",
      userId: 2,
      profileImage: null,
      isFollowing: true,
    },
  ];

  // 팔로잉, 팔로워 버튼 클릭시 api 호출 함수
  const postData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.value);

    const res = await postFollowing(id);
    console.log(res.data);
  };

  useEffect(() => {
    // getData();
  }, []);

  return (
    <Container>
      {dummy.map(item => (
        <List key={item.userId}>
          <Image
            src={DefalutImage || item.profileImage}
            width={50}
            height={50}
            alt="유저 이미지"
            className="w-[4rem]"
          />
          <Content className="ml-3">
            <p>{item.nickName}</p>
            <p className="w-[32rem] truncate">{item.description}</p>
          </Content>
          <FollowButton
            id={item.isFollowing === true ? "팔로잉" : "팔로우"}
            onClick={postData}
            value={item.userId}
          >
            {item.isFollowing === true ? "팔로잉" : "팔로우"}
          </FollowButton>
        </List>
      ))}
    </Container>
  );
}
