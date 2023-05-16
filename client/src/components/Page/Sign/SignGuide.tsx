import Link from "next/link";
import tw from "tailwind-styled-components";

const SignupText = tw.p`
my-2 text-sm text-center text-gray-400
`;

interface SignProps {
  msg: string;
  sign: string;
  href: string;
}

export default function SignupButton({ msg, sign, href }: SignProps) {
  return (
    <SignupText>
      {msg}
      <Link
        href={href}
        className="text-MainColor focus:underline hover:underline ml-2"
      >
        {sign}
      </Link>
    </SignupText>
  );
}
