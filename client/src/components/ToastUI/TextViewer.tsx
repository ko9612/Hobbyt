// 토스트 ui 뷰어 컴포넌트

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

function TextViewer({ initialValue }: any) {
  return (
    <div id="viewer">
      <Viewer initialValue={initialValue || ""} />
    </div>
  );
}

export default TextViewer;
