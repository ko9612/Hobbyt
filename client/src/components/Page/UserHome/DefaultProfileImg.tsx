import Image from "next/image";
import ExamImg from "../../../image/userProfile_ex.jpeg";

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
  return (
    <Image
      src={profileImg || ExamImg}
      alt="유저 프로필 사진"
      width={width}
      height={height}
      className={`overflow-hide rounded-full border-${borderW} border-white`}
    />
  );
}
