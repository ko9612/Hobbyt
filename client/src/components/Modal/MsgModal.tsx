import tw from "tailwind-styled-components";

export interface ModalProps {
  setOpenModal(state: boolean): void;
  msg: string;
}

export const ModalContainer = tw.div`
   h-full w-full
`;

export const ModalBackdrop = tw.div`
    bg-black/20 backdrop-blur-sm flex justify-center items-center inset-0 absolute z-20
`;

export const ModalView = tw.div`
w-[30rem] rounded-md overflow-hidden z-40 text-xl bg-white mx-4
`;

export const Content = tw.div`
px-4 text-center my-16
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
          <button
            onClick={handleClose}
            className="w-full px-4 py-3 text-white bg-MainColor hover:bg-SubColor"
          >
            확인
          </button>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
