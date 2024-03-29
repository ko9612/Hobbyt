import React, { useState, useCallback, ChangeEvent } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";

import ModalButton from "../Button/ModalButton";
import MsgModal, {
  ModalContainer,
  ModalBackdrop,
  ModalView,
  Content,
} from "./MsgModal";
import { patchBlogComment } from "../../api/blogApi";

export const Msg = tw.div`font-semibold mb-3`;
export const SubMsg = tw.div`w-60 text-sm text-center`;
export const ButtonDiv = tw.div`flex`;

export default function EditModal({
  children,
  id,
  content,
  setEditModal,
}: {
  id: number;
  children: React.ReactNode;
  content: string;
  setEditModal(state: boolean): void;
}) {
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [newComment, setNewComment] = useState(content);
  const router = useRouter();

  // 모달 백그라운드 클릭시 닫히는 함수
  const handleClose = () => {
    setEditModal(false);
  };

  // 새로운 댓글 내용 저장 함수
  const onChangeCommet = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const data = e.target.value;
      setNewComment(data);
    },
    [setNewComment],
  );

  // api 요청 보내는 함수
  // eslint-disable-next-line consistent-return
  const submitEditHandler = async () => {
    const data = {
      content: newComment,
    };

    if (children === "댓글") {
      try {
        const res = await patchBlogComment(data, id);
        if ((res as any).status === 404) {
          setErrMsg("댓글을 수정할 수 없습니다.");
          setShowMsgModal(true);
        } else if ((res as any).status === 500) {
          setErrMsg("서버에러. 관리자에게 문의해주세요.");
          setShowMsgModal(true);
        }
        router.reload();
      } catch (err: unknown) {
        return console.error(err);
      }
    }
  };

  return (
    <ModalContainer>
      {showMsgModal && <MsgModal msg={errMsg} setOpenModal={setShowMsgModal} />}
      <ModalBackdrop onClick={handleClose}>
        <ModalView onClick={e => e.stopPropagation()}>
          <Content className="flex-col">
            <p className="mb-4">댓글을 수정해 주세요</p>
            <textarea
              rows={3}
              cols={40}
              onChange={onChangeCommet}
              value={newComment}
              className="p-1 border-2 border-gray-300 rounded-md"
            />
          </Content>
          <ButtonDiv>
            <ModalButton onClick={handleClose}>취소</ModalButton>
            <ModalButton
              onClick={() => {
                submitEditHandler();
              }}
            >
              확인
            </ModalButton>
          </ButtonDiv>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
