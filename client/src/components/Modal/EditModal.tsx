import React, { useState, useCallback, ChangeEvent } from "react";
import tw from "tailwind-styled-components";
import ModalButton from "../Button/ModalButton";
import { ModalContainer, ModalBackdrop, ModalView, Content } from "./MsgModal";
import { patchBlogComment } from "../../api/blogApi";

export const Msg = tw.div`font-semibold mb-3`;
export const SubMsg = tw.div`w-60 text-sm text-center`;
export const ButtonDiv = tw.div`flex`;

export default function EditModal({
  children,
  id,
  content,
}: {
  id: number;
  children: React.ReactNode;
  content: string;
}) {
  const [, setOpenModal] = useState(true);
  const [newComment, setNewComment] = useState(content);

  // 모달 백그라운드 클릭시 닫히는 함수
  const handleClose = () => {
    setOpenModal(false);
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

    if (children === "블로그") {
      try {
        const res = await patchBlogComment(data, id);
        console.log(res);
      } catch (err: unknown) {
        return console.error(err);
      }
    } else if (children === "댓글") {
      try {
        const res = await patchBlogComment(data, id);
        console.log(res);
      } catch (err: unknown) {
        return console.error(err);
      }
    }

    // if (children === "판매") {
    //   const data = {
    //     content: commentData,
    //   };
    // }
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={handleClose}>
        <ModalView onClick={e => e.stopPropagation()}>
          <Content className="flex-col">
            <p>댓글을 수정해 주세요</p>
            <textarea
              rows={3}
              cols={40}
              onChange={onChangeCommet}
              value={newComment}
              className="p-1 border-2 border-gray-300 rounded-md"
            />
          </Content>
          <ButtonDiv>
            <ModalButton id="" onClick={handleClose}>
              취소
            </ModalButton>
            <ModalButton
              id=""
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
