import tw from "tailwind-styled-components";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { postBlogComment } from "../../../api/blogApi";
import MsgModal from "../../Modal/MsgModal";
import { LoginState } from "../../../state/UserState";

const Content = tw.div`border-2 border-2 rounded-xl`;
const Textarea = tw.textarea`m-3 resize-none outline-none`;
const Text = tw.p`text-sm text-gray-300`;
const Send = tw.div`flex justify-between pl-3 pr-4 pb-3 items-center cursor-pointer`;

export default function CommentInput() {
  const [comment, setComment] = useState("");
  // 포스트 ID
  const router = useRouter();
  const { id } = router.query;

  const isLogin = useRecoilValue(LoginState);

  // 모달 보이는 여부
  const [showModal, setShowModal] = useState(false);
  const [commentMsg, setCommentMsg] = useState("");

  // 댓글 내용 저장 함수
  const onChangeCommet = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const commentData = e.target.value;
      setComment(commentData);
    },
    [setComment],
  );

  // 댓글 전송 api 함수
  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = {
      postId: id,
      content: comment,
    };

    // 로그인 여부
    if (isLogin) {
      // 코멘트가 0자 이하라면
      if (comment.length === 0) {
        setShowModal(true);
        setCommentMsg("댓글을 작성해 주세요 TT");
      }
      // 코멘트가 150자 이상이라면
      if (comment.length >= 150) {
        setShowModal(true);
        setCommentMsg("댓글은 150자까지 작성 가능합니다 TT");
      }

      if (comment.length !== 0 && comment.length < 150) {
        try {
          const res = await postBlogComment(data);
          console.log(res);
          router.reload();
          setComment("");
          setShowModal(false);
          setCommentMsg("");
        } catch (err: unknown) {
          console.error(err);
        }
      }
    } else {
      setShowModal(true);
      setCommentMsg("댓글 작성은 로그인 시 이용 가능합니다.");
    }
  };

  return (
    <>
      {showModal && <MsgModal msg={commentMsg} setOpenModal={setShowModal} />}
      <Content>
        <Textarea
          rows={3}
          cols={83}
          onChange={onChangeCommet}
          value={comment}
          className="w-[41rem]"
        />
        <Send>
          <Text>현재 글자수 {comment.length}/ 최대 글자수 150</Text>
          <button onClick={submitHandler}>
            <HiOutlinePaperAirplane
              size={30}
              color="#d6d6d6"
              className="rotate-90"
            />
          </button>
        </Send>
      </Content>
    </>
  );
}
