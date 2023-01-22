import { ComponentProps } from "react";
import { useRecoilState } from "recoil";
import {
  UserRefundBankState,
  UserRefundHolderState,
  UserRefundNumState,
} from "../../../state/UserState";
import { accountNumRegex } from "../../../util/Regex";
import {
  InfoSection,
  InfoTitle,
  InfoContent,
  EditList,
  InputDiv,
  Input,
  InputLabel,
} from "./InfoStyle";

export default function RefundInfo() {
  const [isHolder, setIsHolder] = useRecoilState(UserRefundHolderState);
  const [isBank, setIsBank] = useRecoilState(UserRefundBankState);
  const [isAccountNum, setIsAccountNum] = useRecoilState(UserRefundNumState);

  // 예금주 handler
  const EditHolderHandler: ComponentProps<"input">["onChange"] = e => {
    setIsHolder(e.target.value);
  };

  // 은행명 handler
  const EditBanklHandler: ComponentProps<"input">["onChange"] = e => {
    setIsBank(e.target.value);
  };

  // 계좌번호 handler
  const EditAccountNumHandler: ComponentProps<"input">["onChange"] = e => {
    const { value } = e.target;
    if (accountNumRegex.test(value))
      setIsAccountNum(value.replace(/[^0-9]/g, ""));
  };

  return (
    <InfoSection className="border-none">
      <InfoTitle>환불계좌 정보</InfoTitle>
      <InfoContent>
        <EditList>
          <InputLabel htmlFor="holderName">예금주</InputLabel>
          <InputDiv>
            <Input
              type="text"
              id="holderName"
              maxLength={10}
              value={isHolder}
              onChange={e => EditHolderHandler(e)}
            />
          </InputDiv>
        </EditList>
        <EditList>
          <InputLabel htmlFor="BankName">은행명</InputLabel>
          <InputDiv>
            <Input
              type="text"
              id="BankName"
              maxLength={10}
              value={isBank}
              onChange={e => EditBanklHandler(e)}
            />
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
              onChange={e => EditAccountNumHandler(e)}
            />
          </InputDiv>
        </EditList>
      </InfoContent>
    </InfoSection>
  );
}
