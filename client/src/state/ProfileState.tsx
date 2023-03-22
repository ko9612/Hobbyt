// 프로필 이미지 상태
import { atom } from "recoil";

export const ProfileImageState = atom<string | Blob | StaticImport>({
  key: "ProfileImageState",
  default: "",
});

export const HeaderImageState = atom<string | Blob | StaticImport>({
  key: "HeaderImageState",
  default: "",
});

// 유저 프로필 데이터(이미지+닉네임..)
export const UserProfileDataState = atom({
  key: "UserProfileDataState",
  default: {
    createdAt: null,
    description: null,
    followerCount: 0,
    followingCount: 0,
    headerImage: null,
    isFollowing: null,
    nickname: null,
    profileImage: null,
    views: { today: 0, total: 0 },
  },
});
