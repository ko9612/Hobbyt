// 토스트 ui 뷰어 컴포넌트
// 리뷰 디테일 페이지에 데이터 보여줄 때 사용될 예정

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

// import Prism from 'prismjs';
// import "prismjs/themes/prism.css";

// import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

function TextViewer({ initialValue }: any) {
  return (
    <div id="viewer">
      <Viewer initialValue={initialValue} />
    </div>
  );
}

export default TextViewer;
