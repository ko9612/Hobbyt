// 주문 제품 리스트
export interface SelectPdList {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
  quantity: number;
  image: string;
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

export interface OrderDetailProps {
  comsumerId: number;
  orderNumber: string;
  title: string;
  status: string;
  thumbnailImage: string | null;
  payMethod: string;
  sellerId: number;
  saleId: number;
  depositor: string;
  sellerAccount: {
    holder: string;
    bank: string;
    number: string;
  };
  name: string;
  phoneNumber: string;
  email: string;
  recipient: {
    name: string;
    phoneNumber: string;
    address: {
      zipcode: string;
      street: string;
      detail: string;
    };
  };
  refundAccount: {
    holder: string;
    bank: string;
    number: string;
  };
  products: {
    name: string;
    price: number;
    count: number;
  }[];
  totalProductPrice: number;
  deliveryPrice: number;
  totalPrice: number;
  createdAt: string;
  isCanceled: boolean;
}
