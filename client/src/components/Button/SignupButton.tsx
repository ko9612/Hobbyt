import Link from "next/link";
import tw from "tailwind-styled-components";

const SignupText = tw.p`
mt-6 text-sm text-center text-gray-400
`;
export default function SignupButton() {
  return (
    <SignupText>
      아직 회원이 아니신가요?
      <Link
        href="/signup"
        className="text-MainColor focus:underline hover:underline ml-2"
      >
        회원가입
      </Link>
    </SignupText>
  );
}
