import { atom } from "recoil";
import { recoilPersist } from "recoil-persist"; // 새로고침 or 페이지를 닫을 때도 상태관리를 유지하기 위해 사용하는 라이브러리
import { MyInfoProps } from "../type/userTypes";

const { persistAtom } = recoilPersist();

// 로그인 여부
export const LoginState = atom<boolean | null>({
  key: "LoginState",
  default: false,
  // effects_UNSTABLE: [persistAtom], 있으면 hydration error 뜸
});

// 로그인한 사용자 이메일
export const EmailState = atom<string | undefined>({
  key: "EmailState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 로그인한 사용자 아이디 (number type)
export const UserIdState = atom<number>({
  key: "userIdState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

// 로그인한 사용자 닉네임
export const NicknameState = atom<string>({
  key: "NicknameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 로그인한 사용자 프로필 이미지
export const UserProfileState = atom<any>({
  key: "UserProfileState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 사용자 휴대폰번호
export const UserPhoneNumState = atom<MyInfoProps["phoneNumber"]>({
  key: "UserPhoneNumState",
  default: "",
});

// 사용자 배송지
// 사용자 배송지-수령인명
export const UserRecipientNameState = atom<MyInfoProps["recipient"]["name"]>({
  key: "UserRecipientNameState",
  default: "",
});

// 사용자 배송지-연락처
export const UserRecipientPhoneState = atom<
  MyInfoProps["recipient"]["phoneNumber"]
>({
  key: "UserRecipientPhoneState",
  default: "",
});

// 사용자 배송지-주소-우편번호
export const UserRecipientZipCodeState = atom<
  MyInfoProps["recipient"]["address"]["zipcode"]
>({
  key: "UserRecipientZipCodeState",
  default: "",
});

// 사용자 배송지-주소-street
export const UserRecipientStreetState = atom<
  MyInfoProps["recipient"]["address"]["street"]
>({
  key: "UserRecipientStreetState",
  default: "",
});

// 사용자 배송지-주소-detail
export const UserRecipientDetailState = atom<
  MyInfoProps["recipient"]["address"]["detail"]
>({
  key: "UserRecipientDetailState",
  default: "",
});

// 사용자 환불정보-예금주
export const UserRefundHolderState = atom<MyInfoProps["account"]["holder"]>({
  key: "UserRefundHolderState",
  default: "",
});

// 사용자 환불정보-은행명
export const UserRefundBankState = atom<MyInfoProps["account"]["bank"]>({
  key: "UserRefundBankState",
  default: "",
});

// 사용자 환불정보-계좌번호
export const UserRefundNumState = atom<MyInfoProps["account"]["number"]>({
  key: "UserRefundNumState",
  default: "",
});
