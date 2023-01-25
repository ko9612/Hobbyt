import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import TitleInput from "../../ToastUI/TitleInput";
import DefalutTag from "../../Tag/DefalutTag";
import { DefalutButton } from "../../Button/DefalutButton";
import {
  TitleState,
  ContentState,
  PublicState,
  TagState,
} from "../../../state/BlogPostState";
import { postBlogContent } from "../../../api/blogApi";

const ToastEditor = dynamic(() => import("../../ToastUI/TextEditor"), {
  ssr: false,
});

export default function BlogWriteComponent() {
  const router = useRouter();
  const [titleData, setTitleData] = useRecoilState(TitleState);
  const [contentData, setContentData] = useRecoilState(ContentState);
  const [tagData, setTagData] = useRecoilState(TagState);
  const [publicData, setPublicData] = useRecoilState(PublicState);
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
    };

    if (titleData?.length !== 0 && contentData?.length !== 0) {
      try {
        const submit = await postBlogContent(data);
        // console.log(`blogSubmit`, submit);
        router.replace(`/post/${submit.data}`);
        setTitleData("");
        setContentData("");
        setTagData([]);
        setPublicData(true);
      } catch (err: unknown) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <TitleInput />
      <ToastEditor />
      <DefalutTag />
      <DefalutButton id="postSubmitBut" onClick={() => onSubmitClick()}>
        저장
      </DefalutButton>
    </>
  );
}
