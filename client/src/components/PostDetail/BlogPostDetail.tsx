import tw from "tailwind-styled-components";
import { BsHeart } from "react-icons/bs";
import ViewCount from "../ViewLikeWrite/ViewCount";
import WriteDate from "../ViewLikeWrite/WriteDate";
import { HR } from "../../../pages/notice";
import CommentList from "../List/Comment/CommentList";
import CommentInput from "../List/Comment/CommentInput";

export default function BlogPostDetail({ data }: { data: IdataProps }) {
  const Detail = tw.div`border-2 border-red-400 mt-6`;
  const Title = tw.h1`text-2xl font-bold`;
  const Info = tw.div`flex justify-between`;
  const Tag = tw.div`text-sm flex mr-1`;
  const VWInfo = tw.div`flex`;
  const Main = tw.main`
  mt-2
  `;
  const Content = tw.main`
  mb-10
  `;
  const Like = tw.div`
  w-12 m-auto my-8 text-center cursor-pointer
  `;
  const Comment = tw.div``;

  return (
    <Detail>
      <Title>{data.title}</Title>
      <Info>
        <Tag>
          {data.tag.map((tag, idx) => (
            <Tag key={idx}>{tag}</Tag>
          ))}
        </Tag>
        <VWInfo>
          <ViewCount>{data.view}</ViewCount>
          <WriteDate>{data.date}</WriteDate>
        </VWInfo>
      </Info>
      <Main>
        <Content>{data.content}</Content>
        <HR />
        <Like>
          <BsHeart size={35} className="m-auto" />
          <p>{data.like}</p>
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

interface IdataComment {
  userId: string;
  userImage: string;
  date: string;
  comment: string;
}

interface IdataProps {
  title: string;
  userID: string;
  id: string;
  content: string;
  tag: string[];
  view: number;
  like: number;
  date: string;
  commentList: IdataComment[];
}

// interface IdataProps {
//   data: {
//     title: string;
//     userID: string;
//     id: string;
//     content: string;
//     tag: string[];
//     commentList: IdataComment;
//   };
// }
