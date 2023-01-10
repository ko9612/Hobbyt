import {
  PostWriteContent,
  PostWriteList,
  PostWriteLabel,
  Sign,
  PostInput,
  SubLabel,
} from "./PostWriteStyle";
// import PostInput from "../Input/PostInput";

export default function SalePeriodInput() {
  return (
    <PostWriteContent>
      <PostWriteList>
        <PostWriteLabel htmlFor="startDate">
          판매기간 <Sign>&#42;</Sign>
        </PostWriteLabel>
        <div className="flex items-center">
          <div>
            <PostInput
              type="date"
              id="startDate"
              min={new Date().toISOString().substring(0, 10)}
              defaultValue={new Date().toISOString().substring(0, 10)}
              placeholder=""
            />
          </div>
          <span className="px-3 text-xl text-MainColor font-extrabold">~</span>
          <SubLabel>
            <PostInput type="date" id="endDate" />
          </SubLabel>
        </div>
      </PostWriteList>
    </PostWriteContent>
  );
}
