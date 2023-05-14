import tw from "tailwind-styled-components";
import Image from "next/image";
import mainLogo from "src/image/mainLogo.png";
import Link from "next/link";

export const LogoDiv = tw.div`
flex justify-center
`;

export default function Logo() {
  return (
    <LogoDiv>
      <Link href="/" className="w-72">
        <Image src={mainLogo} alt="로고" />
      </Link>
    </LogoDiv>
  );
}
