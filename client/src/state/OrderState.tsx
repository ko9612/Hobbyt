import { atom } from "recoil";
import { OrderDataProps } from "../type/OrderType";

// 제품 주문 시, 주문 정보 state
export const OrderState = atom<OrderDataProps>({
  key: "OrderState",
  default: {
    saleId: 0,
    depositor: "",
    recipient: {
      address: {
        zipcode: "",
        street: "",
        detail: "",
      },
      name: "",
      phoneNumber: "",
    },
    refundAccount: {
      holder: "",
      bank: "",
      number: "",
    },
    checkPrivacyPolicy: false,
    products: [
      {
        id: 0,
        count: 0,
      },
    ],
  },
});

// 주문 상세 정보 state
export const OrderDetailState = atom({
  key: "OrderDetailState",
  default: {
    orderNumber: "",
    createdAt: "",
    title: "",
    status: "",
    thumbnailImage: "",
    depositor: "",
    sellerAccount: {
      holder: "",
      bank: "",
      number: "",
    },
    email: "",
    recipient: {
      name: "",
      phoneNumber: "",
      address: {
        zipcode: "",
        street: "",
        detail: "",
      },
    },
    refundAccount: {
      holder: "",
      bank: "",
      number: "",
    },
    products: [
      {
        name: "",
        price: 0,
        count: 0,
      },
    ],
    totalProductPrice: 0,
    deliveryPrice: 0,
    totalPrice: 0,
    isCanceled: false,
  },
});

// 주문 상세 조회 - 주문 상태
export const OrderStatus = atom<string>({
  key: "OrderStatus",
  default: "",
});
