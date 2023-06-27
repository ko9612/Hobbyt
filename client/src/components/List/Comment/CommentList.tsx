// 블로그 게시글 상세 페이지 댓글 리스트
import tw from "tailwind-styled-components";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { IBlogDetailData } from "../../../type/blogType";
import ThreeDotsBox from "../../SelectBox/ThreeDotsBox";
import { UserIdState } from "../../../state/UserState";
import ParseDateFC from "../../../util/ParseDateFC";

const Container = tw.div`flex my-5 w-full border-b-2 pb-2`;
const Content = tw.div`ml-3 w-[38.5rem]`;
const User = tw.div`flex`;

export default function CommentList({ comments }: IBlogDetailData) {
  const userId = useRecoilValue(UserIdState);
  const router = useRouter();

  // 댓글 순서 거꾸로
  const newComment = comments?.reverse();

  const handleClike = (id: number) => {
    router.push(`/blog/${id}`);
  };

  return (
    <div className="mt-10">
      {comments &&
        newComment.map((item: any) => (
          <Container key={item.id}>
            <Image
              src={item.profileImage}
              width={50}
              height={50}
              alt="댓글 작성자 프로필 이미지"
              className="object-cover rounded-full w-[3rem] h-[3rem] cursor-pointer"
              onClick={() => handleClike(item.writerId)}
            />
            <Content>
              <User>
                <button
                  className="font-semibold"
                  onClick={() => handleClike(item.writerId)}
                >
                  {item.nickname}
                </button>
                <p className="ml-2 text-gray-400">
                  {item.createdAt && ParseDateFC(item.createdAt)}
                </p>
                <div className="ml-auto">
                  {userId === item.writerId ? (
                    <ThreeDotsBox item={item}>댓글</ThreeDotsBox>
                  ) : null}
                </div>
              </User>
              <p className="break-all">{item.content}</p>
            </Content>
          </Container>
        ))}
    </div>
  );
}
