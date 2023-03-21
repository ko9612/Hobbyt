import Image from "next/image";
import { useRecoilValue } from "recoil";
import userDProfile from "../../../image/userDImage.svg";
// 프로필 사진 임시입니다
import { ProfileImageState } from "../../../state/ProfileState";

export default function UserProfileImage() {
  const profile = useRecoilValue(ProfileImageState);
  // 응답이 http 붙어서 들어오기 때문에 그 부분을 짜르가 위함
  console.log("프로필 어케 들어옴?", profile);
  // const newProfile = profile.slice(-51);
  const newProfile = `${profile}`;
  // console.log("newProfile", newProfile);

  return (
    <div>
      <Image
        src={profile !== null ? newProfile : userDProfile}
        alt="유저 프로필 사진"
        width={250}
        height={250}
        className="mb-3 overflow-hidden border-8 border-white rounded-full"
      />
    </div>
  );
}
