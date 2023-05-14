import { IDataProps } from "./OrderProgress";
import { OLISection, OLITitle, OLIItem, ItemTitle } from "./SellerInfo";

export default function DepositInfo({ isData }: IDataProps) {
  return (
    <OLISection>
      <OLITitle>입금 정보</OLITitle>
      {isData && (
        <>
          <OLIItem>
            <ItemTitle>입금자명</ItemTitle>
            <div>{isData.depositor}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>입금액</ItemTitle>
            <div>{isData.totalPrice} 원</div>
          </OLIItem>
        </>
      )}
    </OLISection>
  );
}
