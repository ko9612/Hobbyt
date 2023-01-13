import tw from "tailwind-styled-components";
import UserProfileImage from "../../Page/UserHome/DefaultProfileImg";

export default function CommentList() {
  const Container = tw.div`
  flex my-10 w-full
    `;

  const Content = tw.div`ml-3 w-5/6`;

  const User = tw.div`flex`;

  return (
    <Container>
      <UserProfileImage width={40} height={40} borderW={0} />
      <Content>
        <User>
          <p className="font-semibold">닉네임여섯자</p>
          <p className="ml-2 text-gray-400">2022.12.12</p>
        </User>
        <p>
          댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다.댓글 내용입니다.
          댓글 내용입니다. 댓글 내용입니다.댓글 내용입니다. 댓글 내용입니다.
          댓글 내용입니다.댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다.댓글
          내용입니다. 댓글 내용입니다. 댓글 내용입니다.
        </p>
      </Content>
    </Container>
  );
}
