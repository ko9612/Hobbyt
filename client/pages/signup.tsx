import { Main, Content, LeftContent, InputDiv } from "./signin";
import RightContent from "../src/components/Page/Sign/SignRightContent";
import Logo from "../src/components/Page/Sign/SignLogo";
import SignGuide from "../src/components/Page/Sign/SignGuide";
import SignupForm from "../src/components/Page/Sign/SignupForm";

export default function SignUp() {
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
