import tw from "tailwind-styled-components";
import { BsHeart } from "react-icons/bs";
import ViewCount from "../../ViewLikeWrite/ViewCount";
import WriteDate from "../../ViewLikeWrite/WriteDate";
import { HR } from "../../../../pages/notice";
import CommentList from "../../List/Comment/CommentList";
import CommentInput from "../../List/Comment/CommentInput";
import { IdataProps } from "../../../type/blogType";

const Detail = tw.div`border-2 border-red-400 mt-6`;
const Title = tw.h1`text-2xl font-bold`;
const Info = tw.div`flex justify-between`;
const Tag = tw.div`text-sm flex mr-1`;
const VWInfo = tw.div`flex`;
const Main = tw.main`mt-2`;
const Content = tw.main`mb-10`;
const Like = tw.div`w-12 m-auto my-8 text-center cursor-pointer`;
const Comment = tw.div``;

// export default function BlogPostDetail({ data }: { data: IdataProps }) {
export default function BlogPostDetail({ list }: IdataProps) {
  const { title, viewCount, tag, createdAt, content, likeCount } = list || {};
  console.log(`BLogPostDetail List`, list);
  return (
    <Detail>
      <Title>{title}</Title>
      <Info>
        <Tag>
          {tag?.map((tags: any, idx: number) => (
            <Tag key={idx}>{tags}</Tag>
          ))}
        </Tag>
        <VWInfo>
          <ViewCount>{viewCount}</ViewCount>
          <WriteDate>{createdAt}</WriteDate>
        </VWInfo>
      </Info>
      <Main>
        <Content>{content}</Content>
        <HR />
        <Like>
          <BsHeart size={35} className="m-auto" />
          <p>{likeCount}</p>
        </Like>
      </Main>
      <Comment>
        <CommentInput />
        <CommentList />
      </Comment>
      {/* <div>{data.commentList.userId}</div> */}
    </Detail>
  );
}
