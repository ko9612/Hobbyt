import tw from "tailwind-styled-components";
import Image from "next/image";
import Link from "next/link";
import mainLogo from "src/image/mainLogo.png";

export const LogoDiv = tw.div`flex justify-center`;

export default function Logo() {
  return (
    <LogoDiv>
      <Link href="/" className="w-[12rem] min-[400px]:w-[15rem] sm:w-72">
        <Image src={mainLogo} alt="로고" />
      </Link>
    </LogoDiv>
  );
}
