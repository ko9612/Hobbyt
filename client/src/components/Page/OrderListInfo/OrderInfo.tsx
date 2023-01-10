import { OLISection, OLITitle, OLIItem, ItemTitle } from "./SellerInfo";

export default function OrderInfo() {
  return (
    <OLISection>
      <OLITitle>주문 정보</OLITitle>
      <div className="w-[30rem] bg-gray-100 p-4 mt-4">
        {Array(3)
          .fill(null)
          .map(idx => (
            <OLIItem className="pt-0" key={idx}>
              <ItemTitle>제품명</ItemTitle>
              <div>11,500 원 / 1 개</div>
            </OLIItem>
          ))}
      </div>
      <OLIItem>
        <ItemTitle>상품 총 금액</ItemTitle>
        <div>34,500 원</div>
      </OLIItem>
      <OLIItem>
        <ItemTitle>배송비</ItemTitle>
        <div>4000 원</div>
      </OLIItem>
    </OLISection>
  );
}
