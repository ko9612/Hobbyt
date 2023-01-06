import {
  PostWriteContent,
  PostWriteList,
  PostWriteLabel,
  PostTextArea,
  Sign,
} from "./PostWriteStyle";

export default function RefundGuideInput() {
  return (
    <PostWriteContent className="pt-[2rem]">
      <PostWriteList>
        <PostWriteLabel htmlFor="refundGuide">
          환불/교환 안내 <Sign>&#42;</Sign>
        </PostWriteLabel>
        <PostTextArea id="refundGuide" cols={50} rows={3} />
      </PostWriteList>
    </PostWriteContent>
  );
}
