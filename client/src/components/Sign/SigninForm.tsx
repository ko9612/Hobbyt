import tw from "tailwind-styled-components";
import WideButton from "../Button/WideButton";
import LoginInput from "../Input/LoginInput";

export const Input = tw.div`
  my-6
`;

export default function SigninForm() {
  return (
    <form>
      <Input>
        <LoginInput type="email" id="email" placeholder="이메일" />
      </Input>
      <Input className="mb-10">
        <LoginInput type="password" id="password" placeholder="비밀번호" />
      </Input>
      <WideButton onClick={() => {}}>로그인</WideButton>
    </form>
  );
}
