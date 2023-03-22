// 이미지 에러 처리

interface ImageErrorData {
  data: any;
  inputName: string;
  setErrMsg(state: string): void;
  setShowMsgModal(state: boolean): void;
}

export default function imageErrorHandler({
  data,
  inputName,
  setErrMsg,
  setShowMsgModal,
}: ImageErrorData) {
  if ((data as any).status === 400) {
    if ((data as any).data === "NOT_IMAGE_FILE_UPLOADED") {
      setErrMsg("이미지 파일을 업로드 해주세요.");
    } else {
      setErrMsg("파일을 업로드해주세요.");
    }
  } else if ((data as any).status === 500) {
    if ((data as any).data === "FAILED_TO_UPLOAD_FILE") {
      setErrMsg("파일 업로드에 실패했습니다.");
    } else {
      setErrMsg("파일 다운로드에 실패했습니다.");
    }
  } else {
    setErrMsg("파일을 찾을 수 없습니다.");
  }
  if (inputName) {
    (document.getElementById(`${inputName}`) as HTMLInputElement).value = "";
  }
  setShowMsgModal(true);
}
