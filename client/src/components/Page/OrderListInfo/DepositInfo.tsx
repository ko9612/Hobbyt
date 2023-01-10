import { OLISection, OLITitle, OLIItem, ItemTitle } from "./SellerInfo";

export default function DepositInfo() {
  return (
    <OLISection>
      <OLITitle>입금 정보</OLITitle>
      <OLIItem>
        <ItemTitle>입금자명</ItemTitle>
        <div>가나다</div>
      </OLIItem>
      <OLIItem>
        <ItemTitle>입금액</ItemTitle>
        <div>34,500 원</div>
      </OLIItem>
    </OLISection>
  );
}
