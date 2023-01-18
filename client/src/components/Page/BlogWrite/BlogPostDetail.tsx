import tw from "tailwind-styled-components";
import { BsHeart } from "react-icons/bs";
import dynamic from "next/dynamic";
import ViewCount from "../../ViewLikeWrite/ViewCount";
import WriteDate from "../../ViewLikeWrite/WriteDate";
import { HR } from "../../../../pages/notice";
import CommentList from "../../List/Comment/CommentList";
import CommentInput from "../../List/Comment/CommentInput";
import { IdataProps } from "../../../type/blogType";

const Detail = tw.div`mt-6`;
const Title = tw.h1`text-2xl font-bold`;
const Info = tw.div`flex justify-between items-center`;
const Tag = tw.div`text-sm flex mr-1 bg-gray-200 rounded-sm py-0.5 px-1`;
const VWInfo = tw.div`flex`;
const Main = tw.main`mt-2`;
const Content = tw.main`mb-10 inline-flex`;
const Like = tw.div`w-12 m-auto my-8 text-center cursor-pointer`;
const Comment = tw.div``;

export default function BlogPostDetail({ list }: IdataProps) {
  const TextViewer = dynamic(() => import("../../ToastUI/TextViewer"), {
    ssr: false,
  });
  const { title, viewCount, tags, createdAt, content, likeCount } = list || {};
  console.log(`BLogPostDetail List`, list);
  return (
    <Detail id="viewer">
      <Title>{title}</Title>
      <Info>
        <Tag>
          {tags?.map((tag: any, idx: number) => (
            <Tag key={idx}>{tag}</Tag>
          ))}
        </Tag>
        <VWInfo>
          <ViewCount>{viewCount}</ViewCount>
          <WriteDate>{createdAt}</WriteDate>
        </VWInfo>
      </Info>
      <Main>
        <Content>
          <TextViewer initialValue={content} />
        </Content>
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
