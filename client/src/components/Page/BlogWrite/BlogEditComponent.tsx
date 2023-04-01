import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  TitleState,
  ContentState,
  TagState,
  PublicState,
  BlogEditState,
  ThumbnailState,
} from "../../../state/BlogPostState";
import { getBlogDetail, patchBlogContent } from "../../../api/blogApi";
import TitleInput from "../../ToastUI/TitleInput";
import DefalutTag from "../../Tag/DefalutTag";
import { UserIdState } from "../../../state/UserState";
import ThumbnailInput from "../../ToastUI/ThumbnailInput";
import MsgModal from "../../Modal/MsgModal";
import SubmitButton from "../../Button/SubmitButton";

const ToastEditor = dynamic(() => import("../../ToastUI/TextBlogEditor"), {
  ssr: false,
});

export default function BlogEditComponent() {
  const router = useRouter();
  const [titleData, setTitleData] = useRecoilState(TitleState);
  const [contentData, setContentData] = useRecoilState(ContentState);
  const [tagData, setTagData] = useRecoilState(TagState);
  const [publicData, setPublicData] = useRecoilState(PublicState);
  const [thumbnailData, setThumbnail] = useRecoilState(ThumbnailState);
  // 블로그 게시글 수정할 데이터 저장 상태
  const setEditData = useSetRecoilState(BlogEditState);

  const qid = Number(router.query.postId);
  const uid = Number(router.query.userId);

  const userId = useRecoilValue(UserIdState);

  // 메세지 모달 보이는지, 안 보이는 지 여부
  const [showModal, setShowModal] = useState(false);
  const modalMsg: string[] = [
    "제목을 입력해주세요",
    "제목은 50자를 넘을 수 없습니다",
    "게시글은 300자 이상 작성해야 합니다",
    "태그를 1개 이상 입력해주세요",
    "게시글 등록 완료 :)",
    "게시글 등록 실패",
    "존재하지 않는 게시글입니다",
    "Server Error",
  ];
  // 모달 메세지 저장
  const [errMsg, setErrMsg] = useState(modalMsg[0]);

  // eslint-disable-next-line consistent-return
  const GetData = async () => {
    try {
      const get = await getBlogDetail(qid);
      if ((get as any).status === 200) {
        if ((get as any).data.writer.id !== uid && userId !== uid) {
          setErrMsg("접근할 수 없는 게시글입니다.");
          setShowModal(true);
        } else {
          setEditData(get.data);
          setTitleData(get.data.title);
          setContentData(get.data.content);
          setTagData(get.data.tags);
          setPublicData(get.data.isPublic);
        }
      } else {
        if (get.status === 404) {
          setErrMsg(modalMsg[6]);
        } else {
          setErrMsg(modalMsg[7]);
        }
        setShowModal(true);
      }
    } catch {
      return console.log("에러!");
    }
  };

  // 페이지 벗어날 시, 데이터 reset
  const resetData = () => {
    setTitleData("");
    setContentData("");
    setTagData([]);
    setPublicData(true);
    setThumbnail(null);
  };

  useEffect(() => {
    if (router.isReady) {
      GetData();
    }
    router.events.on("routeChangeComplete", resetData);
    return () => {
      router.events.off("routeChangeComplete", resetData);
    };
  }, [router.isReady]);

  const EditHandler = async () => {
    const data = {
      title: titleData,
      content: contentData,
      isPublic: publicData,
      tags: tagData,
      thumbnailImage: thumbnailData,
    };

    // 타이틀 글자수가 0이거나 50자 이상이라면
    if (titleData?.length === 0) {
      setErrMsg(modalMsg[0]);
      return setShowModal(true);
    }
    if (titleData?.length !== undefined && titleData?.length >= 50) {
      setErrMsg(modalMsg[1]);
      return setShowModal(true);
    }

    // 본문 글자수가 0이거나 300자 이하라면
    if (contentData?.length === 0 || contentData?.length <= 300) {
      setErrMsg(modalMsg[2]);
      return setShowModal(true);
    }

    // 태그를 입력하지 않았을 경우
    if (tagData?.length === 0) {
      setErrMsg(modalMsg[3]);
      return setShowModal(true);
    }
    // api 호출
    if (
      titleData?.length !== 0 &&
      titleData?.length !== undefined &&
      titleData?.length <= 50 &&
      contentData?.length !== 0 &&
      contentData?.length !== undefined &&
      contentData?.length >= 300 &&
      tagData?.length !== 0
    ) {
      try {
        const EditSubmit = await patchBlogContent(data, qid);
        switch (EditSubmit.status) {
          case 200:
            resetData();
            router.push(`/blog/${userId}/post/${EditSubmit.data}`);
            break;
          default:
            console.log("에러", EditSubmit.status);
        }
      } catch (err: unknown) {
        console.error(err);
      }
    }
  };

  return (
    <>
      {showModal && <MsgModal msg={errMsg} setOpenModal={setShowModal} />}
      <TitleInput />
      <ThumbnailInput />
      <ToastEditor />
      <DefalutTag />
      <SubmitButton id="postSubmitBut" onClick={() => EditHandler()}>
        저장
      </SubmitButton>
    </>
  );
}
