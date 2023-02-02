import { ComponentProps } from "react";
import { useRecoilState } from "recoil";
import { phoneNumRegex } from "../../../util/Regex";
import {
  UserRecipientPhoneState,
  UserRecipientNameState,
} from "../../../state/UserState";
import {
  InfoSection,
  InfoTitle,
  InfoContent,
  EditList,
  InputDiv,
  Input,
  InputLabel,
} from "./InfoStyle";
import AddressApi from "./AddressApi";

export default function AddressInfo() {
  const [isRecipientName, setIsRecipientName] = useRecoilState(
    UserRecipientNameState,
  );
  const [isRecipientContact, setIsRecipientContact] = useRecoilState(
    UserRecipientPhoneState,
  );

  // 수령인 명
  const EditNamelHandler: ComponentProps<"input">["onChange"] = e => {
    setIsRecipientName(e.target.value);
  };

  // 연락처
  const EditContactlHandler: ComponentProps<"input">["onChange"] = e => {
    const { value } = e.target;
    if (phoneNumRegex.test(value))
      setIsRecipientContact(value.replace(/[^0-9]/g, ""));
  };

  return (
    <InfoSection>
      <InfoTitle>배송지 정보</InfoTitle>
      <InfoContent>
        <EditList>
          <InputLabel htmlFor="receiverName">수령자명</InputLabel>
          <InputDiv>
            <Input
              type="text"
              id="receiverName"
              maxLength={10}
              value={isRecipientName}
              onChange={e => EditNamelHandler(e)}
            />
          </InputDiv>
        </EditList>
        <EditList>
          <InputLabel htmlFor="contactNumber">연락처</InputLabel>
          <InputDiv>
            <Input
              type="text"
              id="contactNumber"
              placeholder="'-'를 제외한 휴대폰 번호를 입력해주세요"
              value={isRecipientContact}
              onChange={e => EditContactlHandler(e)}
            />
          </InputDiv>
        </EditList>
        <EditList>
          <InputLabel className="pt-2 items-baseline">주소</InputLabel>
          <InputDiv>
            {/* 우편번호 검색 & 주소 */}
            <AddressApi />
          </InputDiv>
        </EditList>
      </InfoContent>
    </InfoSection>
  );
}
