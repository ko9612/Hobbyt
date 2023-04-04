import tw from "tailwind-styled-components";
import { BsArrow90DegRight } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useRecoilValue } from "recoil";
import UserProfileImage from "../../Page/UserHome/UserProfileImage";
import ThreeDotsBox from "../../SelectBox/ThreeDotsBox";
import { CommentType } from "../../../type/blogType";
import { getBlogCommentList } from "../../../api/tabApi";
import ScrollRoader from "../../Scroll/ScrollRoader";
import { UserIdState } from "../../../state/UserState";

const CommentContainer = tw.div`block border-2 m-auto mt-8`;

export default function MyCommentList(): React.ReactElement {
  const router = useRouter();
  const homeId = Number(router.query.userId);
  const userId = useRecoilValue(UserIdState);

  // 불러온 데이터 저장
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  // 무한 스크롤
  const [hasNext, setHasNext] = useState(false);
  const [ref, inview] = useInView({ threshold: 0 });
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 처음 이후: 내가 쓴 댓글 리스트 api 요청
  const moreGetData = async () => {
    const res = await getBlogCommentList(homeId, offset, limit);
    const moreListRes = (res as any).data;
    setCommentList([...commentList, moreListRes]);
    setHasNext(moreListRes.hasNext);
    setOffset(offset + limit);
    setIsLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      // 처음: 내가 쓴 댓글 리스트 api 요청
      const getData = async () => {
        const res = await getBlogCommentList(homeId, 0, limit);
        const listRes = (res as any).data;
        setCommentList([listRes]);
        setOffset(limit);
        setHasNext(listRes.hasNext);
      };
      getData();
    }
  }, [router.isReady, homeId]);

  useEffect(() => {
    if (hasNext && inview) {
      setIsLoading(true);
      setTimeout(async () => {
        moreGetData();
      }, 1000);
    }
  }, [inview]);

  console.log("내가 쓴 댓글 리스트", commentList);

  return (
    <CommentContainer>
      {commentList[0] &&
        commentList.map((item: any, idx: number) => (
          <div key={idx}>
            {item.comments &&
              item.comments.map((el: CommentType) => (
                <div key={el.id}>
                  <div className="flex justify-between">
                    <div className="flex">
                      <BsArrow90DegRight
                        size={26}
                        className="mt-2 ml-10"
                        color="#d6d6d6"
                      />
                      <Link href={`/blog/${el.postWriterId}/post/${el.postId}`}>
                        <button className="ml-3 text-gray-400 truncate w-[35rem] text-start">
                          {el.postTitle}
                        </button>
                      </Link>
                    </div>
                    {el.postWriterId === userId &&
                    router.pathname.includes("/blog") ? (
                      <ThreeDotsBox item={el}>댓글</ThreeDotsBox>
                    ) : null}
                  </div>
                  <div className="flex">
                    <div className="w-[5rem] border-none">
                      <UserProfileImage wid={200} hei={200} />
                    </div>
                    <div className="w-[35rem] ml-3 mt-3">
                      <Link href={`/blog/${el.postWriterId}/post/${el.postId}`}>
                        <button className="truncate w-[35rem] text-start">
                          {el.content}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      <div ref={ref} className="flex justify-center p-8 border-4 border-black">
        {isLoading && <ScrollRoader />}
      </div>
    </CommentContainer>
  );
}
