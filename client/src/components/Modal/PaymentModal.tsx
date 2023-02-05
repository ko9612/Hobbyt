import tw from "tailwind-styled-components";
import { VscChromeClose } from "react-icons/vsc";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { ModalContainer, ModalBackdrop, ModalView } from "./MsgModal";
import CreateOrderNum from "../../util/OrederNumber";
import { OrderState } from "../../state/OrderState";
import { postOrder } from "../../api/OrderApi";
import ScrollRoader from "../Scroll/ScrollRoader";
import {
  UserIdState,
  UserRecipientDetailState,
  UserRecipientStreetState,
  UserRecipientZipCodeState,
} from "../../state/UserState";

const ModalContent = tw.section`
p-14
`;

const ModalTitle = tw.div`
flex flex-col items-center text-center
`;

const PayContent = tw.div`
  py-5
`;

const PayTitle = tw.h3`
font-semibold border-b pb-2 border-gray-700
`;

const PayButtonDiv = tw.div`
flex justify-center mt-8
`;

const PayButton = tw.button`
bg-gray-200 w-[15rem] h-16 mx-auto rounded-full hover:bg-gray-300 focus:bg-gray-300
`;

const BankTFInfo = tw.ul`
pt-5
`;

const InfoList = tw.li`
  flex
`;

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
  const [orderData] = useRecoilState(OrderState);
  const [userId] = useRecoilState(UserIdState);
  const [, setIsZipcode] = useRecoilState(UserRecipientZipCodeState);
  const [, setIsStreet] = useRecoilState(UserRecipientStreetState);
  const [, setIsDetail] = useRecoilState(UserRecipientDetailState);

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
      checkPrivacyPolicy: orderData.checkPrivacyPolicy, //
      payMethod: "BANK_TRANSFER", // 카드결제 구현 시 수정
      products: orderData.products,
    };

    try {
      const PostOrderData = await postOrder(OrderDataInfo);
      setIsLoading(!isLoading);
      setIsZipcode("");
      setIsStreet("");
      setIsDetail("");
      setTimeout(() => {
        router.replace(`/orderdetail/${userId}/${(PostOrderData as any).data}`);
      }, 500);
    } catch (err: unknown) {
      console.log(`err`, err);
    }
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={handleClose}>
        <ModalView
          className="w-[45rem] relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 inline-flex"
            onClick={handleClose}
          >
            <VscChromeClose size="2rem" />
          </button>
          {isLoading && (
            <div className="h-full w-full absolute z-50 flex justify-center items-center">
              <ScrollRoader />
            </div>
          )}
          <ModalContent>
            <ModalTitle>
              <h2 className="text-2xl font-semibold">결제를 진행해주세요</h2>
              <p className="w-[25rem] py-2 text-sm">
                이 페이지를 벗어날 시 주문이 취소됩니다.
              </p>
            </ModalTitle>
            <PayContent>
              <PayTitle>결제수단</PayTitle>
              <PayButtonDiv>
                <PayButton
                  onClick={() => {
                    setIsBankTransfer(false);
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
                    <div className="w-[8rem]">판매자명</div>
                    <div className="w-[16rem]">{seller}</div>
                  </InfoList>
                  <InfoList>
                    <div className="w-[8rem]">은행명</div>
                    <div className="w-[16rem]">{bank}</div>
                  </InfoList>
                  <InfoList>
                    <div className="w-[8rem]">계좌번호</div>
                    <div className="w-[16rem]">{number}</div>
                  </InfoList>
                </BankTFInfo>
                <PayButtonDiv>
                  <PayButton onClick={orderCompleteClick}>
                    나중에 하기
                  </PayButton>
                  <PayButton
                    onClick={orderCompleteClick}
                    className="bg-MainColor hover:bg-SubColor focus:bg-SubColor text-white"
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
  );
}
