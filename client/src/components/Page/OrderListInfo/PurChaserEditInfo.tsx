import { useRecoilValue } from "recoil";
import { OrderDetailState } from "../../../state/OrderState";
import { OLISection, OLITitle, OLIItem, ItemTitle } from "./SellerInfo";

export default function PurchaserEditInfo() {
  const orderData = useRecoilValue(OrderDetailState);
  return (
    <OLISection>
      <OLITitle>기본 정보</OLITitle>
      {orderData && (
        <>
          <OLIItem>
            <ItemTitle>주문자명</ItemTitle>
            <div>{orderData.recipient.name}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>주문자 연락처</ItemTitle>
            <div>{orderData.recipient.phoneNumber}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>이메일</ItemTitle>
            <div>{orderData.email}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>주소</ItemTitle>
            <div>
              {orderData.recipient.address.zipcode}
              {orderData.recipient.address.street}
              {orderData.recipient.address.detail}
            </div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>환불은행</ItemTitle>
            <div>{orderData.refundAccount.bank}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>환불계좌</ItemTitle>
            <div>{orderData.refundAccount.number}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>환불예금주</ItemTitle>
            <div>{orderData.refundAccount.holder}</div>
          </OLIItem>
        </>
      )}
    </OLISection>
  );
}
