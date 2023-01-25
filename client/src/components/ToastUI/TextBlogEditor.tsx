import tw from "tailwind-styled-components";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { ContentState } from "../../state/BlogPostState";
// import { postUploadImage } from "../../api/blogApi";

const Title = tw.div`flex justify-between`;

export default function TextEditor() {
  const editorRef = useRef<Editor>(null);

  // atom에 에디터 내용 저장
  const [editContent, setContent] = useRecoilState(ContentState);

  // 글자 수 세기
  const [contentCount, setContentCount] = useState("");
  const onChangeContent = () => {
    const contentValue = editorRef.current?.getInstance().getHTML();
    if (contentValue !== undefined) {
      setContentCount(contentValue);
      setContent(contentValue);
    }
  };

  return (
    <div className="px-5">
      <Title>
        <p className="mb-5 font-semibold">
          본문 <span className="text-red-500">&#42;</span>
        </p>
        <p className="text-sm text-gray-400">
          현재 글자수 {contentCount.length} / 최소 글자수 300
        </p>
      </Title>
      <Editor
        ref={editorRef}
        previewStyle="vertical"
        initialValue={editContent || "내용을 입력하세요"}
        initialEditType="wysiwyg"
        height="550px"
        usageStatistics={false}
        onChange={onChangeContent}
        // hooks={{
        //   async addImageBlobHook(blob, callback) {
        //     const formData = new FormData();
        //     formData.append("file", blob);
        //     const imageURL = await postUploadImage(formData);
        //     console.log(`엥?`, imageURL);

        //     // if(imageURL){
        //     //   if(imageURL.thumnailcheck === 0){

        //     //   }
        //     // }

        //     // const imageUrlData = imageURL.data;
        //     callback(`https://hobbyt.main${imageURL}`, "");
        //   },
        // }}
      />
    </div>
  );
}
