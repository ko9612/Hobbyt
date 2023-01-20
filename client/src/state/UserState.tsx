import { atom } from "recoil";
import { recoilPersist } from "recoil-persist"; // 새로고침 or 페이지를 닫을 때도 상태관리를 유지하기 위해 사용하는 라이브러리

const { persistAtom } = recoilPersist();

// 로그인 여부
export const LoginState = atom<boolean | null>({
  key: "LoginState",
  default: false,
});

// 로그인한 사용자 이메일
export const EmailState = atom<string | undefined>({
  key: "EmailState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 로그인한 사용자 password
export const PasswordState = atom<string | undefined>({
  key: "PasswordState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 로그인한 사용자 아이디 (number type)
export const UserIdState = atom<number | undefined>({
  key: "userIdState",
  default: 0,
  // effects_UNSTABLE: [persistAtom],
});
