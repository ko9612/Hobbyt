// 프로필 이미지 상태
import { atom } from "recoil";

export const ProfileImageState = atom<string | Blob | StaticImport>({
  key: "ProfileImageState",
  default: "",
});

export const HeaderImageState = atom<string | Blob | StaticImport>({
  key: "HeaderImageStat",
  default: "",
});
