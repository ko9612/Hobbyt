import { Main, Content, LeftContent, InputDiv } from "./signin";
import RightContent from "../src/components/Page/Sign/SignRightContent";
import Logo from "../src/components/Page/Sign/SignLogo";
import SignGuide from "../src/components/Page/Sign/SignGuide";
import SignupFrom from "../src/components/Page/Sign/SignupForm";

export default function SignUp() {
  // 인증메일 전송버튼 클릭 여부

  return (
    <Main>
      <Content>
        <RightContent />
        <LeftContent>
          <Logo />
          <InputDiv>
            {/* <SignupForm /> */}
            <SignupFrom />
            <SignGuide
              msg="이미 계정이 있으신가요?"
              sign="로그인"
              href="/signin"
            />
          </InputDiv>
        </LeftContent>
      </Content>
    </Main>
  );
}
