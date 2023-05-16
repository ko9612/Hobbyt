import tw from "tailwind-styled-components";
import SignGuide from "../src/components/Page/Sign/SignGuide";
import SignRightContent from "../src/components/Page/Sign/SignRightContent";
import Logo from "../src/components/Page/Sign/SignLogo";
import ForgotPasswordForm from "../src/components/Page/Sign/ForgotPasswordForm";
import { Content, InputDiv, LeftContent, Main } from "./signin";

export default function ForgotPassword() {
  return (
    <Main>
      <Content>
        <SignRightContent />
        <LeftContent>
          <Logo />
          <InputDiv>
          <ForgotPasswordForm/>
          <SignGuide
              msg="아직 회원이 아니신가요?"
              sign="회원가입"
              href="/signup"
            />
            <SignGuide
              msg="비밀번호가 생각나셨나요?"
              sign="로그인"
              href="/signin"
            />
          </InputDiv>
        </LeftContent>
      </Content>
    </Main>
  );
}
