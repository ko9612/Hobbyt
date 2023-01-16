import tw from "tailwind-styled-components";
import { BsArrow90DegRight } from "react-icons/bs";
import React from "react";
import UserProfileImage from "../../Page/UserHome/UserProfileImage";
import ThreeDotsBox from "../../SelectBox/ThreeDotsBox";
import { CommentType } from "../../../type/blogType";

const CommentContainer = tw.div`block border-2 m-auto mt-8`;

export default function MyCommentList(): React.ReactElement {
  const commentList: CommentType[] = [
    {
      title: "댓글 남겼던 게시글 제목",
      id: 1,
      content:
        "내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용",
    },
    {
      title: "댓글 남겼던 게시글 제목2",
      id: 2,
      content:
        "내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용",
    },
  ];

  return (
    <CommentContainer>
      {commentList.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between">
            <div className="flex">
              <BsArrow90DegRight size={28} className="ml-10" color="#d6d6d6" />
              <p className="ml-3 text-gray-400 truncate w-[35rem]">
                {item.title}
              </p>
            </div>
            <ThreeDotsBox item={item}>댓글</ThreeDotsBox>
          </div>
          <div className="flex">
            <div className="w-[5rem] border-none">
              <UserProfileImage />
            </div>
            <div className="w-[35rem] ml-3 mt-3">
              <p className="truncate">{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </CommentContainer>
  );
}
