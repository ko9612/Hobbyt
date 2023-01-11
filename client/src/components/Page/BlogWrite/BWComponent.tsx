import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import TitleInput from "../../ToastUI/TitleInput";
import DefalutTag from "../../Tag/DefalutTag";
import DefalutButton from "../../Button/DefalutButton";
import TitleState from "../../../state/Blog/TitleState";
import ContentState from "../../../state/Blog/ContentState";
import { postBlogContent } from "../../../api/blogApi";

const ToastEditor = dynamic(() => import("../../ToastUI/TextEditor"), {
  ssr: false,
});

export default function BlogWriteComponent() {
  const [titleData] = useRecoilState(TitleState);
  const [contentData] = useRecoilState(ContentState);

  const onSubmitClick = async () => {
    const data = {
      title: titleData,
      content: contentData,
      tags: ["포트폴리오", "공예"],
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
      <DefalutButton onClick={() => onSubmitClick()}>저장</DefalutButton>
    </>
  );
}
