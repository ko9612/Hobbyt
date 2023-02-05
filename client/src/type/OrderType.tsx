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
  