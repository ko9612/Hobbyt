import Image from "next/image";
import { useRecoilValue } from "recoil";
import userDProfile from "../../../image/userDImage.svg";
// 프로필 사진 임시입니다
import { ProfileImageState } from "../../../state/ProfileState";

export default function UserProfileImage({ wid, hei }) {
  const profile = useRecoilValue(ProfileImageState);
  const newProfile = `${profile}`;
  return (
    <div>
      <Image
        src={newProfile !== null ? newProfile : userDProfile}
        alt="유저 프로필 사진"
        width={wid}
        height={hei}
        className={
          wid === 250
            ? "object-cover mb-3 border-8 border-white rounded-full w-60 h-60"
            : "object-cover mb-3 border-8 border-white rounded-full w-20 h-20"
        }
      />
    </div>
  );
}

// 18번째 줄 설명
// wid가 250이면 개인홈 프로필임 => 개인홈 프로필일 경우 w 와 h 값을 15rem 정도 잡아야 가로로 긴 이미지여도 틀을 벗어나지 않음
// w-[15rem] h-[15rem] w-[5rem] h-[5rem]
