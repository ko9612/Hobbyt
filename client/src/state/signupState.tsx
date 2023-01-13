import { atom } from "recoil";

export const signUpName = atom<string | undefined>({
  key: "signUpName",
  default: "",
});

export const signUpEmail = atom<string>({
  key: "signUpEmail",
  default: "",
});

export const signUpPW = atom<string | undefined>({
  key: "signUpPW",
  default: "",
});
