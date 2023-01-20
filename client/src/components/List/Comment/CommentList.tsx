// 블로그 게시글 상세 페이지 댓글 리스트
import tw from "tailwind-styled-components";
import UserProfileImage from "../../Page/UserHome/DefaultProfileImg";
import { IBlogDetailData } from "../../../type/blogType";
import ThreeDotsBox from "../../SelectBox/ThreeDotsBox";

const Container = tw.div`flex my-10 w-full border-2`;
const Content = tw.div`ml-3 w-5/6`;
const User = tw.div`flex`;

export default function CommentList({ detail }: IBlogDetailData) {
  const { comments } = detail || [];

  const getParsedDate = (data: string) =>
    new Date(data).toLocaleDateString("ko-KR");

  // console.log(`코멘트리스트`, detail?.comments[0].id);
  // 댓글 순서 거꾸로
  const newComment = comments?.reverse();

  return (
    <div className="border-black border-5">
      {comments &&
        newComment.map((item: any) => (
          <Container key={item.id}>
            <UserProfileImage width={40} height={40} borderW={0} />
            <Content>
              <User>
                <p className="font-semibold">{item.nickname}</p>
                <p className="ml-2 text-gray-400">
                  {item.createdAt && getParsedDate(item.createdAt)}
                </p>
                <div className="ml-auto">
                  {detail.writer.id === item.writerId ? (
                    <ThreeDotsBox item={item}>댓글</ThreeDotsBox>
                  ) : null}
                </div>
              </User>
              <p>{item.content}</p>
            </Content>
          </Container>
        ))}
    </div>
  );
}
