import Image from "next/image";
import Link from "next/link";
import { BsEnvelopeFill } from "react-icons/bs";
import { useState } from "react";
import sideImg from "../src/image/header_ex.jpg";
import mainLogo from "../src/image/mainLogo.png";
import WideButton from "../src/components/Button/WideButton";
import LoginInput from "../src/components/Input/LoginInput";
import {
  Main,
  Content,
  RightContent,
  LeftContent,
  LogoDiv,
  InputDiv,
  Input,
} from "./signin";
import DefalutButton from "../src/components/Button/DefalutButton";
import SignGuideButton from "../src/components/Button/SignGuideButton";

export default function SignUp() {
  // 인증메일 전송버튼 클릭 여부
  const [emailBut, setEmailBut] = useState(false);

  return (
    <Main>
      <Content>
        <RightContent>
          <Image
            src={sideImg}
            alt="회원가입 사이드 이미지"
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
            <form className="mb-10">
              {/* 닉네임 */}
              <Input>
                <LoginInput type="text" id="name" placeholder="닉네임" />
              </Input>

              {/* 이메일 */}
              <Input>
                <div className="flex">
                  <div className="flex-1">
                    <LoginInput type="email" id="email" placeholder="이메일" />
                  </div>
                  <div className="ml-2">
                    <DefalutButton onClick={() => setEmailBut(true)}>
                      <BsEnvelopeFill size="25px" />
                    </DefalutButton>
                  </div>
                </div>
              </Input>

              {/* 이메일 인증 입력 */}
              {emailBut && (
                <Input>
                  <div className="flex">
                    <div className="flex-1">
                      <LoginInput
                        type="text"
                        id="emailCertification"
                        placeholder="인증 번호 입력"
                      />
                    </div>
                    {/* 인증번호 완료버튼 */}
                    <div className="ml-2">
                      <DefalutButton onClick={() => {}}>확인</DefalutButton>
                    </div>
                  </div>
                </Input>
              )}
              {/* 비밀번호 */}
              <div className="mb-10">
                <Input>
                  <LoginInput
                    type="password"
                    id="password"
                    placeholder="비밀번호"
                  />
                </Input>
                <Input>
                  <LoginInput
                    type="password"
                    id="password"
                    placeholder="비밀번호 확인"
                  />
                </Input>
              </div>
              <WideButton onClick={() => {}}>회원가입</WideButton>
            </form>
            <SignGuideButton
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
