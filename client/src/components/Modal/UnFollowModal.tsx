// import Image from "next/image";
// import userProfile from "../../image/userProfile_ex.jpeg";
import { ModalContainer, ModalBackdrop, ModalView, Content } from "./MsgModal";
import { SubMsg, ButtonDiv } from "./DelModal";
import ModalButton from "../Button/ModalButton";
import DefaultProfileImg from "../UserHome/DefaultProfileImg";

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
            <div className="w-14 mb-3">
              <DefaultProfileImg width={60} height={60} borderW={2} />
            </div>
            <SubMsg className="flex flex-col">
              <span>
                <span className="font-semibold text-base">닉네임</span> 님을
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
