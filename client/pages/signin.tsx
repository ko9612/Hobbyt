import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import sideImg from "../src/image/header_ex.jpg";
import mainLogo from "../src/image/mainLogo.png";
import WideButton from "../src/components/Button/WideButton";
import SocialLoginButton from "../src/components/Button/SocialButton";
import SignupButton from "../src/components/Button/SignupButton";
import LoginInput from "../src/components/Input/LoginInput";

const LoginMain = tw.main`
flex items-center justify-center h-screen bg-slate-200
`;

const LoginContent = tw.section`
flex w-[64rem] rounded-md bg-white shadow-sm
`;

const RightContent = tw.article`
hidden md:block w-full
`;
const LeftContent = tw.article`
w-full mt-40 mb-5
`;

const LogoDiv = tw.div`
flex justify-center
`;

const LoginDiv = tw.div`
mt-8 px-16
`;

export default function SignIn() {
  return (
    <LoginMain>
      <LoginContent>
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
          <LoginDiv>
            <form>
              <LoginInput type="email" id="email" placeholder="이메일" />
              <div className="mt-6 mb-10">
                <LoginInput
                  type="password"
                  id="password"
                  placeholder="비밀번호"
                />
              </div>
              <WideButton>로그인</WideButton>
            </form>
            <SocialLoginButton />
            <SignupButton />
          </LoginDiv>
        </LeftContent>
      </LoginContent>
    </LoginMain>
  );
}
