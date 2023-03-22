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
import { WideB } from "../../Button/SubmitButton";

const ToastEditor = dynamic(() => import("../../ToastUI/TextBlogEditor"), {
  ssr: false,
});

export default function BlogEditComponent() {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const [titleData, setTitleData] = useRecoilState(TitleState);
  const [contentData, setContentData] = useRecoilState(ContentState);
  const [tagData, setTagData] = useRecoilState(TagState);
  const [publicData, setPublicData] = useRecoilState(PublicState);
  const [thumbnailData, setThumbnail] = useRecoilState(ThumbnailState);
  // 블로그 게시글 수정할 데이터 저장 상태
  const setEditData = useSetRecoilState(BlogEditState);
  const qid = Number(router.query.postId);
  const userId = useRecoilValue(UserIdState);

  // eslint-disable-next-line consistent-return
  const GetData = async () => {
    try {
      const get = await getBlogDetail(qid);
      if ((get as any).status === 200) {
        setEditData(get.data);
        setTitleData(get.data.title);
        setContentData(get.data.content);
        setTagData(get.data.tags);
        setPublicData(get.data.isPublic);
      } else if (get.status === 404) {
        setErrMsg("존재하지 않는 게시글입니다.");
        setShowModal(true);
      } else {
        setErrMsg("Server Error");
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

    const EditSubmit = await patchBlogContent(data, qid);
    switch (EditSubmit.status) {
      case 200:
        resetData();
        router.push(`/blog/${userId}/post/${EditSubmit.data}`);
        break;
      default:
        console.log("에러", EditSubmit.status);
    }
  };

  return (
    <>
      {showModal && <MsgModal msg={errMsg} setOpenModal={setShowModal} />}
      <TitleInput />
      <ThumbnailInput />
      <ToastEditor />
      <DefalutTag />
      <WideB
        id="postSubmitBut"
        disabled={
          !(
            titleData &&
            contentData &&
            contentData?.length >= 300 &&
            tagData?.length
          )
        }
        onClick={() => EditHandler()}
      >
        저장
      </WideB>
    </>
  );
}
