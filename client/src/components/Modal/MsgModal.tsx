import tw from "tailwind-styled-components";
import ModalButton from "../Button/ModalButton";

export interface ModalProps {
  setOpenModal(state: boolean): void;
  msg: string;
}

export const ModalContainer = tw.div`
fixed inset-0 z-30 h-full w-full
`;

export const ModalBackdrop = tw.div`
    bg-black/30 backdrop-blur-sm flex justify-center items-center inset-0 absolute z-20
`;

export const ModalView = tw.div`
w-[30rem] rounded-md overflow-hidden z-40 text-xl bg-white mx-4 shadow-xl
`;

export const Content = tw.div`
flex items-center justify-center px-4 h-[12rem]
`;

export default function MsgModal({ setOpenModal, msg }: ModalProps) {
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={handleClose}>
        <ModalView onClick={e => e.stopPropagation()}>
          <Content>
            <span>{msg}</span>
          </Content>
          <ModalButton id="confirmBut" onClick={handleClose}>
            확인
          </ModalButton>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
