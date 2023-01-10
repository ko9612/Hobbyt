import {
  PostWriteContent,
  PostWriteList,
  PostWriteLabel,
  PostInput,
} from "./PostWriteStyle";
// import PostInput from "../Input/PostInput";

export default function ProcessUrlInput() {
  return (
    <PostWriteContent>
      <PostWriteList>
        <PostWriteLabel htmlFor="processUrl">제작과정 URL</PostWriteLabel>
        <PostInput type="url" id="processUrl" maxLength={100} />
      </PostWriteList>
    </PostWriteContent>
  );
}
