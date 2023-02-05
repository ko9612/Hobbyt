import tw from "tailwind-styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import DefalutImage from "../../image/userDImage.svg";
import { postFollowing } from "../../api/tabApi";
// import { DefalutButton } from "../Button/DefalutButton";
import FollowButton from "../Button/FollowButton";

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
      isFollowing: true,
    },
    {
      nickName: "팔로잉 유저 2",
      description:
        "자기소개 길게 해 보는 중자기소개 길게 해 보는 중자기소개 길게 해 보는 중자기소개 길게 해 보는 중자기소개 길게 해 보는 중자기소개 길게 해 보는 중자기소개 길게 해 보는 중 ",
      userId: 2,
      profileImage: null,
      isFollowing: true,
    },
    {
      nickName: "팔로잉 유저 3",
      description: "자기소개",
      userId: 3,
      profileImage: null,
      isFollowing: true,
    },
    {
      nickName: "팔로잉 유저 4",
      description: "자기소개",
      userId: 4,
      profileImage: null,
      isFollowing: true,
    },
    {
      nickName: "팔로잉 유저 5",
      description: "자기소개",
      userId: 5,
      profileImage: null,
      isFollowing: true,
    },
  ];

  // 불러온 데이터 저장
  const [data, setData] = useState();
  // const getData = async () => {
  //   const res = await
  //   console.log("팔로잉리스트", res);
  //   setData(res.data);
  // };

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
          <FollowButton id="팔로잉" onClick={postData} value={item.userId}>
            {item.isFollowing === true ? "팔로잉" : "팔로우"}
          </FollowButton>
        </List>
      ))}
    </Container>
  );
}
