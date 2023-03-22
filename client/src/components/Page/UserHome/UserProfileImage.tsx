import Image from "next/image";
import { useRecoilValue } from "recoil";
import userDProfile from "../../../image/userDImage.svg";
// 프로필 사진 임시입니다
import { ProfileImageState } from "../../../state/ProfileState";

export default function UserProfileImage() {
  const profile = useRecoilValue(ProfileImageState);
  const newProfile = `${profile}`;
  return (
    <div>
      <Image
        src={newProfile !== null ? newProfile : userDProfile}
        alt="유저 프로필 사진"
        width={250}
        height={250}
        className="object-cover mb-3 border-8 border-white rounded-full w-[15rem] h-[15rem]"
      />
    </div>
  );
}
