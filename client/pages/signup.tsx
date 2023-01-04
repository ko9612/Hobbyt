import { Main, Content, LeftContent, InputDiv } from "./signin";
import RightContent from "../src/components/Sign/SignRightContent";
import Logo from "../src/components/Sign/SignLogo";
import SignGuide from "../src/components/Sign/SignGuide";
import SignupForm from "../src/components/Sign/SignupForm";

export default function SignUp() {
  // 인증메일 전송버튼 클릭 여부

  return (
    <Main>
      <Content>
        <RightContent />
        <LeftContent>
          <Logo />
          <InputDiv>
            <SignupForm />
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
