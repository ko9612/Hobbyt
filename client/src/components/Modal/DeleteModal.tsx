import tw from "tailwind-styled-components";
import ModalButton from "../Button/ModalButton";
import { ModalContainer, ModalBackdrop, ModalView, Content } from "./MsgModal";
import { deleteBlogComment } from "../../api/blogApi";

export interface ModalProps {
  setOpenModal(state: boolean): void;
  msg: string;
  children: React.ReactNode;
  id: number;
}

export default function DeleteModal({
  setOpenModal,
  msg,
  children,
  id,
}: ModalProps) {
  const handleClose = () => {
    setOpenModal(false);
  };

  // eslint-disable-next-line consistent-return
  const handleSubmit = async () => {
    setOpenModal(false);

    if (children === "댓글") {
      try {
        const res = await deleteBlogComment(id);
        return console.log(res);
      } catch (err: unknown) {
        return console.log(err);
      }
    }
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={handleClose}>
        <ModalView onClick={e => e.stopPropagation()}>
          <Content>
            <span>{msg}</span>
          </Content>
          <ModalButton id="" onClick={handleSubmit}>
            확인
          </ModalButton>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
