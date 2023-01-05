import {
  InfoSection,
  InfoTitle,
  InfoContent,
  EditList,
  Input,
  InputLabel,
} from "./InfoStyle";
import DefaultInput from "../Input/DefaultInput";

export default function AccountInfo() {
  // const [isEditPhone, setIsEditPhone] = useState(false);

  // const EditPhonelHandler = () => {
  //   setIsEditPhone(!isEditPhone);
  // };

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
          <Input>
            <DefaultInput type="text" id="phoneNumber" />
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
          </Input>
        </EditList>
      </InfoContent>
    </InfoSection>
  );
}
