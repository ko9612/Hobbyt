import tw from "tailwind-styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import DefalutImage from "../../image/userDImage.svg";
import { getFollowing, getFollowingN, postFollowing } from "../../api/tabApi";
// import { DefalutButton } from "../Button/DefalutButton";
import FollowButton from "../Button/FollowButton";
import { LoginState } from "../../state/UserState";
import ScrollRoader from "../Scroll/ScrollRoader";

export const Container = tw.ul`mt-6`;
export const List = tw.li`flex mb-3 border-2 border-red-500`;
export const Content = tw.div`border-2 border-blue-400 w-[32rem]`;

export default function FollowingList() {
  // 불러온 데이터 저장
  const [data, setData] = useState([]);
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

  // 무한 스크롤
  const [hasNext, setHasNext] = useState(false);
  const [ref, inview] = useInView({ threshold: 0 });
  const [page, setPage] = useState(1);
  // const limit = 7;
  // const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 처음 : 회원용 팔로잉 리스트 호출 api
  const getData = async () => {
    const res = await getFollowing(homeId, 0);
    const listRes = (res as any).data;
    setData([listRes]);
    setHasNext(listRes.hasNext);
    console.log("회원 팔로잉리스트", res.data);
  };

  // 비회원용 팔로잉 리스트 호출 api
  const getDataN = async () => {
    const res = await getFollowingN(homeId, 0);
    const listRes = (res as any).data;
    setData([listRes]);
    setHasNext(listRes.hasNext);
    // console.log("비회원 팔로잉리스트", res);
  };

  // 처음 이후: 회원용 팔로잉 리스트 호출 api
  const moreGetData = async () => {
    const res = await getFollowing(homeId, page);
    const listRes = (res as any).data;
    setData([...data, listRes]);
    setHasNext(listRes.hasNext);
    setPage(page + 1);
    setIsLoading(false);
  };

  // 처음 이후: 비회원용 팔로잉 리스트 호출 api
  const moreGetDataN = async () => {
    const res = await getFollowing(homeId, page);
    const listRes = (res as any).data;
    setData([...data, listRes]);
    setHasNext(listRes.hasNext);
    setPage(page + 1);
    setIsLoading(false);
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

  useEffect(() => {
    if (hasNext && inview) {
      if (isLogin) {
        setIsLoading(true);
        setTimeout(async () => {
          moreGetData();
        }, 1000);
      } else {
        setIsLoading(true);
        setTimeout(async () => {
          moreGetDataN();
        }, 1000);
      }
    }
  }, [router.isReady, inview]);

  console.log("팔로잉리스트", data);

  return (
    <Container>
      {data[0] &&
        data.map((item: any) => (
          <div key={item.id}>
            {item.contents &&
              item.contents.map((el: any) => (
                <List key={el.id}>
                  <Link href={`/blog/${el.id}`} className="flex">
                    <Image
                      src={el.profileImage || DefalutImage}
                      width={50}
                      height={50}
                      alt="유저 이미지"
                      className="w-[4rem] h-[4rem] rounded-full object-cover"
                    />
                    <Content className="ml-3">
                      <p className="text-xl font-semibold">{el.nickname}</p>
                      <p className="w-[32rem] truncate text-gray-400">
                        {el.description}
                      </p>
                    </Content>
                  </Link>
                  {el.isFollowing === null ? null : (
                    <FollowButton
                      id={el.isFollowing === true ? "팔로잉" : "팔로우"}
                      onClick={postData}
                      value={el.id}
                    >
                      {el.isFollowing === true ? "팔로잉" : "팔로우"}
                    </FollowButton>
                  )}
                </List>
              ))}
          </div>
        ))}
      <div
        ref={ref}
        className="flex justify-center p-8 border-4 border-black mt-52"
      >
        {isLoading && <ScrollRoader />}
      </div>
    </Container>
  );
}
