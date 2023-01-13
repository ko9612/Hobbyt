import tw from "tailwind-styled-components";
import Image from "next/image";
import sideImg from "src/image/header_ex.jpg";

export const Content = tw.article`
hidden md:block w-full`;

export default function RightContent() {
  return (
    <Content>
      <Image
        src={sideImg}
        alt="로그인 사이드 이미지"
        className="object-cover h-full"
      />
    </Content>
  );
}
