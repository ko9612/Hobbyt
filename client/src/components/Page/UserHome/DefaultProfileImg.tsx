import Image from "next/image";
import { useRecoilState } from "recoil";
import { UserProfileState } from "../../../state/UserState";
import ExamImg from "../../../image/userProfile_ex.jpeg";

interface ImgProps {
  width: number;
  height: number;
  borderW: number;
}

export default function UserProfileImage({ width, height, borderW }: ImgProps) {
  const [profile] = useRecoilState(UserProfileState);
  return (
    <Image
      src={profile || ExamImg}
      alt="유저 프로필 사진"
      width={width}
      height={height}
      className={`overflow-hide rounded-full border-${borderW} border-white`}
    />
  );
}
