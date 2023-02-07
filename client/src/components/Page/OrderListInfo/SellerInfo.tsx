import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";
import { OrderDetailState } from "../../../state/OrderState";

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

export default function SellerInfo() {
  const orderData = useRecoilValue(OrderDetailState);
  return (
    <OLISection>
      <OLITitle>입금처 정보</OLITitle>
      {orderData && (
        <>
          <OLIItem>
            <ItemTitle>주문번호</ItemTitle>
            <div>{orderData.orderNumber}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>입금금액</ItemTitle>
            <div>{orderData.totalPrice} 원</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>판매자 은행</ItemTitle>
            <div>{orderData.sellerAccount.bank}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>판매자 계좌</ItemTitle>
            <div>{orderData.sellerAccount.number}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>예금주</ItemTitle>
            <div>{orderData.sellerAccount.holder}</div>
          </OLIItem>
        </>
      )}
    </OLISection>
  );
}
