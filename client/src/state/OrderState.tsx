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
    depositor: "",
    sellerAccount: {
      holder: "",
      bank: "",
      number: "",
    },
    nickname: "",
    phoneNumber: null,
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
  },
});
