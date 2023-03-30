import { useRouter } from "next/router";
import tw from "tailwind-styled-components";
import ModalButton from "../Button/ModalButton";

export interface ModalProps {
  setOpenModal(state: boolean): void;
  msg: string;
}

export const ModalBackdrop = tw.div`
bg-black/30 backdrop-blur-sm flex justify-center items-center inset-0 absolute z-30
`;

export const ModalContainer = tw.div`
fixed inset-0 z-40 h-full w-full
`;

export const ModalView = tw.div`
w-[30rem] rounded-md overflow-hidden z-50 text-xl bg-white mx-4 shadow-xl
`;

export const Content = tw.div`
flex items-center justify-center px-4 h-[12rem] z-60
`;

export default function MsgModal({ setOpenModal, msg }: ModalProps) {
  const router = useRouter();
  const handleClose = () => {
    if (
      msg.startsWith("존재하지 않는") ||
      msg.startsWith(`${msg} Error`) ||
      msg.startsWith("로그인할 수 없는")
    ) {
      router.back();
    } else {
      setOpenModal(false);
    }
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
