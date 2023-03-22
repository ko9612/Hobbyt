// 블로그 게시글 상세 페이지 댓글 리스트
import tw from "tailwind-styled-components";
import Image from "next/image";
// import UserProfileImage from "../../Page/UserHome/DefaultProfileImg";
import { IBlogDetailData } from "../../../type/blogType";
import ThreeDotsBox from "../../SelectBox/ThreeDotsBox";

const Container = tw.div`flex my-10 w-full border-2`;
const Content = tw.div`ml-3 w-5/6`;
const User = tw.div`flex`;

export default function CommentList({ detail }: IBlogDetailData) {
  const { comments } = detail || [];

  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  // console.log(`코멘트리스트`, detail?.comments[0].id);
  console.log(`코멘트리스트`, comments);
  // 댓글 순서 거꾸로
  const newComment = comments?.reverse();

  return (
    <div className="border-black border-5">
      {comments &&
        newComment.map((item: any) => (
          <Container key={item.id}>
            <Image
              src={item.profileImage}
              width={50}
              height={50}
              alt="댓글 작성자 프로필 이미지"
            />
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
