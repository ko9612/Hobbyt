// import tw from "tailwind-styled-components";
import { ModalContainer, ModalBackdrop, ModalView, Content } from "./MsgModal";

export interface DelModalProps {
  setOpenModal(state: boolean): void;
  msg: string;
  subMsg: string;
  buttonString: string;
}

export default function DelModal({
  setOpenModal,
  msg,
  subMsg,
  buttonString,
}: DelModalProps) {
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={handleClose}>
        <ModalView onClick={e => e.stopPropagation()}>
          <Content className="flex flex-col items-center">
            <span className="font-semibold">{msg}</span>
            <span className="w-[10rem] text-sm">{subMsg}</span>
          </Content>
          <button
            onClick={handleClose}
            className="w-full px-4 py-3 text-white bg-MainColor hover:bg-SubColor"
          >
            확인
          </button>
          <button>{buttonString}</button>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
