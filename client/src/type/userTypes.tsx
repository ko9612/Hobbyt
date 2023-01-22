// 로그인 데이터 타입
export interface SigninInputs {
  email: string;
  password: string;
}

// 회원가입 시 전송되는 데이터들의 타입
export interface PostSignupInputs {
  nickname: string;
  email: string;
  password: string;
}

// 회원가입 데이터 타입
export interface SignupInputs extends PostSignupInputs{
  emailCheck: string;
  passwordCheck: string;
}

// 내 정보 관리 데이터 타입
export interface MyInfoProps {
  phoneNumber: string;
  recipient: {
    address: {
      zipcode: string;
      street: string;
      detail: string;
    };
    name: string;
    phoneNumber: string;
  };
  account: {
    holder: string;
    bank: string;
    number: string;
  };
}

// 내 정보 관리 비밀번호 타입
export interface PasswordProps {
  oldPassword: string;
  newPassword: string;
  checkPassword: string;
}
