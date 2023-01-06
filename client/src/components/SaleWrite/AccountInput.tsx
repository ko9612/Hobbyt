import { useState, ComponentProps } from "react";
import {
  PostWriteContent,
  PostWriteList,
  PostWriteLabel,
  Sign,
  PostInput,
} from "./PostWriteStyle";

const AccountNumRegex = /^[-?\d+]{0,14}$/;

export default function AccountInput() {
  const [isAccountNum, setIsAccountNum] = useState("");

  const accountNumHandler: ComponentProps<"input">["onChange"] = e => {
    if (AccountNumRegex.test(e.target.value)) setIsAccountNum(e.target.value);
  };

  return (
    <PostWriteContent>
      <PostWriteList>
        <PostWriteLabel htmlFor="accountBank">
          입금계좌 정보 <Sign>&#42;</Sign>
        </PostWriteLabel>
        <div className="flex items-center">
          <div className="w-[8rem]">
            <PostInput
              type="text"
              id="accountBank"
              maxLength={10}
              placeholder="은행명"
            />
          </div>
          <span className="px-3 text-xl text-MainColor font-extrabold">|</span>
          <div className="w-[24rem]">
            <PostInput
              type="text"
              id="accountNum"
              maxLength={14}
              placeholder="'-'를 제외한 계좌번호를 입력해주세요"
              value={isAccountNum}
              onChange={e => accountNumHandler(e)}
            />
          </div>
        </div>
      </PostWriteList>
    </PostWriteContent>
  );
}
