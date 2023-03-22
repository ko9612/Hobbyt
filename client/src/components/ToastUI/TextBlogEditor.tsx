import tw from "tailwind-styled-components";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { ContentState } from "../../state/BlogPostState";
import { postImageUpload } from "../../api/blogApi";
import MsgModal from "../Modal/MsgModal";
import imageErrorHandler from "../../util/ImageErrorHandler";

const Title = tw.div`flex justify-between`;

export default function TextEditor() {
  const editorRef = useRef<Editor>(null);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // atom에 에디터 내용 저장
  const [editContent, setContent] = useRecoilState(ContentState);

  // 글자 수 세기
  const [contentCount, setContentCount] = useState(editContent);
  const onChangeContent = () => {
    const contentValue = editorRef.current?.getInstance().getHTML();
    if (contentValue !== undefined) {
      setContentCount(contentValue);
      setContent(contentValue);
    }
  };

  return (
    <>
      {showMsgModal && <MsgModal msg={errMsg} setOpenModal={setShowMsgModal} />}
      <div className="px-5">
        <Title>
          <p className="mb-5 font-semibold">
            본문 <span className="text-red-500">&#42;</span>
          </p>
          <p className="text-sm text-gray-400">
            현재 글자수 {contentCount && contentCount.length} / 최소 글자수 300
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
          hooks={{
            async addImageBlobHook(blob, callback) {
              const formData = new FormData();
              formData.append("image", blob);
              const data = await postImageUpload(formData);
              if ((data as any).status === 200) {
                const imageURLData = data.data;
                callback(`${imageURLData}`, "");
              } else {
                const inputName = "";
                imageErrorHandler({
                  data,
                  inputName,
                  setErrMsg,
                  setShowMsgModal,
                });
              }
            },
          }}
        />
      </div>
    </>
  );
}
