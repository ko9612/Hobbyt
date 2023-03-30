import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import ViewCount from "../../ViewLikeWrite/ViewCount";
import WriteDate from "../../ViewLikeWrite/WriteDate";
import { HR } from "../../../../pages/notice";
import CommentList from "../../List/Comment/CommentList";
import CommentInput from "../../List/Comment/CommentInput";
import {
  getBlogDetail,
  getBlogDetailAnons,
  postLikePlus,
} from "../../../api/blogApi";
import { IBlogDetailData } from "../../../type/blogType";
import { LoginState, UserIdState } from "../../../state/UserState";
import LikeHandle from "../../ViewLikeWrite/LikeHandle";
import LikeHover from "../../ViewLikeWrite/LikeHover";
import MsgModal from "../../Modal/MsgModal";
import DelModal from "../../Modal/DelModal";

const Detail = tw.div`mt-6 w-[43rem]`;
export const Title = tw.h1`text-2xl font-bold my-4`;
export const Info = tw.div`flex justify-between items-center`;
export const TagList = tw.div`text-sm flex mr-1`;
export const Tag = tw.div`bg-gray-200 rounded-sm py-1 px-2`;
export const VWInfo = tw.div`flex`;
const Main = tw.main`mt-2`;
const Content = tw.main`mb-10 inline-flex break-all`;
const Like = tw.div`w-12 m-auto my-8 text-center cursor-pointer`;
const Comment = tw.div``;

export default function BlogPostDetail() {
  const router = useRouter();
  const pid = Number(router.query.id);
  const [getNewData, setGetNewData] = useState<IBlogDetailData[]>();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMsgModal, setShowMsgModal] = useState(false);

  const [errMsg, setErrMsg] = useState<string>("");
  // 로그인 여부
  const isLogin = useRecoilValue(LoginState);
  // 유저 아이디
  const userId = useRecoilValue(UserIdState);

  // post 디테일 데이터 불러오는 api

  //  useCallback(()=> {},[])

  // const getData = useCallback(async () => {
  //   const blogDetail = await getBlogDetail(pid);
  //   console.log("블로그 게시글 디테일", blogDetail.data);
  //   if (blogDetail.status === 200) {
  //     setGetNewData(blogDetail.data);
  //   } else if (blogDetail.status === 404) {
  //     setErrMsg("존재하지 않는 게시글입니다.");
  //     setShowModal(true);
  //   } else {
  //     setErrMsg(`${blogDetail.status}`);
  //     setShowModal(true);
  //   }
  // }, [getNewData]);

  const getData = async () => {
    if (typeof window !== undefined) {
      if (!isLogin) {
        const blogDetail = await getBlogDetailAnons(pid);
        console.log("블로그 게시글 디테일", blogDetail.data);
        if (blogDetail.status === 200) {
          setGetNewData(blogDetail.data);
        } else if (blogDetail.status === 404) {
          setErrMsg("존재하지 않는 게시글입니다.");
          setShowModal(true);
        } else {
          setErrMsg("Server Error");
          setShowModal(true);
        }
      } else {
        const blogDetail = await getBlogDetail(pid);
        console.log("블로그 게시글 디테일", blogDetail.data);
        if (blogDetail.status === 200) {
          setGetNewData(blogDetail.data);
        } else if (blogDetail.status === 404) {
          setErrMsg("존재하지 않는 게시글입니다.");
          setShowModal(true);
        } else {
          setErrMsg("Server Error");
          setShowModal(true);
        }
      }
    }
  };

  const TextViewer = dynamic(() => import("../../ToastUI/TextViewer"), {
    ssr: false,
  });

  // console.log(`BlogPostDetail`, getNewData);

  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  // like api 요청
  const LikeApi = async () => {
    const plusLike = await postLikePlus(pid);
    router.reload();
    console.log(`plusLike`, plusLike);
  };

  // 하트 클릭 함수
  // 로그인이 되지 않은 상태라면 로그인 창으로 이동됨
  const onClickLike = () => {
    if (typeof window !== undefined) {
      if (isLogin === false) {
        setShowMsgModal(true);
      } else {
        LikeApi();
      }
    }
    // if (isLogin === false) {
    //   router.push("/signin");
    // } else {
    //   LikeApi();
    // }
  };

  useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, [router.isReady]);

  return (
    <>
      {showModal && <MsgModal msg={errMsg} setOpenModal={setShowModal} />}
      {showMsgModal && (
        <DelModal
          setOpenModal={setShowMsgModal}
          msg="로그인 후 이용 가능합니다."
          subMsg={["로그인 페이지로 이동하시겠습니까?"]}
          buttonString="페이지 이동"
          afterClick={() => {
            router.push("/signin");
          }}
        />
      )}
      <Detail id="viewer">
        <Title>{getNewData?.title}</Title>
        <Info>
          <TagList>
            {getNewData?.tags?.map((tag: any, idx: number) => (
              <Tag key={idx} className="mr-2">
                #{tag}
              </Tag>
            ))}
          </TagList>
          <VWInfo>
            <ViewCount>{getNewData?.viewCount}</ViewCount>
            <WriteDate>
              {getNewData?.createdAt && getParsedDate(getNewData?.createdAt)}
            </WriteDate>
          </VWInfo>
        </Info>
        <Main>
          {getNewData && getNewData?.thumbnailImage === null ? null : (
            <div className="flex justify-center my-8">
              <Image
                src={`/api/images/${getNewData?.thumbnailImage}`}
                width={500}
                height={500}
                alt="썸네일 이미지"
              />
            </div>
          )}
          <Content>
            <TextViewer
              initialValue={getNewData?.content}
              className="break-all"
            />
          </Content>
          <HR />
          <Like>
            <button onClick={onClickLike}>
              {getNewData?.isLiked ? <LikeHandle /> : <LikeHover />}
            </button>
            <p>{getNewData?.likeCount}</p>
          </Like>
          {getNewData && getNewData.writer.id === userId && (
            <div className="mb-6 text-end">
              <button
                className="hover:text-gray-500 focus:text-gray-500"
                onClick={() =>
                  router.push(`/blog/${userId}/post/edit/${getNewData.id}`)
                }
              >
                수정
              </button>
              &nbsp;|&nbsp;
              <button
                className="hover:text-gray-500 focus:text-gray-500"
                onClick={() => setShowModal(true)}
              >
                삭제
              </button>
            </div>
          )}
        </Main>
        <Comment>
          <CommentInput />
          <CommentList comments={getNewData?.comments} />
        </Comment>
      </Detail>
    </>
  );
}
