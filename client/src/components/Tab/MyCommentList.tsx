import tw from "tailwind-styled-components";
import UserProfileImage from "../UserHome/UserProfileImage";

export default function MyCommentList() {
  const CommentContainer = tw.div`
  flex w-[52rem] border m-auto
  `;
  return (
    <CommentContainer>
      <div className="w-[6rem] border-none">
        <UserProfileImage />
      </div>
      <div className="w-[45rem] ml-3">
        <p className="truncate">
          내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가
          작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가
          작성한 댓글 내용 내가 작성한 댓글 내용 내가 작성한 댓글 내용 내가
          작성한 댓글 내용
        </p>
      </div>
    </CommentContainer>
  );
}
