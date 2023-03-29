import dynamic from "next/dynamic";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TitleInput from "../../ToastUI/TitleInput";
import DefalutTag from "../../Tag/DefalutTag";
import {
  TitleState,
  ContentState,
  PublicState,
  TagState,
  ThumbnailState,
} from "../../../state/BlogPostState";
import { postBlogContent } from "../../../api/blogApi";
import { UserIdState } from "../../../state/UserState";
import ThumbnailInput from "../../ToastUI/ThumbnailInput";
import SubmitButton from "../../Button/SubmitButton";
import MsgModal from "../../Modal/MsgModal";

const ToastEditor = dynamic(() => import("../../ToastUI/TextEditor"), {
  ssr: false,
});

export default function BlogWriteComponent() {
  const router = useRouter();
  const [titleData, setTitleData] = useRecoilState(TitleState);
  const [contentData, setContentData] = useRecoilState(ContentState);
  const [tagData, setTagData] = useRecoilState(TagState);
  const [publicData, setPublicData] = useRecoilState(PublicState);
  const userId = useRecoilValue(UserIdState);
  const [thumbnailData, setThumnail] = useRecoilState(ThumbnailState);
  // console.log(router);
  // console.log(`router`, router.query.id);
  // console.log(`editData`, editData);

  // 페이지 벗어날 시, 데이터 reset
  const resetData = () => {
    setTitleData("");
    setContentData("");
    setTagData([]);
    setThumnail(null);
    setPublicData(true);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", resetData);
    return () => {
      router.events.off("routeChangeComplete", resetData);
    };
  }, []);

  // 메세지 모달 보이는지, 안 보이는 지 여부
  const [showModal, setShowModal] = useState(false);
  const modalMsg: string[] = [
    "제목을 입력해주세요",
    "제목은 50자를 넘을 수 없습니다",
    "게시글은 300자 이상 작성해야 합니다",
    "태그를 1개 이상 입력해주세요",
    "게시글 등록 완료 :)",
    "게시글 등록 실패",
  ];
  // 모달 메세지 저장
  const [blogMsg, setBlogMsg] = useState(modalMsg[0]);

  // 블로그 게시글 작성 api
  const onSubmitClick = async () => {
    const data = {
      title: titleData,
      content: contentData,
      tags: tagData,
      isPublic: publicData,
      thumbnailImage: thumbnailData,
    };

    // 타이틀 글자수가 0이거나 50자 이상이라면
    if (titleData?.length === 0) {
      setBlogMsg(modalMsg[0]);
      return setShowModal(true);
    }
    if (titleData?.length !== undefined && titleData?.length >= 50) {
      setBlogMsg(modalMsg[1]);
      return setShowModal(true);
    }

    // 본문 글자수가 0이거나 300자 이하라면
    if (contentData?.length === 0 || contentData?.length <= 300) {
      setBlogMsg(modalMsg[2]);
      return setShowModal(true);
    }

    // 태그를 입력하지 않았을 경우
    if (tagData?.length === 0) {
      setBlogMsg(modalMsg[3]);
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
        const submit = await postBlogContent(data);
        // console.log(`blogSubmit`, submit);
        // router.replace(`/blog/${userId}/post/${submit.data}`);
        // resetData();

        if ((submit as any).status === 201) {
          resetData();
          router.replace(`/blog/${userId}/post/${(submit as any).data}`);
        } else {
          setBlogMsg(modalMsg[5]);
          setShowModal(true);
          console.error(`${(submit as any).status}ERROR`);
        }
      } catch (err: unknown) {
        console.error(err);
      }
    }
  };

  return (
    <>
      {showModal && <MsgModal msg={blogMsg} setOpenModal={setShowModal} />}
      <TitleInput />
      <ThumbnailInput />
      <ToastEditor />
      <DefalutTag />
      <SubmitButton id="postSubmitBut" onClick={() => onSubmitClick()}>
        저장
      </SubmitButton>
    </>
  );
}
