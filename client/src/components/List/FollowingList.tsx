import tw from "tailwind-styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DefalutImage from "../../image/userDImage.svg";
import { getFollowing, postFollowing } from "../../api/tabApi";
// import { DefalutButton } from "../Button/DefalutButton";
import FollowButton from "../Button/FollowButton";

export const Container = tw.ul`mt-6`;
export const List = tw.li`flex mb-3 border-2 border-red-500`;
export const Content = tw.div`border-2 border-blue-400 w-[33rem]`;

export default function FollowingList() {
  // 불러온 데이터 저장
  const [data, setData] = useState();
  const router = useRouter();
  // 개인홈 주인 id
  const homeUserId = Number(router.query.userId);

  // 팔로잉, 팔로워 버튼 클릭시 api 호출 함수
  const postData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.value);
    const res = await postFollowing(id);
    if ((res as any).status === 200) {
      router.reload();
    }
    console.log("팔로우 버튼 클릭시", res.data);
  };

  // 팔로잉 리스트 불러오는 api 호출 함수
  const getData = async () => {
    const res = await getFollowing(homeUserId);
    console.log("팔로잉리스트", res);
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

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
            <FollowButton
              id={item.isFollowing === true ? "팔로잉" : "팔로우"}
              onClick={postData}
              value={item.id}
            >
              {item.isFollowing === true ? "팔로잉" : "팔로우"}
            </FollowButton>
          </List>
        ))}
    </Container>
  );
}
