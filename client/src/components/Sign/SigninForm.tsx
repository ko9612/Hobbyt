import tw from "tailwind-styled-components";
import SubmitButton from "../Button/SubmitButton";
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
      <SubmitButton onClick={() => {}}>로그인</SubmitButton>
    </form>
  );
}
