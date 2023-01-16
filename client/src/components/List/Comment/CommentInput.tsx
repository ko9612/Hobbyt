import tw from "tailwind-styled-components";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import React, { ChangeEvent, useCallback, useState } from "react";
import { postBlogComment } from "../../../api/blogApi";

const Content = tw.div`border-2 border-2 rounded-xl`;
const Textarea = tw.textarea`m-3 resize-none outline-none`;
const Text = tw.p`text-sm text-gray-300`;
const Send = tw.div`flex justify-between pl-3 pr-4 pb-3 items-center cursor-pointer`;

export default function CommentInput() {
  const [comment, setComment] = useState("");

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
      content: comment,
    };

    try {
      const res = await postBlogComment(data);
      console.log(res);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <Content>
      <Textarea rows={3} cols={83} onChange={onChangeCommet} value={comment} />
      <Send>
        <Text>현재 글자수 0/ 최대 글자수 150</Text>
        <button onClick={submitHandler}>
          <HiOutlinePaperAirplane
            size={30}
            color="#d6d6d6"
            className="rotate-90"
          />
        </button>
      </Send>
    </Content>
  );
}
