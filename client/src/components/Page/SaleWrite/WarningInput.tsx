import {
  PostWriteContent,
  PostWriteList,
  PostWriteLabel,
  PostTextArea,
  Sign,
} from "./PostWriteStyle";

export default function WarningInput() {
  return (
    <PostWriteContent>
      <PostWriteList>
        <PostWriteLabel htmlFor="WarningInput">
          주의사항 <Sign>&#42;</Sign>
        </PostWriteLabel>
        <PostTextArea id="WarningInput" cols={50} rows={3} />
      </PostWriteList>
    </PostWriteContent>
  );
}
