import { atom } from "recoil";
import { CommentType } from "../type/blogType";

export const TitleState = atom<string | undefined>({
  key: "BlogTitleState",
  default: "",
});

export const ThumbnailState = atom<string | Blob | StaticImport>({
  key: "ThumbnailState",
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

export const BlogEditState = atom<CommentType | undefined>({
  key: "BlogEditListState",
  default: undefined,
});

export const BlogSelectState = atom<string>({
  key: "BlogSelectState",
  default: "최신순",
});
