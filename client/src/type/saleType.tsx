// products list 데이터 타입
export interface ProductList {
  name: string;
  price: number | undefined | string;
  stockQuantity: number | undefined | string;
}

export interface ProductImg {
  img: string | undefined;
}

// 판매글 작성 데이터 타입
export interface SaleWriteProps {
  title: string;
  content: string;
  depositEffectiveTime: number;
  delivery: {
    deliveryTime: number;
    deliveryCompany: string;
    deliveryPrice: number;
  };
  caution: string;
  productionProcessLink: string;
  tags: string[];
  account: { holder: string; bank: string; number: string };
  period: {
    startedAt: string | null;
    endAt: string | null;
  };
  refundExchangePolicy: string;
  isAlwaysOnSale: boolean;
  products: ProductList[];
}

// 판매글 상세 조회 데이터 타입
export interface SaleDetailProps {
  id: number;
  title: string;
  content: string;
  refundExchangePolicy: string;
  productionProcessLink: string;
  caution: string;
  period: {
    startedAt: string | null;
    endAt: string | null;
  };
  account: {
    holder: string;
    bank: string;
    number: string;
  };
  delivery: {
    deliveryTime: string;
    deliveryCompany: string;
    deliveryPrice: string;
  };
  depositEffectiveTime: number;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  products: [
    {
      id: number;
      name: string;
      imageUrl: string;
      price: number;
      stockQuantity: number;
    },
  ];
  tags: string[];
  writer: {
    id: number;
    email: string;
    nickName: string;
    headerImage: null | string;
    profileImage: null | string;
    signedUpAt: string;
    followings: number;
    followers: number;
  };
  isAlwaysOnSale: boolean;
  isDeleted: boolean;
}

// 주문 제품 리스트
export interface SelectPdList {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
  quantity: number;
}

// 주문 정보 입력
export interface OrderInputProps {
  holder: string;
  orderer: {
    name: string;
    phoneNumber: string;
    email: string | undefined;
  };
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

// 검색 - 판매글 리스트 데이터 타입 & 금주의 작품 데이터 타입
export interface SaleItemProps {
  id: number;
  thumbnailImage: string | null;
  title: string;
  period: {
    startedAt: string;
    endAt: string;
  };
  likeCount: number;
  writerId: number;
  profileImage: string | null;
  nickname: string;
  isAlwaysOnSale: boolean;
}

export interface SearchSaleDataProps {
  hasNext: boolean;
  sales: SaleItemProps[];
}

// 제품 주문 정보 데이터 타입
export interface OrderDataProps {
  // orderNumber: string;
  saleId: number;
  depositor: string;
  recipient: {
    address: {
      zipcode: string;
      street: string;
      detail: string;
    };
    name: string;
    phoneNumber: string;
  };
  refundAccount: {
    holder: string;
    bank: string;
    number: string;
  };
  checkPrivacyPolicy: boolean;
  // payMethod: string;
  products: {
    id: number;
    count: number;
  }[];
}
