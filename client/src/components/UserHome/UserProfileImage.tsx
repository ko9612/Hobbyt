import Image from "next/image";
import userProfile from "../../image/userProfile_ex.jpeg"; // 프로필 사진 임시입니다

export default function UserProfileImage() {
  return (
    <div>
      <Image
        src={userProfile}
        alt="유저 프로필 사진"
        width={250}
        height={250}
        className="mb-3 overflow-hidden border-8 border-white rounded-full"
      />
    </div>
  );
}
