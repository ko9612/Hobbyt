import Image from "next/image";
import tw from "tailwind-styled-components";
import headerImage from "../../image/header_ex.jpg"; // 헤더 이미지 임시입니다

export default function Header() {
  const HContainer = tw.header`
  `;

  return (
    <HContainer>
      <Image
        src={headerImage}
        alt="개인홈 이미지 헤더"
        width={1200}
        height={100}
        className="overflow-hidden border border-red-700 h-80 w-[75rem] ml-auto"
      />
    </HContainer>
  );
}

// const HContainer = tw.header`
// sticky top-0
// `;
