import tw from "tailwind-styled-components";
import { VscChromeClose } from "react-icons/vsc";
import { useState } from "react";
import { ModalContainer, ModalBackdrop, ModalView } from "./MsgModal";

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
  const [isBankTransfer, setIsBankTransfer] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
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
                <PayButton>카드결제</PayButton>
                <PayButton
                  onClick={() => {
                    setIsBankTransfer(!isBankTransfer);
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
                  <PayButton>나중에 하기</PayButton>
                  <PayButton className="bg-MainColor hover:bg-SubColor focus:bg-SubColor text-white">
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
