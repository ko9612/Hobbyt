import tw from "tailwind-styled-components";

export const OLISection = tw.section`
border-t-2 py-10
`;

export const OLITitle = tw.ul`
font-semibold text-xl
`;

export const OLIItem = tw.li`
flex pt-4 w-[30rem]
`;

export const ItemTitle = tw.div`
w-[10rem]
`;

export default function SellerInfo() {
  return (
    <OLISection>
      <OLITitle>입금처 정보</OLITitle>
      <OLIItem>
        <ItemTitle>주문번호</ItemTitle>
        <div>153234-23452</div>
      </OLIItem>
      <OLIItem>
        <ItemTitle>입금금액</ItemTitle>
        <div>34,500 원</div>
      </OLIItem>
      <OLIItem>
        <ItemTitle>판매자 은행</ItemTitle>
        <div>하나은행</div>
      </OLIItem>
      <OLIItem>
        <ItemTitle>판매자 계좌</ItemTitle>
        <div>XXXX-XXXX-XXXX-XX</div>
      </OLIItem>
      <OLIItem>
        <ItemTitle>예금주</ItemTitle>
        <div>몽블랑</div>
      </OLIItem>
    </OLISection>
  );
}
