import Image from "next/image";
import {
  ModalContainer,
  ModalBackdrop,
  ModalView,
  Content,
  Button,
} from "./MsgModal";
import { SubMsg, ButtonDiv } from "./DelModal";
// import UserProfileImage from "../UserHome/UserProfileImage";
import userProfile from "../../image/userProfile_ex.jpeg";

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
              {/* <UserProfileImage /> */}
              <Image
                src={userProfile}
                alt="유저 프로필 사진"
                className="rounded-full"
              />
            </div>
            <SubMsg className="flex flex-col">
              <span>
                <span className="font-semibold text-base">닉네임</span> 님을
              </span>
              <span>언팔로우 하시겠습니까?</span>
            </SubMsg>
          </Content>
          <ButtonDiv>
            <Button
              onClick={handleClose}
              className="bg-slate-200 hover:bg-slate-300"
            >
              아니오
            </Button>
            <Button className=" text-white bg-MainColor hover:bg-SubColor">
              예
            </Button>
          </ButtonDiv>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
