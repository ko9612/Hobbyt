import { useRecoilValue } from "recoil";
import { OrderDetailState } from "../../../state/OrderState";
import { OLISection, OLITitle, OLIItem, ItemTitle } from "./SellerInfo";

export default function OrderInfo() {
  const orderData = useRecoilValue(OrderDetailState);
  return (
    <OLISection>
      <OLITitle>주문 정보</OLITitle>
      {orderData && (
        <>
          <div className="w-[30rem] bg-gray-100 p-4 mt-4">
            {orderData.products
              .filter(el => el.count !== 0)
              .map((el, idx) => (
                <OLIItem className="pt-0 w-[28rem] items-center" key={idx}>
                  <ItemTitle className="pr-10 w-[14rem]">{el.name}</ItemTitle>
                  <div>
                    {el.price} 원 / {el.count} 개
                  </div>
                </OLIItem>
              ))}
          </div>
          <OLIItem>
            <ItemTitle>상품 총 금액</ItemTitle>
            <div>{orderData.totalProductPrice} 원</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>배송비</ItemTitle>
            <div>{orderData.deliveryPrice} 원</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>주문시간</ItemTitle>
            <div>{orderData.createdAt.slice(0, 19).replace("T", " ")}</div>
          </OLIItem>
        </>
      )}
    </OLISection>
  );
}
