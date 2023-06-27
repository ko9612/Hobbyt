import { atom } from "recoil";
import { AxiosDataType } from "../type/blogType";

export const TitleState = atom<string>({
  key: "BlogTitleState",
  default: "",
});

export const ThumbnailState = atom<string | null>({
  key: "ThumbnailState",
  default: null,
});

export const ContentState = atom<string>({
  key: "BlogContentState",
  default: "",
});

export const TagState = atom<string[] | undefined>({
  key: "BlogTagState",
  default: [],
});

export const PublicState = atom<boolean>({
  key: "BlogPublicState",
  default: true,
});

export const ListState = atom<string[] | undefined>({
  key: "BlogListState",
  default: [],
});

export const BlogEditState = atom<AxiosDataType | undefined>({
  key: "BlogEditListState",
  default: undefined,
});

export const BlogSelectState = atom<string>({
  key: "BlogSelectState",
  default: "최신순",
});

export const BlogLikeSelectState = atom<string>({
  key: "BlogLikeSelectState",
  default: "블로그",
});
