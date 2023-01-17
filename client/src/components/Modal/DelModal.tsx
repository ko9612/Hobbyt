import tw from "tailwind-styled-components";
import { useCallback } from "react";
import ModalButton from "../Button/ModalButton";

import { ModalContainer, ModalBackdrop, ModalView, Content } from "./MsgModal";

export interface DelModalProps {
  setOpenModal(state: boolean): void;
  msg: string;
  subMsg: string[];
  buttonString: string;
  afterClick(): void;
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
  afterClick,
}: DelModalProps) {
  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

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
            <ModalButton id="noBut" onClick={handleClose}>
              취소
            </ModalButton>
            <ModalButton id="yesBut" onClick={afterClick}>
              {buttonString}
            </ModalButton>
          </ButtonDiv>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
