import Image from "next/image";
import { useRouter } from "next/router";

interface ImgProps {
  profileImg: any;
  width: number;
  height: number;
  borderW: number;
}

export default function DefaultProfileImage({
  profileImg,
  width,
  height,
  borderW,
}: ImgProps) {
  const router = useRouter();
  return (
    <Image
      src={profileImg}
      alt="유저 프로필 사진"
      width={width}
      height={height}
      className={`overflow-hide rounded-full border-${borderW} ${
        router.pathname.startsWith("/mypage")
          ? "border-yellow-200"
          : "border-white"
      }`}
    />
  );
}
