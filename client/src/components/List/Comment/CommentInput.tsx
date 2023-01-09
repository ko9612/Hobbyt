import tw from "tailwind-styled-components";
import { HiOutlinePaperAirplane } from "react-icons/hi";

export default function CommentInput() {
  const Content = tw.div`
    border-2 border-2 rounded-xl
    `;
  const Textarea = tw.textarea`
    m-3 resize-none outline-none
    `;
  const Text = tw.p`
    text-sm text-gray-300
    `;
  const Send = tw.div`
    flex justify-between pl-3 pr-4 pb-3 items-center cursor-pointer
    `;

  return (
    <Content>
      <Textarea rows={3} cols={83}>
        임시로 둔 댓글 임시로 둔 댓글 임시로 둔 댓글 임시로 둔 댓글 임시로 둔
        댓글 임시로 둔 댓글 임시로 둔 댓글 임시로 둔 댓글 임시로 둔 댓글 임시로
        둔 댓글 임시로 둔 댓글 임시로 둔 댓글 임시로 둔 댓글 임시로 둔 댓글
        임시로 둔 댓글 임시로 둔 댓글 임시로 둔 댓글 임시로 둔 댓글 임시로 둔
        댓글 임시로 둔 댓글
      </Textarea>
      <Send>
        <Text>현재 글자수 0/ 최대 글자수 150</Text>
        <HiOutlinePaperAirplane
          size={30}
          color="#d6d6d6"
          className="rotate-90"
        />
      </Send>
    </Content>
  );
}
