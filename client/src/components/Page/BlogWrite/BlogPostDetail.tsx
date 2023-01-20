import tw from "tailwind-styled-components";
import { BsHeart } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ViewCount from "../../ViewLikeWrite/ViewCount";
import WriteDate from "../../ViewLikeWrite/WriteDate";
import { HR } from "../../../../pages/notice";
import CommentList from "../../List/Comment/CommentList";
import CommentInput from "../../List/Comment/CommentInput";
import { getBlogDetail } from "../../../api/blogApi";
import { IBlogDetailData } from "../../../type/blogType";

const Detail = tw.div`mt-6`;
const Title = tw.h1`text-2xl font-bold`;
const Info = tw.div`flex justify-between items-center`;
const Tag = tw.div`text-sm flex mr-1 bg-gray-200 rounded-sm py-0.5 px-1`;
const VWInfo = tw.div`flex`;
const Main = tw.main`mt-2`;
const Content = tw.main`mb-10 inline-flex`;
const Like = tw.div`w-12 m-auto my-8 text-center cursor-pointer`;
const Comment = tw.div``;

export default function BlogPostDetail() {
  const router = useRouter();
  const pid = Number(router.query.id);
  const [getNewData, setGetNewData] = useState<IBlogDetailData[]>();

  const getData = async () => {
    const blogDetail = await getBlogDetail(pid);
    setGetNewData(blogDetail.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const TextViewer = dynamic(() => import("../../ToastUI/TextViewer"), {
    ssr: false,
  });

  console.log(`BlogPostDetail`, getNewData);

  const getParsedDate = (data: string) =>
    new Date(data).toLocaleDateString("ko-KR");

  return (
    <Detail id="viewer">
      <Title>{getNewData?.title}</Title>
      <Info>
        <Tag>
          {getNewData?.tags?.map((tag: any, idx: number) => (
            <Tag key={idx}>{tag}</Tag>
          ))}
        </Tag>
        <VWInfo>
          <ViewCount>{getNewData?.viewCount}</ViewCount>
          <WriteDate>
            {getNewData?.createdAt && getParsedDate(getNewData?.createdAt)}
          </WriteDate>
        </VWInfo>
      </Info>
      <Main>
        <Content>
          <TextViewer initialValue={getNewData?.content} />
        </Content>
        <HR />
        <Like>
          <BsHeart size={35} className="m-auto" />
          <p>{getNewData?.likeCount}</p>
        </Like>
      </Main>
      <Comment>
        <CommentInput />
        <CommentList detail={getNewData} />
      </Comment>
      {/* <div>{data.commentList.userId}</div> */}
    </Detail>
  );
}
