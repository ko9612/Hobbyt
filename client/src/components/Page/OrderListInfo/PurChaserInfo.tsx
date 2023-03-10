import { IDataProps } from "./OrderProgress";
import { OLISection, OLITitle, OLIItem, ItemTitle } from "./SellerInfo";

export default function PurchaserInfo({ isData }: IDataProps) {
  return (
    <OLISection>
      <OLITitle>배송{isData?.payMethod !== "CARD" && "/환불"} 정보</OLITitle>
      {isData && isData.recipient && isData.refundAccount && (
        <>
          <OLIItem>
            <ItemTitle>주문자명</ItemTitle>
            <div>{isData.recipient.name}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>주문자 연락처</ItemTitle>
            <div>{isData.recipient.phoneNumber}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>이메일</ItemTitle>
            <div>{isData.email}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>주소</ItemTitle>
            <div>
              <div>{isData.recipient.address.zipcode}</div>
              <div>{isData.recipient.address.street}</div>
              <div>{isData.recipient.address.detail}</div>
            </div>
          </OLIItem>
          {isData.payMethod !== "CARD" && (
            <>
              <OLIItem>
                <ItemTitle>환불은행</ItemTitle>
                <div>{isData.refundAccount.bank}</div>
              </OLIItem>
              <OLIItem>
                <ItemTitle>환불계좌</ItemTitle>
                <div>{isData.refundAccount.number}</div>
              </OLIItem>
              <OLIItem>
                <ItemTitle>환불예금주</ItemTitle>
                <div>{isData.refundAccount.holder}</div>
              </OLIItem>
            </>
          )}
        </>
      )}
    </OLISection>
  );
}
