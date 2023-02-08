import tw from "tailwind-styled-components";
import { IDataProps } from "./OrderProgress";

export const OLISection = tw.section`
border-t-2 py-10
`;

export const OLITitle = tw.ul`
font-semibold text-xl
`;

export const OLIItem = tw.li`
flex pt-4 w-[35rem]
`;

export const ItemTitle = tw.div`
w-[10rem]
`;

export default function SellerInfo({ isData }: IDataProps) {
  return (
    <OLISection>
      <OLITitle>입금처 정보</OLITitle>
      {isData && (
        <>
          <OLIItem>
            <ItemTitle>주문번호</ItemTitle>
            <div>{isData.orderNumber}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>입금금액</ItemTitle>
            <div>{isData.totalPrice} 원</div>
          </OLIItem>
          {isData.sellerAccount && (
            <>
              <OLIItem>
                <ItemTitle>판매자 은행</ItemTitle>
                <div>{isData.sellerAccount.bank}</div>
              </OLIItem>
              <OLIItem>
                <ItemTitle>판매자 계좌</ItemTitle>
                <div>{isData.sellerAccount.number}</div>
              </OLIItem>
              <OLIItem>
                <ItemTitle>예금주</ItemTitle>
                <div>{isData.sellerAccount.holder}</div>
              </OLIItem>
            </>
          )}
        </>
      )}
    </OLISection>
  );
}
