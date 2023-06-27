import tw from "tailwind-styled-components";
import { VscChromeClose } from "react-icons/vsc";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import Head from "next/head";

import { ModalContainer, ModalBackdrop, ModalView } from "./MsgModal";
import CreateOrderNum from "../../util/OrederNumber";
import { OrderState } from "../../state/OrderState";
import { postOrder } from "../../api/orderApi";
import ScrollRoader from "../Scroll/ScrollRoader";
import {
  EmailState,
  UserIdState,
  UserRecipientDetailState,
  UserRecipientStreetState,
  UserRecipientZipCodeState,
} from "../../state/UserState";
import Payment from "../../util/Payment";
import { SaleDetailState, totalState } from "../../state/SaleState";

const ModalContent = tw.section`p-8 sm:p-14`;
const ModalTitle = tw.div`flex flex-col items-center text-center my-2`;
const PayContent = tw.div`py-5`;
const PayTitle = tw.h3`font-semibold border-b pb-2 border-gray-700`;
const PayButtonDiv = tw.div`flex justify-center mt-8`;
const PayButton = tw.button`bg-gray-200 w-[15rem] h-16 px-2 mx-2 sm:mx-auto rounded-full hover:bg-gray-300 focus:bg-gray-300 text-sm sm:text-base`;
const BankTFInfo = tw.ul`pt-5 text-sm sm:text-base`;
const InfoList = tw.li`flex`;

export interface PaymentModalProps {
  setOpenModal(state: boolean): void;
  seller: string;
  bank: string;
  number: string;
}

export default function PaymentModal({
  setOpenModal,
  seller,
  bank,
  number,
}: PaymentModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isBankTransfer, setIsBankTransfer] = useState(false);
  const [userId] = useRecoilState(UserIdState);
  const [, setIsZipcode] = useRecoilState(UserRecipientZipCodeState);
  const [, setIsStreet] = useRecoilState(UserRecipientStreetState);
  const [, setIsDetail] = useRecoilState(UserRecipientDetailState);

  // 결제창에 넘길 데이터
  const orderData = useRecoilValue(OrderState);
  const saleData = useRecoilValue(SaleDetailState);
  const emailData = useRecoilValue(EmailState);
  const priceSum = useRecoilValue(totalState);

  const paymentData = {
    name: saleData.title,
    amount: priceSum.total + Number(saleData.delivery.deliveryPrice),
    buyer_email: emailData,
    buyer_name: orderData.depositor,
    buyer_tel: orderData.recipient.phoneNumber,
    buyer_addr:
      orderData.recipient.address.street + orderData.recipient.address.detail,
    buyer_postcode: orderData.recipient.address.zipcode,
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // 계좌이체 주문
  const orderCompleteClick = async () => {
    const OrderDataInfo = {
      orderNumber: CreateOrderNum(),
      saleId: orderData.saleId,
      depositor: orderData.depositor,
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
        holder: orderData.refundAccount.holder,
        bank: orderData.refundAccount.bank,
        number: orderData.refundAccount.number,
      },
      checkPrivacyPolicy: orderData.checkPrivacyPolicy,
      payMethod: "BANK_TRANSFER",
      products: orderData.products,
    };

    try {
      const PostOrderData = await postOrder(OrderDataInfo);
      setIsLoading(!isLoading);
      setIsZipcode("");
      setIsStreet("");
      setIsDetail("");
      setTimeout(() => {
        router.replace(
          `/mypage/${userId}/orderdetail/${(PostOrderData as any).data}`,
        );
      }, 500);
    } catch (err: unknown) {
      console.error(`err`, err);
    }
  };

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
          async
        />
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
          async
        />
      </Head>
      <ModalContainer>
        <ModalBackdrop onClick={handleClose}>
          <ModalView
            className="w-[45rem] relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute inline-flex top-3 right-3"
              onClick={handleClose}
            >
              <VscChromeClose size="2rem" />
            </button>
            {isLoading && (
              <div className="absolute z-50 flex items-center justify-center w-full h-full">
                <ScrollRoader />
              </div>
            )}
            <ModalContent>
              <ModalTitle>
                <h2 className="text-lg font-semibold sm:text-2xl">
                  결제를 진행해주세요
                </h2>
                <p className="py-2 text-sm">
                  이 페이지를 벗어날 시 주문이 취소됩니다.
                </p>
              </ModalTitle>
              <PayContent>
                <PayTitle>결제수단</PayTitle>
                <PayButtonDiv>
                  <PayButton
                    onClick={() => {
                      setIsBankTransfer(false);
                      Payment({
                        paymentData,
                        orderData,
                        userId,
                        isLoading,
                        setIsLoading,
                      });
                    }}
                  >
                    카드결제
                  </PayButton>
                  <PayButton
                    onClick={() => {
                      setIsBankTransfer(true);
                    }}
                  >
                    계좌이체
                  </PayButton>
                </PayButtonDiv>
              </PayContent>
              {isBankTransfer && (
                <PayContent>
                  <PayTitle>계좌이체</PayTitle>
                  <BankTFInfo>
                    <InfoList>
                      <div className="w-1/3">판매자명</div>
                      <div className="w-2/3 pl-2">{seller}</div>
                    </InfoList>
                    <InfoList>
                      <div className="w-1/3">은행명</div>
                      <div className="w-2/3 pl-2">{bank}</div>
                    </InfoList>
                    <InfoList>
                      <div className="w-1/3">계좌번호</div>
                      <div className="w-2/3 pl-2">{number}</div>
                    </InfoList>
                  </BankTFInfo>
                  <PayButtonDiv>
                    <PayButton onClick={orderCompleteClick}>
                      나중에 하기
                    </PayButton>
                    <PayButton
                      onClick={orderCompleteClick}
                      className="text-white bg-MainColor hover:bg-SubColor focus:bg-SubColor"
                    >
                      주문완료
                    </PayButton>
                  </PayButtonDiv>
                </PayContent>
              )}
            </ModalContent>
          </ModalView>
        </ModalBackdrop>
      </ModalContainer>
    </>
  );
}
