import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import sideImg from "../src/image/header_ex.jpg";
import mainLogo from "../src/image/mainLogo.png";
import WideButton from "../src/components/Button/WideButton";
import SocialLoginButton from "../src/components/Button/SocialButton";
import SignupButton from "../src/components/Button/SignupButton";
import LoginInput from "../src/components/Input/LoginInput";

export const Main = tw.main`
flex items-center justify-center h-screen bg-slate-200
`;

export const Content = tw.section`
flex w-[64rem] rounded-md bg-white shadow-sm
`;

export const RightContent = tw.article`
hidden md:block w-full
`;
export const LeftContent = tw.article`
w-full mt-40 mb-5
`;

export const LogoDiv = tw.div`
flex justify-center
`;

export const InputDiv = tw.div`
mt-8 px-16
`;

export const Input = tw.div`
  my-6
`;

export default function SignIn() {
  return (
    <Main>
      <Content>
        <RightContent>
          <Image
            src={sideImg}
            alt="로그인 사이드 이미지"
            className="object-cover h-full"
          />
        </RightContent>
        <LeftContent>
          <LogoDiv>
            <Link href="/" className="w-64">
              <Image src={mainLogo} alt="로고" />
            </Link>
          </LogoDiv>
          <InputDiv>
            <form>
              <Input>
                <LoginInput type="email" id="email" placeholder="이메일" />
              </Input>
              <Input className="mb-10">
                <LoginInput
                  type="password"
                  id="password"
                  placeholder="비밀번호"
                />
              </Input>
              <WideButton onClick={() => {}}>로그인</WideButton>
            </form>
            <SocialLoginButton />
            <SignupButton />
          </InputDiv>
        </LeftContent>
      </Content>
    </Main>
  );
}
