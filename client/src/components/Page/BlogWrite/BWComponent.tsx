import dynamic from "next/dynamic";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import TitleInput from "../../ToastUI/TitleInput";
import DefalutTag from "../../Tag/DefalutTag";
import { DefalutButton } from "../../Button/DefalutButton";
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

  // 블로그 게시글 작성 api
  const onSubmitClick = async () => {
    const data = {
      title: titleData,
      content: contentData,
      tags: tagData,
      isPublic: publicData,
      thumbnailImage: thumbnailData,
    };

    console.log("post 요청 data", data);

    if (titleData?.length !== 0 && contentData?.length !== 0) {
      try {
        const submit = await postBlogContent(data);
        // console.log(`blogSubmit`, submit);
        router.replace(`/blog/${userId}/post/${submit.data}`);
        setTitleData("");
        setContentData("");
        setTagData([]);
        setThumnail(null);
        setPublicData(true);
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
      <DefalutButton id="postSubmitBut" onClick={() => onSubmitClick()}>
        저장
      </DefalutButton>
    </>
  );
}
