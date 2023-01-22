import { ComponentProps, useState } from "react";
import { useRecoilState } from "recoil";
import DaumPostcode from "react-daum-postcode"; // 주소 검색 api
import { phoneNumRegex } from "../../../util/Regex";
import {
  UserRecipientPhoneState,
  UserRecipientNameState,
  UserRecipientZipCodeState,
  UserRecipientStreetState,
  UserRecipientDetailState,
} from "../../../state/UserState";
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
import { ModalContainer, ModalBackdrop } from "../../Modal/MsgModal";
import { DefalutButton } from "../../Button/DefalutButton";

export default function AddressInfo() {
  const [isRecipientName, setIsRecipientName] = useRecoilState(
    UserRecipientNameState,
  );
  const [isRecipientContact, setIsRecipientContact] = useRecoilState(
    UserRecipientPhoneState,
  );
  const [isZipcode, setIsZipcode] = useRecoilState(UserRecipientZipCodeState);
  const [isStreet, setIsStreet] = useRecoilState(UserRecipientStreetState);
  const [isDetail, setIsDetail] = useRecoilState(UserRecipientDetailState);

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

  // 주소 검색 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 주소 검색 api 사용 + 우편번호, 주소1
  const handlePostCode = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsZipcode(data.zonecode);
    setIsStreet(fullAddress);
    setIsPopupOpen(false);
  };

  // detail 주소
  const EditDetailHandler: ComponentProps<"input">["onChange"] = e => {
    setIsDetail(e.target.value);
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
          <InputLabel htmlFor="zipCode">우편번호</InputLabel>
          <InputDiv>
            <div className="flex">
              <Input type="text" id="zipCode" maxLength={5} value={isZipcode} />
              <div className="pl-2">
                <DefalutButton id="" onClick={() => setIsPopupOpen(true)}>
                  우편번호 찾기
                </DefalutButton>
                {isPopupOpen && (
                  <ModalContainer>
                    <ModalBackdrop onClick={() => setIsPopupOpen(false)}>
                      <div className="w-[40rem] rounded-md overflow-hidden z-40 shadow-xl">
                        <DaumPostcode onComplete={handlePostCode} />
                      </div>
                    </ModalBackdrop>
                  </ModalContainer>
                )}
              </div>
            </div>
          </InputDiv>
        </EditList>
        <EditList>
          <InputLabel htmlFor="address1" className="block">
            주소
          </InputLabel>
          <div className="w-3/5">
            <div className="mb-2">
              <Input type="text" id="address1" value={isStreet} />
            </div>
            <SubLabel htmlFor="address2">
              <Input
                type="text"
                id="address2"
                maxLength={30}
                value={isDetail}
                onChange={EditDetailHandler}
              />
            </SubLabel>
          </div>
        </EditList>
      </InfoContent>
    </InfoSection>
  );
}
