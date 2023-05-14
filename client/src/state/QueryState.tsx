import { atom } from "recoil";

export const QueryState = atom<string[] | undefined>({
  key: "QueryState",
  default: [],
});

// 임시
export const queryState = atom<string | undefined>({
  key: "QueryState",
  default: "",
});
