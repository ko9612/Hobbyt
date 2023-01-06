import tw from "tailwind-styled-components";
import SubmitButton from "../Button/SubmitButton";
// import LoginInput from "../Input/LoginInput";

export const Input = tw.div`
  my-6
`;

export const LoginInput = tw.input`
w-full px-4 py-2 text-gray-700 placeholder-gray-400
bg-white border border-slate-300 rounded-lg focus:border-MainColor focus:outline-none focus:ring focus:ring-MainColor/40 duration-200
`;

export default function SigninForm() {
  return (
    <form>
      <Input>
        <LoginInput
          type="email"
          id="email"
          maxLength={25}
          placeholder="이메일"
        />
      </Input>
      <Input className="mb-10">
        <LoginInput
          type="password"
          id="password"
          placeholder="비밀번호"
          maxLength={15}
        />
      </Input>
      <SubmitButton onClick={() => {}}>로그인</SubmitButton>
    </form>
  );
}
