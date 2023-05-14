import { IDataProps } from "./OrderProgress";
import { OLISection, OLITitle, OLIItem, ItemTitle } from "./SellerInfo";

export default function OrderInfo({ isData }: IDataProps) {
  return (
    <OLISection>
      <OLITitle>주문 정보</OLITitle>
      {isData && isData.products && (
        <>
          <div className="max-w-[30rem] bg-gray-100 p-4 mt-4">
            {isData.products
              .filter((el: any) => el.count !== 0)
              .map((el: any, idx: number) => (
                <OLIItem className="pt-0 max-w-[28rem] items-center" key={idx}>
                  <ItemTitle>{el.name}</ItemTitle>
                  <div>
                    {el.price} 원 / {el.count} 개
                  </div>
                </OLIItem>
              ))}
          </div>
          <OLIItem>
            <ItemTitle>상품 총 금액</ItemTitle>
            <div className="w-2/3">{isData.totalProductPrice} 원</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>배송비</ItemTitle>
            <div className="w-2/3">{isData.deliveryPrice} 원</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>주문시간</ItemTitle>
            <div className="w-2/3">
              {isData.createdAt.slice(0, 19).replace("T", " ")}
            </div>
          </OLIItem>
        </>
      )}
    </OLISection>
  );
}
