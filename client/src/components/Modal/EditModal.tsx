import React, { useState, useCallback, ChangeEvent } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
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
  setEditModal,
}: {
  id: number;
  children: React.ReactNode;
  content: string;
  setEditModal(state: boolean): void;
}) {
  const router = useRouter();
  const [newComment, setNewComment] = useState(content);

  console.log(`에딧모달`, id);
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

    if (children === "블로그") {
      try {
        const res = await patchBlogComment(data, id);
        console.log(`블로그 수정 요청`, res);
        // 보고 있던 게시글로 보내게끔 해야하는데,,, 리로드 되면 데이터 다 날라가는 것부터 해결하고 해야할 듯
        // router.replace("/");
      } catch (err: unknown) {
        return console.error(err);
      }
    } else if (children === "댓글") {
      try {
        const res = await patchBlogComment(data, id);
        console.log(`댓글 수정 요청`, res);
        // router.replace("/");
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
