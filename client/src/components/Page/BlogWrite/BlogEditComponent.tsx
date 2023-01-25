import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  TitleState,
  ContentState,
  TagState,
  PublicState,
  BlogEditState,
} from "../../../state/BlogPostState";
import { getBlogDetail, patchBlogContent } from "../../../api/blogApi";
import TitleInput from "../../ToastUI/TitleInput";
import DefalutTag from "../../Tag/DefalutTag";
import { DefalutButton } from "../../Button/DefalutButton";

const ToastEditor = dynamic(() => import("../../ToastUI/TextBlogEditor"), {
  ssr: false,
});

export default function BlogEditComponent() {
  const router = useRouter();
  const [titleData, setTitleData] = useRecoilState(TitleState);
  const [contentData, setContentData] = useRecoilState(ContentState);
  const [tagData, setTagData] = useRecoilState(TagState);
  const [publicData, setPublicData] = useRecoilState(PublicState);
  // 블로그 게시글 수정할 데이터 저장 상태
  const setEditData = useSetRecoilState(BlogEditState);
  const qid = Number(router.query.postId);

  // eslint-disable-next-line consistent-return
  const GetData = async () => {
    try {
      const get = await getBlogDetail(qid);
      console.log(`get`, get);
      setEditData(get.data);
      setTitleData(get.data.title);
      setContentData(get.data.content);
      setTagData(get.data.tags);
      setPublicData(get.data.isPublic);
    } catch {
      return console.log("에러!");
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const EditHandler = async () => {
    const data = {
      title: titleData,
      content: contentData,
      isPublic: publicData,
      tags: tagData,
    };

    const EditSubmit = await patchBlogContent(data, qid);
    switch (EditSubmit.status) {
      default:
        setTitleData("");
        setContentData("");
        setTagData([]);
        setPublicData(true);
        router.replace(`/post/${EditSubmit.data}`);
    }
  };

  return (
    <>
      <TitleInput />
      <ToastEditor />
      <DefalutTag />
      <DefalutButton id="postSubmitBut" onClick={() => EditHandler()}>
        저장
      </DefalutButton>
    </>
  );
}
