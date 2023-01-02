import tw from "tailwind-styled-components";

import {
  ModalContainer,
  ModalBackdrop,
  ModalView,
  Content,
  Button,
} from "./MsgModal";

export interface DelModalProps {
  setOpenModal(state: boolean): void;
  msg: string;
  subMsg: string[];
  buttonString: string;
}

export const Msg = tw.div`
font-semibold mb-3
`;

export const SubMsg = tw.div`
w-60 text-sm text-center
`;

export const ButtonDiv = tw.div`
flex
`;

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
          <Content className="flex-col">
            <Msg>{msg}</Msg>
            <SubMsg>
              {subMsg && subMsg.map((el, index) => <div key={index}>{el}</div>)}
            </SubMsg>
          </Content>
          <ButtonDiv>
            <Button
              onClick={handleClose}
              className="bg-slate-200 hover:bg-slate-300"
            >
              취소
            </Button>
            <Button className=" text-white bg-red-500 hover:bg-red-600">
              {buttonString}
            </Button>
          </ButtonDiv>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
