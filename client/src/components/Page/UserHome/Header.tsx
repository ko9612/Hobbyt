import Image from "next/image";
// import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";
import { HeaderImageState } from "../../../state/ProfileState";

export default function Header() {
  const headerImage = useRecoilValue(HeaderImageState);
  // 응답이 http 붙어서 들어오기 때문에 그 부분을 짜르가 위함
  const newHeaderImage = headerImage.slice(-53);

  console.log("newHeaderImage", newHeaderImage);

  return (
    <header>
      <Image
        src={headerImage && newHeaderImage}
        alt="개인홈 이미지 헤더"
        width={1200}
        height={300}
        className="overflow-hidden border border-red-700 h-80 w-[62rem] ml-auto"
      />
    </header>
  );
}

// const HContainer = tw.header`
// sticky top-0
// `;
