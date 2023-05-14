import { postPayment } from "../api/orderApi";
import ScrollRoader from "../components/Scroll/ScrollRoader";
import { OrderDataProps } from "../type/OrderType";
import CreateOrderNum from "./OrederNumber";

declare global {
  interface Window {
    IMP: any;
  }
}

interface PaymentProps {
  paymentData: {
    name: string;
    amount: number;
    buyer_email: string | undefined;
    buyer_name: string;
    buyer_tel: string;
    buyer_addr: string;
    buyer_postcode: string;
  };
  orderData: OrderDataProps;
  userId: number;
  isLoading: boolean;
  setIsLoading(state: boolean): void;
}

export default function Payment({
  paymentData,
  orderData,
  userId,
  isLoading,
  setIsLoading,
}: PaymentProps) {
  const onClickPayment = () => {
    const { IMP } = window;
    // IMP.init(process.env.NEXT_PUBLIC_IMP_CODE);
    IMP.init("imp47003037");

    const data = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: CreateOrderNum(),
      name: paymentData.name,
      amount: paymentData.amount,
      buyer_email: paymentData.buyer_email,
      buyer_name: paymentData.buyer_name,
      buyer_tel: paymentData.buyer_tel,
      buyer_addr: paymentData.buyer_addr,
      buyer_postcode: paymentData.buyer_postcode,
    };

    IMP.request_pay(data, callback);
  };

  const callback = async (response: any) => {
    const { success, error_msg, imp_uid, merchant_uid } = response;

    if (success) {
      const OrderDataInfo = {
        impUid: imp_uid,
        orderInfo: {
          orderNumber: merchant_uid,
          saleId: orderData.saleId,
          depositor: null,
          recipient: {
            address: {
              zipcode: orderData.recipient.address.zipcode,
              street: orderData.recipient.address.street,
              detail: orderData.recipient.address.detail,
            },
            name: orderData.recipient.name,
            phoneNumber: orderData.recipient.phoneNumber,
          },
          refundAccount: {
            holder: null,
            bank: null,
            number: null,
          },
          checkPrivacyPolicy: orderData.checkPrivacyPolicy,
          payMethod: "CARD",
          products: orderData.products,
        },
      };

      const PostOrderData = await postPayment(OrderDataInfo);
      if ((PostOrderData as any).status === 200) {
        setIsLoading(true);
        setTimeout(() => {
          window.location.replace(
            `/mypage/${userId}/orderdetail/${(PostOrderData as any).data}`,
          );
        }, 500);
      } else {
        alert(`결제 실패: ${error_msg}`);
      }
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  return (
    <>
      {isLoading && <ScrollRoader />}
      {onClickPayment()};
    </>
  );
}
