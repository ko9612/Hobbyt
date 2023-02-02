import { atom, selector } from "recoil";
import { ProductList, SaleDetailProps, SelectPdList } from "../type/saleType";

// 판매 작성- 제품 리스트
export const SaleProductList = atom<ProductList[]>({
  key: "SaleProductList",
  default: [],
});

// 판매 작성- 제품 이미지 리스트
export const SalePdImgsList = atom<any>({
  key: "SalePdImgsList",
  default: [],
});

// 판매 상세 조회 - 약관동의 check
export const OrderAgreeState = atom<boolean>({
  key: "OrderAgreeState",
  default: false,
});

// 판매 상세 조회 - 주문 제품 리스트
export const SelectdPdList = atom<SelectPdList[]>({
  key: "SelectdPdList",
  default: [],
});

// 판매 상세 조회 - 구매 총액
export const totalState = selector({
  key: "totalsState",
  get: ({ get }) => {
    const pdList = get(SelectdPdList);
    const total = pdList.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    return {
      total,
    };
  },
});

// 판매 상세 조회 state
export const SaleDetailState = atom<SaleDetailProps>({
  key: "SaleDetailState",
  default: {
    id: 0,
    title: "",
    content: "",
    refundExchangePolicy: "",
    productionProcessLink: "",
    caution: "",
    period: {
      startedAt: "",
      endAt: "",
    },
    account: {
      holder: "",
      bank: "",
      number: "",
    },
    delivery: {
      deliveryTime: "",
      deliveryCompany: "",
      deliveryPrice: "",
    },
    depositEffectiveTime: 0,
    viewCount: 0,
    likeCount: 0,
    createdAt: "",
    products: [
      {
        id: 0,
        name: "",
        imageUrl: "",
        price: 0,
        stockQuantity: 0,
      },
    ],
    tags: [],
    writer: {
      id: 0,
      email: "",
      nickName: "",
      headerImage: null,
      profileImage: null,
      signedUpAt: "",
      followings: 0,
      followers: 0,
    },
    isAlwaysOnSale: false,
    isDeleted: false,
  },
});
