// 사용 안 하고 있는 듯 함 -지은

import { ModalContainer, ModalBackdrop, ModalView, Content } from "./MsgModal";
import { SubMsg, ButtonDiv } from "./DelModal";
import ModalButton from "../Button/ModalButton";
import DefaultProfileImg from "../Page/UserHome/DefaultProfileImg";

export interface FollowModalProps {
  setOpenModal(state: boolean): void;
}

export default function FollowModal({ setOpenModal }: FollowModalProps) {
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={handleClose}>
        <ModalView onClick={e => e.stopPropagation()}>
          <Content className="flex-col">
            <div className="mb-3 w-14">
              <DefaultProfileImg width={60} height={60} borderW={2} />
            </div>
            <SubMsg className="flex flex-col">
              <span>
                <span className="text-base font-semibold">닉네임</span> 님을
              </span>
              <span>언팔로우 하시겠습니까?</span>
            </SubMsg>
          </Content>
          <ButtonDiv>
            <ModalButton onClick={handleClose}>아니오</ModalButton>
            <ModalButton onClick={() => {}}>예</ModalButton>
          </ButtonDiv>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
