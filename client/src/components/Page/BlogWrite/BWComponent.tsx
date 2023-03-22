import dynamic from "next/dynamic";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
import { WideB } from "../../Button/SubmitButton";

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

  // 블로그 게시글 작성 api
  const onSubmitClick = async () => {
    const data = {
      title: titleData,
      content: contentData,
      tags: tagData,
      isPublic: publicData,
      thumbnailImage: thumbnailData,
    };

    if (titleData?.length !== 0 && contentData?.length !== 0) {
      try {
        const submit = await postBlogContent(data);
        // console.log(`blogSubmit`, submit);
        router.replace(`/blog/${userId}/post/${submit.data}`);
        resetData();
      } catch (err: unknown) {
        console.error(err);
      }
    }
  };

  return (
    <>
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
            tagData?.length &&
            thumbnailData
          )
        }
        onClick={() => onSubmitClick()}
      >
        저장
      </WideB>
    </>
  );
}
