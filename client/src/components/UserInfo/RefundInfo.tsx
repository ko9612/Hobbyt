import { ComponentProps, useState } from "react";
import {
  InfoSection,
  InfoTitle,
  InfoContent,
  EditList,
  InputDiv,
  Input,
  InputLabel,
} from "./InfoStyle";

const accountNumRegex = /^[-?\d+]{0,14}$/;

export default function RefundInfo() {
  const [isAccountNum, setIsAccountNum] = useState("");
  const AccountNumlHandler: ComponentProps<"input">["onChange"] = e => {
    if (accountNumRegex.test(e.target.value)) setIsAccountNum(e.target.value);
  };

  return (
    <InfoSection className="border-none">
      <InfoTitle>환불계좌 정보</InfoTitle>
      <InfoContent>
        <EditList>
          <InputLabel htmlFor="holderName">예금주</InputLabel>
          <InputDiv>
            <Input type="text" id="holderName" maxLength={10} />
          </InputDiv>
        </EditList>
        <EditList>
          <InputLabel htmlFor="BankName">은행명</InputLabel>
          <InputDiv>
            <Input type="text" id="BankName" maxLength={10} />
          </InputDiv>
        </EditList>
        <EditList>
          <InputLabel htmlFor="accountNumber">계좌번호</InputLabel>
          <InputDiv>
            <Input
              type="text"
              id="accountNumber"
              maxLength={14}
              placeholder="'-'를 제외한 계좌번호를 입력해주세요"
              value={isAccountNum}
              onChange={e => AccountNumlHandler(e)}
            />
          </InputDiv>
        </EditList>
      </InfoContent>
    </InfoSection>
  );
}
