import tw from "tailwind-styled-components";
import { ComponentProps } from "react";
import { useRecoilState } from "recoil";
import { OrderAgreeState } from "../../../state/SaleState";

const AgMSection = tw.section`
py-2
`;

export default function Agreement() {
  const [, setIsAgree] = useRecoilState(OrderAgreeState);

  // 약관동의 체크박스 핸들러
  const checkAgreeHandler: ComponentProps<"input">["onClick"] = e => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      setIsAgree(true);
    } else {
      setIsAgree(false);
    }
  };

  return (
    <AgMSection>
      <div className="font-semibold pb-2">개인정보 수집 및 동의</div>
      <div className="p-2 bg-gray-200 rounded-lg text-sm">
        상품 주문 및 배송을 위해 위에 입력된 개인정보를 수집합니다. 수집한
        개인정보는 주문과 배송이외의 목적으로는 사용하지 않습니다. 개인정보의
        수집 및 이용에 대한 동의를 거부할 수 있으나, 상품 주문이 어려울 수
        있습니다.
      </div>
      <div className="text-center py-2">
        <input
          type="checkbox"
          className="mr-2"
          onClick={e => checkAgreeHandler(e)}
        />
        동의합니다
      </div>
    </AgMSection>
  );
}
