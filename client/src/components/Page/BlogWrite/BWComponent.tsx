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
  const [title] = useRecoilState(TitleState);
  const [content] = useRecoilState(ContentState);

  const onSubmitClick = async () => {
    const data = {
      title,
      content,
      tags: ["#포트폴리오", "#공예"],
    };

    if (title?.length !== 0 && content?.length !== 0) {
      const submit = await postBlogContent(data);
      console.log(`blogSubmit`, submit);
      // console.log(`submit.data`, submit.data);
      // eslint-disable-next-line default-case
      switch (submit.status) {
        case 201:
          console.log("완료");
          break;
        case 404:
          console.error(`${submit.status}error`);
          break;
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
