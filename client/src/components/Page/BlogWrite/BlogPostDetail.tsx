import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import ViewCount from "../../ViewLikeWrite/ViewCount";
import WriteDate from "../../ViewLikeWrite/WriteDate";
import { HR } from "../../../../pages/notice";
import CommentList from "../../List/Comment/CommentList";
import CommentInput from "../../List/Comment/CommentInput";
import { getBlogDetail, postLikePlus } from "../../../api/blogApi";
import { IBlogDetailData } from "../../../type/blogType";
import { LoginState } from "../../../state/UserState";
import LikeHandle from "../../ViewLikeWrite/LikeHandle";
import LikeHover from "../../ViewLikeWrite/LikeHover";

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
  // 로그인 여부
  const isLogin = useRecoilValue(LoginState);
  // hover 여부
  const [isHover, setIsHover] = useState(false);

  // post 디테일 데이터 불러오는 api
  const getData = async () => {
    const blogDetail = await getBlogDetail(pid);
    setGetNewData(blogDetail.data);
  };

  const TextViewer = dynamic(() => import("../../ToastUI/TextViewer"), {
    ssr: false,
  });

  // console.log(`BlogPostDetail`, getNewData);

  const getParsedDate = (data: string) =>
    new Date(data).toLocaleDateString("ko-KR");

  // like api 요청
  const LikeApi = async () => {
    const plusLike = await postLikePlus(pid);
    router.reload();
    console.log(`plusLike`, plusLike);
  };

  // 하트 클릭 함수
  // 로그인이 되지 않은 상태라면 로그인 창으로 이동됨
  const onClickLike = () => {
    if (isLogin === false) {
      router.push("/signin");
    } else {
      LikeApi();
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, [router.isReady]);

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
          <button
            onClick={onClickLike}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <LikeHandle isHover={isHover} />
            <LikeHover />
          </button>
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
