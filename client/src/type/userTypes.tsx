// 로그인 데이터 타입
export interface SigninInputs {
  email: string;
  password: string;
}

// 회원가입 데이터 타입
export interface SignupInputs {
  nickname: string;
  email: string;
  emailCheck: string;
  password: string;
  passwordCheck: string;
}

// 내 정보 관리 데이터 타입
export interface MyInfoProps {
  phoneNumber: number;
  recipient: {
    name: string;
    phoneNumber: number;
    address: {
      zipcode: number;
      street: string;
      detail: string;
    };
  };
  account: {
    holder: string;
    bank: string;
    number: number;
  };
}

// 내 정보 관리 비밀번호 타입
export interface PasswordProps {
  oldPassword: string;
  newPassword: string;
  checkPassword: string;
}
