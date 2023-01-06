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

const phoneNumRegex = /^[-?\d+]{0,11}$/;

export default function AccountInfo() {
  const [isEditPhone, setIsEditPhone] = useState("");
  const EditPhonelHandler: ComponentProps<"input">["onChange"] = e => {
    if (phoneNumRegex.test(e.target.value)) setIsEditPhone(e.target.value);
  };

  return (
    <InfoSection>
      <InfoTitle>계정 정보</InfoTitle>
      <InfoContent>
        {/* 이메일 수정 불가능 */}
        <EditList>
          <InputLabel>이메일</InputLabel>
          <div className=" px-2 py-1 w-3/5">[kakao]qwert2345@naver.com</div>
        </EditList>
        <EditList>
          <InputLabel htmlFor="phoneNumber">휴대폰 번호</InputLabel>
          <InputDiv>
            <Input
              type="tel"
              id="phoneNumber"
              maxLength={11}
              placeholder="'-'를 제외한 휴대폰 번호를 입력해주세요"
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              value={isEditPhone}
              onChange={e => EditPhonelHandler(e)}
              required
            />
            {/* 버튼 컴포넌트화 고려
            <InfoButtonDiv>
              {isEditPhone ? (
                <DefalutButton onClick={EditPhonelHandler}>저장</DefalutButton>
              ) : (
                <InfoEditButton onClick={EditPhonelHandler}>
                  수정
                </InfoEditButton>
              )}
            </InfoButtonDiv> */}
          </InputDiv>
        </EditList>
        <div className="text-sm text-gray-500 text-end ">
          <button type="button" className="focus:underline hover:underline">
            회원탈퇴
          </button>
        </div>
      </InfoContent>
    </InfoSection>
  );
}
