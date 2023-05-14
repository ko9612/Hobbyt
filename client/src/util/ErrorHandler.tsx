interface ErrorData {
  data: any;
  setErrMsg(state: string): void;
  setShowMsgModal(state: boolean): void;
}

interface ImageErrorData extends ErrorData {
  inputName: string;
}

// 이미지 에러 처리
export function imageErrorHandler({
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
    } else if ((data as any).data === "FAILED_TO_DOWNLOAD_FILE") {
      setErrMsg("파일 다운로드에 실패했습니다.");
    } else {
      setErrMsg("서버에러. 관리자에게 문의해주세요.");
    }
  } else {
    setErrMsg("파일을 찾을 수 없습니다.");
  }
  if (inputName) {
    (document.getElementById(`${inputName}`) as HTMLInputElement).value = "";
  }
  setShowMsgModal(true);
}

// 주문 정보 에러 처리
export function orderErrorHandler({
  data,
  setErrMsg,
  setShowMsgModal,
}: ErrorData) {
  if ((data as any).status === 404) {
    setErrMsg("주문정보를 찾을 수 없습니다.");
  } else if ((data as any).status === 409) {
    if ((data as any).data === "ORDER_CANCEL_NOT_PERMITTED") {
      setErrMsg("주문취소가 실패했습니다.");
    } else {
      setErrMsg("환불처리가 실패했습니다.");
    }
  } else if ((data as any).status === 500) {
    setErrMsg("서버에러. 관리자에게 문의해주세요.");
  }
  setShowMsgModal(true);
}
