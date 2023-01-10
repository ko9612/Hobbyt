import Image from "next/image";
import userProfile from "../../image/userProfile_ex.jpeg"; // 프로필 사진 임시입니다

interface ImgProps {
  width: number;
  height: number;
  borderW: number;
}

export default function UserProfileImage({ width, height, borderW }: ImgProps) {
  return (
    <div>
      <Image
        src={userProfile}
        alt="유저 프로필 사진"
        width={width}
        height={height}
        className={`overflow-hide rounded-full border-${borderW} border-white`}
      />
    </div>
  );
}
