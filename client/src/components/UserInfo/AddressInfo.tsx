import {
  InfoSection,
  InfoTitle,
  InfoContent,
  EditList,
  Input,
  InputLabel,
} from "./InfoStyle";
import DefaultInput from "../Input/DefaultInput";
import DefalutButton from "../Button/DefalutButton";

export default function AddressInfo() {
  return (
    <InfoSection>
      <InfoTitle>배송지 정보</InfoTitle>
      <InfoContent>
        <EditList>
          <InputLabel htmlFor="receiverName">수령자명</InputLabel>
          <Input>
            <DefaultInput type="text" id="receiverName" />
          </Input>
        </EditList>
        <EditList>
          <InputLabel htmlFor="contactNumber">연락처</InputLabel>
          <Input>
            <DefaultInput type="text" id="contactNumber" />
          </Input>
        </EditList>
        <EditList>
          <InputLabel htmlFor="zipCode">우편번호</InputLabel>
          <Input>
            <DefaultInput type="text" id="zipCode" />
            <div className="pl-2">
              <DefalutButton onClick={() => {}}>우편번호 찾기</DefalutButton>
            </div>
          </Input>
        </EditList>
        <EditList>
          <InputLabel htmlFor="address1" className="block">
            주소
          </InputLabel>
          <div className="w-3/5">
            <div className="mb-2">
              <DefaultInput type="text" id="address1" />
            </div>
            <DefaultInput type="text" id="address2" />
          </div>
        </EditList>
      </InfoContent>
    </InfoSection>
  );
}
