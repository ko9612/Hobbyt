import tw from "tailwind-styled-components";
import { BsArrow90DegRight } from "react-icons/bs";
import UserProfileImage from "../UserHome/UserProfileImage";
import ThreeDotsBox from "../SelectBox/ThreeDotsBox";

export default function MyCommentList() {
  const CommentContainer = tw.div`
  block w-[56rem] border-2 m-auto mt-8
  `;

  return (
    <CommentContainer>
      <div className="flex justify-between">
        <div className="flex">
          <BsArrow90DegRight size={28} className="ml-10" color="#d6d6d6" />
          <p className="ml-3 text-gray-400 truncate w-[46rem]">
            댓글 남겼던 게시글 제목 댓글 남겼던 게시글 제목 댓글 남겼던 게시글
            제목 댓글 남겼던 게시글 제목 댓글 남겼던 게시글 제목 댓글 남겼던
            게시글 제목
          </p>
        </div>
        <ThreeDotsBox>댓글</ThreeDotsBox>
      </div>
      <div className="flex">
        <div className="w-[5rem] border-none">
          <UserProfileImage />
        </div>
        <div className="w-[45rem] ml-3 mt-3">
          <p className="truncate">
            내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용
            내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용
            내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용
            내가 작성한 댓글 내용
          </p>
        </div>
      </div>
    </CommentContainer>
  );
}
