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

export default function SignUp() {
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
        <LeftContent className="mb-14">
          <LogoDiv>
            <Link href="/" className="w-64">
              <Image src={mainLogo} alt="로고" />
            </Link>
          </LogoDiv>
          <InputDiv>
            <form>
              <Input>
                <LoginInput type="text" id="name" placeholder="닉네임" />
              </Input>
              <div className="flex">
                <div className="flex-1">
                  <LoginInput type="email" id="email" placeholder="이메일" />
                </div>
                <div className="ml-2">
                  <DefalutButton onClick={() => setEmailBut(!emailBut)}>
                    <BsEnvelopeFill size="25px" />
                  </DefalutButton>
                </div>
              </div>
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
          </InputDiv>
        </LeftContent>
      </Content>
    </Main>
  );
}
