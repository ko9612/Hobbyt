import tw from "tailwind-styled-components";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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
import { IAxiosBlogDetailDataType } from "../../../type/blogType";
import { LoginState, UserIdState } from "../../../state/UserState";
import LikeHandle from "../../ViewLikeWrite/LikeHandle";
import LikeHover from "../../ViewLikeWrite/LikeHover";
import MsgModal from "../../Modal/MsgModal";
import DelModal from "../../Modal/DelModal";
import BackButton from "../../Button/BackButton";
import ParseDateFC from "../../../util/ParseDateFC";

export const Title = tw.div`text-lg sm:text-xl md:text-2xl font-bold my-4 inline-flex`;
export const Info = tw.div`flex justify-between items-center flex-wrap`;
export const TagList = tw.div`text-sm flex mr-1`;
export const Tag = tw.div`bg-gray-200 rounded-sm py-1 px-2`;
export const VWInfo = tw.div`flex`;
const Main = tw.main`mt-2`;
const Content = tw.main`mb-10 inline-flex break-all`;
const Like = tw.div`w-12 m-auto my-8 text-center cursor-pointer`;

export default function BlogPostDetail() {
  const router = useRouter();
  const pid = Number(router.query.id);
  const uid = Number(router.query.userId);

  const [getNewData, setGetNewData] = useState<IAxiosBlogDetailDataType[]>();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMsgModal, setShowMsgModal] = useState(false);

  const [errMsg, setErrMsg] = useState<string>("");
  // 로그인 여부
  const isLogin = useRecoilValue(LoginState);
  // 유저 아이디
  const userId = useRecoilValue(UserIdState);

  const getData = async () => {
    if (typeof window !== undefined) {
      if (!isLogin) {
        const blogDetail = await getBlogDetailAnons(pid);
        if (blogDetail.status === 200) {
          if (blogDetail.data.writer.id !== uid) {
            setErrMsg("존재하지 않는 게시글입니다.");
            setShowModal(true);
          } else {
            setGetNewData(blogDetail.data);
          }
        } else if (blogDetail.status === 404) {
          setErrMsg("존재하지 않는 게시글입니다.");
          setShowModal(true);
        } else {
          setErrMsg("Server Error");
          setShowModal(true);
        }
      } else {
        const blogDetail = await getBlogDetail(pid);
        if (blogDetail.status === 200) {
          if (blogDetail.data.writer.id !== uid) {
            setErrMsg("존재하지 않는 게시글입니다.");
            setShowModal(true);
          } else {
            setGetNewData(blogDetail.data);
          }
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

  // like api 요청
  const LikeApi = async () => {
    const plusLike = await postLikePlus(pid);
    router.reload();
    return plusLike;
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
  };

  useEffect(() => {
    if (router.isReady) {
      getData();
    }
  }, [router.isReady]);

  console.log("getNewData", getNewData);

  return (
    <div className="BlogPostDetail">
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
      <div id="viewer" className="mt-6">
        <Title>
          <BackButton />
          <div>{getNewData?.title}</div>
        </Title>
        <Info>
          <TagList>
            {getNewData?.tags?.map((tag: any, idx: number) => (
              <Tag key={idx} className="mb-2 mr-2">
                #{tag}
              </Tag>
            ))}
          </TagList>
          <VWInfo>
            <ViewCount>{getNewData?.viewCount}</ViewCount>
            <WriteDate>
              {getNewData?.createdAt && ParseDateFC(getNewData?.createdAt)}
            </WriteDate>
          </VWInfo>
        </Info>
        <Main>
          {getNewData && getNewData?.thumbnailImage === null ? null : (
            <div className="flex justify-center my-8">
              <Image
                src={getNewData?.thumbnailImage}
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
        <div id="Comment">
          <CommentInput />
          <CommentList comments={getNewData?.comments} />
        </div>
      </div>
    </div>
  );
}
