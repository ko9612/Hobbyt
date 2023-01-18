import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
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
import TagState from "../../../state/Blog/TagState";

const ToastEditor = dynamic(() => import("../../ToastUI/TextEditor"), {
  ssr: false,
});

export default function BlogWriteComponent() {
  const [titleData] = useRecoilState(TitleState);
  const [contentData] = useRecoilState(ContentState);
  const [tagData] = useRecoilState(TagState);
  const [publicData] = useRecoilState(PublicState);

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
        console.log(`blogSubmit`, submit);
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
