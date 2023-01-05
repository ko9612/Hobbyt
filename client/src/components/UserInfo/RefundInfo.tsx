import {
  InfoSection,
  InfoTitle,
  InfoContent,
  EditList,
  Input,
  InputLabel,
} from "./InfoStyle";
import DefaultInput from "../Input/DefaultInput";

export default function RefundInfo() {
  return (
    <InfoSection className="border-none">
      <InfoTitle>환불계좌 정보</InfoTitle>
      <InfoContent>
        <EditList>
          <InputLabel htmlFor="holderName">예금주</InputLabel>
          <Input>
            <DefaultInput type="text" id="holderName" />
          </Input>
        </EditList>
        <EditList>
          <InputLabel htmlFor="BankName">은행명</InputLabel>
          <Input>
            <DefaultInput type="text" id="BankName" />
          </Input>
        </EditList>
        <EditList>
          <InputLabel htmlFor="accountNumber">계좌번호</InputLabel>
          <Input>
            <DefaultInput type="text" id="accountNumber" />
          </Input>
        </EditList>
      </InfoContent>
    </InfoSection>
  );
}
