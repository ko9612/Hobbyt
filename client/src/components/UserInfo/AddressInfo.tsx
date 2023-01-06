import { ComponentProps, useState } from "react";
import {
  InfoSection,
  InfoTitle,
  InfoContent,
  EditList,
  InputDiv,
  Input,
  InputLabel,
  SubLabel,
} from "./InfoStyle";
import DefalutButton from "../Button/DefalutButton";

const contactNumRegex = /^[-?\d+]{0,11}$/;

export default function AddressInfo() {
  const [isEditContact, setIsEditContact] = useState("");
  const EditContactlHandler: ComponentProps<"input">["onChange"] = e => {
    if (contactNumRegex.test(e.target.value)) setIsEditContact(e.target.value);
  };
  return (
    <InfoSection>
      <InfoTitle>배송지 정보</InfoTitle>
      <InfoContent>
        <EditList>
          <InputLabel htmlFor="receiverName">수령자명</InputLabel>
          <InputDiv>
            <Input type="text" id="receiverName" maxLength={10} />
          </InputDiv>
        </EditList>
        <EditList>
          <InputLabel htmlFor="contactNumber">연락처</InputLabel>
          <InputDiv>
            <Input
              type="text"
              id="contactNumber"
              maxLength={11}
              placeholder="'-'를 제외한 휴대폰 번호를 입력해주세요"
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              value={isEditContact}
              onChange={e => EditContactlHandler(e)}
            />
          </InputDiv>
        </EditList>
        <EditList>
          <InputLabel htmlFor="zipCode">우편번호</InputLabel>
          <InputDiv>
            <Input type="text" id="zipCode" maxLength={5} />
            <div className="pl-2">
              <DefalutButton onClick={() => {}}>우편번호 찾기</DefalutButton>
            </div>
          </InputDiv>
        </EditList>
        <EditList>
          <InputLabel htmlFor="address1" className="block">
            주소
          </InputLabel>
          <div className="w-3/5">
            <div className="mb-2">
              <Input type="text" id="address1" maxLength={30} />
            </div>
            <SubLabel htmlFor="address2">
              <Input type="text" id="address2" maxLength={30} />
            </SubLabel>
          </div>
        </EditList>
      </InfoContent>
    </InfoSection>
  );
}
