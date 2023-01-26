import tw from "tailwind-styled-components";
import { BsArrow90DegRight } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import UserProfileImage from "../../Page/UserHome/UserProfileImage";
import ThreeDotsBox from "../../SelectBox/ThreeDotsBox";
import { CommentType } from "../../../type/blogType";
import { getBlogCommentList } from "../../../api/tabApi";
import { UserIdState } from "../../../state/UserState";

const CommentContainer = tw.div`block border-2 m-auto mt-8`;

export default function MyCommentList(): React.ReactElement {
  const userId = useRecoilValue(UserIdState);
  const router = useRouter();
  // 불러온 데이터 저장
  const [commentList, setCommentList] = useState<CommentType[]>();

  const getData = async () => {
    const res = await getBlogCommentList(userId, 0, 10);
    const data = res.data.comments;
    // console.log(`res`, data);
    switch (res.status) {
      default:
        setCommentList(data);
        break;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // 클릭시 해당 포스트로 이동하는 함수
  const onClickHandler = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  return (
    <CommentContainer>
      {commentList &&
        commentList.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <div className="flex">
                <BsArrow90DegRight
                  size={26}
                  className="mt-2 ml-10"
                  color="#d6d6d6"
                />
                <button
                  className="ml-3 text-gray-400 truncate w-[35rem] text-start"
                  onClick={() => onClickHandler(item.postId)}
                >
                  {item.postTitle}
                </button>
              </div>
              <ThreeDotsBox item={item}>댓글</ThreeDotsBox>
            </div>
            <div className="flex">
              <div className="w-[5rem] border-none">
                <UserProfileImage />
              </div>
              <div className="w-[35rem] ml-3 mt-3">
                <button
                  className="truncate w-[35rem] text-start"
                  onClick={() => onClickHandler(item.postId)}
                >
                  {item.content}
                </button>
              </div>
            </div>
          </div>
        ))}
    </CommentContainer>
  );
}
