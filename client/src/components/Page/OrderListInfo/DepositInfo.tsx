import { useRecoilValue } from "recoil";
import { OrderDetailState } from "../../../state/OrderState";
import { OLISection, OLITitle, OLIItem, ItemTitle } from "./SellerInfo";

export default function DepositInfo() {
  const orderData = useRecoilValue(OrderDetailState);
  return (
    <OLISection>
      <OLITitle>입금 정보</OLITitle>
      {orderData && (
        <>
          <OLIItem>
            <ItemTitle>입금자명</ItemTitle>
            <div>{orderData.depositor}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>입금액</ItemTitle>
            <div>{orderData.totalPrice} 원</div>
          </OLIItem>
        </>
      )}
    </OLISection>
  );
}
