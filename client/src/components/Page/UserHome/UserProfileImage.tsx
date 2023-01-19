import Image from "next/image";
import { useRecoilState } from "recoil";
// import userProfile from "../../../image/userProfile_ex.jpeg"; // 프로필 사진 임시입니다
import { ProfileImageState } from "../../../state/ProfileState";

export default function UserProfileImage() {
  const [profile] = useRecoilState(ProfileImageState);
  return (
    <div>
      <Image
        src={profile}
        alt="유저 프로필 사진"
        width={250}
        height={250}
        className="mb-3 overflow-hidden border-8 border-white rounded-full"
      />
    </div>
  );
}
