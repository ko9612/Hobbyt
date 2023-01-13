import { OLISection, OLITitle, OLIItem, ItemTitle } from "./SellerInfo";

export default function PurchaserInfo() {
  return (
    <OLISection>
      <OLITitle>기본 정보</OLITitle>
      <OLIItem>
        <ItemTitle>주문자명</ItemTitle>
        <div>가나다</div>
      </OLIItem>
      <OLIItem>
        <ItemTitle>주문자 연락처</ItemTitle>
        <div>010-XXXX-XXXX</div>
      </OLIItem>
      <OLIItem>
        <ItemTitle>이메일</ItemTitle>
        <div>email@naver.com</div>
      </OLIItem>
      <OLIItem>
        <ItemTitle>주소</ItemTitle>
        <div>서울특별시 어쩌구 저쩌구 살랴살랴</div>
      </OLIItem>
      <OLIItem>
        <ItemTitle>환불은행</ItemTitle>
        <div>농협은행</div>
      </OLIItem>
      <OLIItem>
        <ItemTitle>환불계좌</ItemTitle>
        <div>XXXX-XXXX-XXXX-XX</div>
      </OLIItem>
      <OLIItem>
        <ItemTitle>환불예금주</ItemTitle>
        <div>가나다</div>
      </OLIItem>
    </OLISection>
  );
}
