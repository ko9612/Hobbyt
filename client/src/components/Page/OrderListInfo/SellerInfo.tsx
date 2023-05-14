import tw from "tailwind-styled-components";
import { IDataProps } from "./OrderProgress";

export const OLISection = tw.section`
border-t-2 py-10
`;

export const OLITitle = tw.ul`
font-semibold text-lg sm:text-xl
`;

export const OLIItem = tw.li`
flex pt-4 max-w-[35rem] text-base
`;

export const ItemTitle = tw.div`
w-1/3 mr-3
`;

export default function SellerInfo({ isData }: IDataProps) {
  return (
    <OLISection>
      <OLITitle>
        {isData?.payMethod !== "CARD" ? "입금처" : "결제"} 정보
      </OLITitle>
      {isData && (
        <>
          <OLIItem>
            <ItemTitle>주문번호</ItemTitle>
            <div className="w-2/3">{isData.orderNumber}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>
              {isData?.payMethod !== "CARD" ? "입금" : "결제"}금액
            </ItemTitle>
            <div className="w-2/3">{isData.totalPrice} 원</div>
          </OLIItem>
          {isData.sellerAccount && isData.payMethod !== "CARD" && (
            <>
              <OLIItem>
                <ItemTitle>판매자 은행</ItemTitle>
                <div className="w-2/3">{isData.sellerAccount.bank}</div>
              </OLIItem>
              <OLIItem>
                <ItemTitle>판매자 계좌</ItemTitle>
                <div className="w-2/3">{isData.sellerAccount.number}</div>
              </OLIItem>
            </>
          )}
          <OLIItem>
            <ItemTitle>판매자</ItemTitle>
            <div className="w-2/3">{isData.sellerAccount.holder}</div>
          </OLIItem>
        </>
      )}
    </OLISection>
  );
}
