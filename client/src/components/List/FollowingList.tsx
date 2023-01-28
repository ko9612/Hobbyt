import tw from "tailwind-styled-components";
import Image from "next/image";
import DefalutImage from "../../image/userDImage.svg";

export const Container = tw.ul`mt-6`;
export const List = tw.li`flex mb-3 border-2 border-red-500`;
export const Content = tw.div`border-2 border-blue-400 w-[33rem]`;

export default function FollowingList() {
  const dummy = [
    {
      nickName: "팔로잉 유저 1",
      description: "자기소개",
      userId: 1,
      profileImage: null,
    },
    {
      nickName: "팔로잉 유저 2",
      description:
        "자기소개 길게 해 보는 중자기소개 길게 해 보는 중자기소개 길게 해 보는 중자기소개 길게 해 보는 중자기소개 길게 해 보는 중자기소개 길게 해 보는 중자기소개 길게 해 보는 중 ",
      userId: 2,
      profileImage: null,
    },
    {
      nickName: "팔로잉 유저 3",
      description: "자기소개",
      userId: 3,
      profileImage: null,
    },
    {
      nickName: "팔로잉 유저 4",
      description: "자기소개",
      userId: 4,
      profileImage: null,
    },
    {
      nickName: "팔로잉 유저 5",
      description: "자기소개",
      userId: 5,
      profileImage: null,
    },
  ];

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
          <Content>
            <p>{item.nickName}</p>
            <p>{item.description}</p>
          </Content>
        </List>
      ))}
    </Container>
  );
}
