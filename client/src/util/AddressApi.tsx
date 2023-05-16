import tw from "tailwind-styled-components";
import { ComponentProps, useState } from "react";
import { useRecoilState } from "recoil";
import DaumPostcode from "react-daum-postcode";
import { useRouter } from "next/router";
import { ModalBackdrop, ModalContainer } from "../components/Modal/MsgModal";
import { Input } from "../components/Page/UserInfo/InfoStyle";
import { DButton } from "../components/Button/DefalutButton";
import {
  UserRecipientStreetState,
  UserRecipientZipCodeState,
  UserRecipientDetailState,
} from "../state/UserState";

const InputDiv = tw.div``;

export default function AddressApi() {
  const router = useRouter();
  const [isZipcode, setIsZipcode] = useRecoilState(UserRecipientZipCodeState);
  const [isStreet, setIsStreet] = useRecoilState(UserRecipientStreetState);
  const [isDetail, setIsDetail] = useRecoilState(UserRecipientDetailState);

  // 주소 검색 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 우편번호 찾기
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
    <>
      <InputDiv
        className={`pt-2 flex ${
          router.pathname.includes("/mypage") ||
          router.pathname.startsWith("/blog")
            ? null
            : "w-1/2"
        }`}
      >
        <Input
          type="text"
          id="zipCode"
          maxLength={5}
          placeholder="우편번호"
          defaultValue={isZipcode}
        />
        <div className="pl-2">
          <DButton
            className="py-1"
            onClick={e => {
              e.preventDefault();
              setIsPopupOpen(true);
            }}
          >
            우편번호 찾기
          </DButton>
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
      </InputDiv>
      <InputDiv className="w-full py-2">
        <Input
          type="text"
          id="address1"
          maxLength={30}
          placeholder="주소"
          defaultValue={isStreet}
        />
      </InputDiv>
      <InputDiv className="w-full">
        <Input
          type="text"
          id="address2"
          maxLength={30}
          placeholder="상세주소"
          value={isDetail}
          onChange={EditDetailHandler}
        />
      </InputDiv>
    </>
  );
}
