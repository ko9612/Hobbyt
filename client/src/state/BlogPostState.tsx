import { atom } from "recoil";

export const TitleState = atom<string | undefined>({
  key: "BlogTitleState",
  default: "",
});

export const ContentState = atom<string | undefined>({
  key: "BlogContentState",
  default: "",
});

export const TagState = atom<string[] | undefined>({
  key: "BlogTagState",
  default: [],
});

export const PublicState = atom<boolean | undefined>({
  key: "BlogPublicState",
  default: true,
});

export const ListState = atom<string[] | undefined>({
  key: "BlogListState",
  default: [],
});
