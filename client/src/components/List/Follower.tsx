import Image from "next/image";
import { Container, List, Content } from "./FollowingList";
import DefalutImage from "../../image/userDImage.svg";

export default function Following() {
  const dummy = [
    {
      nickName: "팔로잉 유저 1",
      description: "자기소개",
      userId: 1,
      profileImage: null,
    },
    {
      nickName: "팔로잉 유저 1",
      description: "자기소개",
      userId: 1,
      profileImage: null,
    },
  ];
  return (
    <Container>
      {dummy.map(item => (
        <List key={item.id}>
          <Image
            src={DefalutImage || item.profileImage}
            width={50}
            height={50}
            alt="유저 이미지"
            className="w-[4rem]"
          />
          <Content>
            <p>{item.nickName}</p>
            <p>{item.description}</p>
          </Content>
        </List>
      ))}
    </Container>
  );
}
