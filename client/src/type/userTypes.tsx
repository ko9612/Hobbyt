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
export interface SignupInputs extends PostSignupInputs {
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

// 금주의 블로거 데이터 타입
export interface BestBloggerProps {
  bloggerId: number;
  nickname: string;
  profileImage: string | null;
}

// 판매작품 리스트 데이터 타입
export interface ProductListType {
  data: ProductType[];
  pageInfo: PageInfoType[];
}
// 판매작품 데이터 타입
export interface ProductType {
  saleId: number;
  sellerId: number;
  productName: string;
  period: {
    startedAt: string;
    endAt: string;
  };
  isDeleted: boolean;
  isAlwaysOnSale: boolean;
  createdAt: string;
  salesVolume: number;
}

// 페이지네이션 데이터 타입
export interface PageInfoType {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// 구매작품 리스트 데이터 타입
export interface PurchaseListType {
  data: PurchaseType[];
  pageInfo: PageInfoType[];
}

// 구매작품 데이터 타입
export interface PurchaseType {
  createdAt: string;
  nickname: string;
  orderId: number;
  sellerId: number;
  status: string;
  title: string;
}

// 판매관리 리스트 데이터 타입
export interface SaleManagementListType {
  data: SaleManagememtType[];
  pageInfo: PageInfoType[];
}

// 판매관리 데이터 타입
export interface SaleManagememtType {
  createdAt: string;
  isCanceled: boolean;
  nickname: string;
  orderId: number;
  orderNumber: string;
  sellerId: number;
  status: string;
  title: string;
}
