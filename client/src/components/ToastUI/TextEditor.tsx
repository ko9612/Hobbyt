/* eslint-disable import/no-extraneous-dependencies */
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef } from "react";

export default function TextEditor() {
  const editorRef = useRef<Editor>(null);
  return (
    <div>
      <p className="mb-5 ml-2 mr-5">본문</p>
      <Editor
        ref={editorRef}
        previewStyle="vertical"
        initialValue=" "
        initialEditType="wysiwyg"
        height="550px"
        usageStatistics={false}
      />
    </div>
  );
}
