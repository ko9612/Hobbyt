import tw from "tailwind-styled-components";
import SignGuide from "../src/components/Page/Sign/SignGuide";
import SignRightContent from "../src/components/Page/Sign/SignRightContent";
import Logo from "../src/components/Page/Sign/SignLogo";
import SocialLogin from "../src/components/Page/Sign/SocialForm";
import SigninForm from "../src/components/Page/Sign/SigninForm";

export const Main = tw.main`flex items-center justify-center h-screen bg-gray-200`;
export const Content = tw.section`flex w-[64rem] rounded-md bg-white shadow-sm`;
export const LeftContent = tw.article`w-full py-10 sm:py-20`;
export const InputDiv = tw.div`mt-8 px-10 sm:px-16`;

export default function SignIn() {
  return (
    <Main>
      <Content>
        <SignRightContent />
        <LeftContent>
          <Logo />
          <InputDiv>
            <SigninForm />
            <SocialLogin />
            <SignGuide
              msg="아직 회원이 아니신가요?"
              sign="회원가입"
              href="/signup"
            />
            <SignGuide
              msg="비밀번호가 생각나지 않나요?"
              sign="비밀번호 재설정"
              href="/forgotpw"
            />
          </InputDiv>
        </LeftContent>
      </Content>
    </Main>
  );
}
