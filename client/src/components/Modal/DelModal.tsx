import tw from "tailwind-styled-components";
import ModalButton from "../Button/ModalButton";

import { ModalContainer, ModalBackdrop, ModalView, Content } from "./MsgModal";

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
            <ModalButton id="" onClick={handleClose}>
              취소
            </ModalButton>
            <ModalButton id="" onClick={() => {}}>
              {buttonString}
            </ModalButton>
          </ButtonDiv>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
