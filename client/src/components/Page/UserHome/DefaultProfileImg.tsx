import Image from "next/image";
import { useRouter } from "next/router";

interface ImgProps {
  profileImg: any;
  width: number;
  height: number;
  borderW: number;
  children: string;
}

export default function DefaultProfileImage({
  profileImg,
  width,
  height,
  borderW,
  children,
}: ImgProps) {
  const router = useRouter();
  return (
    <Image
      src={profileImg}
      alt="디폴트 프로필 사진"
      width={width}
      height={height}
      className={`overflow-hidden relative rounded-full object-cover border-${borderW} ${
        router.pathname.startsWith("/mypage")
          ? "border-yellow-200"
          : "border-white"
      }
      ${children === "nav" ? `w-[2.2rem] h-[2.2rem]` : ""}
      ${children === "blog" ? `w-[1.8rem] h-[1.8rem]` : ""}
      ${children === "sale" ? `w-[1.5rem] h-[1.5rem]` : ""}
      ${children === "best blog" ? `w-[4rem] h-[4rem]` : ""}
      `}
    />
  );
}
