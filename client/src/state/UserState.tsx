import { atom } from "recoil";

export const LoginState = atom<boolean>({
  key: "LoginState",
  default: false,
});

export const TokenState = atom<string | undefined>({
  key: "TokenState",
  default: "",
});

export const EmailState = atom<string | undefined>({
  key: "EmailState",
  default: "",
});

export const PasswordState = atom<string | undefined>({
  key: "PasswordState",
  default: "",
});
