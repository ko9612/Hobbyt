import tw from "tailwind-styled-components";
import { ComponentProps, useState } from "react";
import { Input } from "../UserInfo/InfoStyle";
import { DButton } from "../../Button/DefalutButton";

const PurSection = tw.section`
    
`;

export const PurContent = tw.div`
py-2
`;

const PurContentInput = tw.div`
py-2 flex items-center flex-wrap
`;

const PurInputDiv = tw.div`
w-1/2
`;

interface PriceSumProps {
  priceSum: number;
}

const phoneNumRegex = /^[-?\d+]{0,11}$/;
const accountNumRegex = /^[-?\d+]{0,14}$/;

export default function InputForPurchase({ priceSum }: PriceSumProps) {
  const [isPurchaserPhone, setisPurchaserPhone] = useState("");
  const [isReceiverPhone, setIsReceiverPhone] = useState("");
  const [isRFAccountNum, setIsRFAccountNum] = useState("");

  const purchaserPhonelHandler: ComponentProps<"input">["onChange"] = e => {
    if (phoneNumRegex.test(e.target.value)) setisPurchaserPhone(e.target.value);
  };

  const receiverPhonelHandler: ComponentProps<"input">["onChange"] = e => {
    if (phoneNumRegex.test(e.target.value)) setIsReceiverPhone(e.target.value);
  };

  const RFAccountlHandler: ComponentProps<"input">["onChange"] = e => {
    if (accountNumRegex.test(e.target.value)) setIsRFAccountNum(e.target.value);
  };

  return (
    <PurSection>
      <PurContent>
        <ul className="font-semibold">배송</ul>
        <li className="p-2">
          우체국택배 <span className="font-semibold">+4000</span> 원
        </li>
      </PurContent>
      <PurContent>
        <ul className="font-semibold">입금시간</ul>
        <li className="p-2">
          주문완료 후 <span className="font-semibold">1</span> 시간 이내
        </li>
      </PurContent>
      <PurContent>
        <div className="font-semibold">입금자 정보</div>
        <PurContentInput>
          <PurInputDiv>
            <Input
              type="text"
              id="depositerName"
              placeholder="입금자명"
              maxLength={10}
            />
          </PurInputDiv>
          <PurInputDiv className="pl-4">
            <div className=" bg-slate-100 px-2 py-1 rounded-lg border border-slate-300">
              {priceSum + 4000} {/* +택배비 */}
            </div>
          </PurInputDiv>
        </PurContentInput>
      </PurContent>
      <PurContent>
        <div className="font-semibold">주문자 정보</div>
        <PurContentInput>
          <PurInputDiv>
            <Input
              type="text"
              id="purchaserName"
              placeholder="주문자명"
              maxLength={10}
            />
          </PurInputDiv>
          <PurInputDiv className="pl-4">
            <Input
              type="tel"
              id="purchaserTel"
              placeholder="'-'를 제외한 휴대폰 번호를 입력해주세요"
              value={isPurchaserPhone}
              maxLength={11}
              onChange={e => purchaserPhonelHandler(e)}
              required
            />
          </PurInputDiv>
          <PurInputDiv className="mt-2">
            <Input
              type="text"
              id="purchaserEmail"
              placeholder="주문자 이메일"
              maxLength={30}
            />
          </PurInputDiv>
        </PurContentInput>
      </PurContent>
      <PurContent>
        <div className="flex items-center">
          <div className="font-semibold">배송 정보</div>
          <p className="text-sm pl-4 pr-2">주문자 정보와 동일</p>
          <input type="checkbox" />
        </div>
        <PurContentInput>
          <PurInputDiv>
            <Input
              type="text"
              id="receiverName"
              placeholder="수령자명"
              maxLength={10}
            />
          </PurInputDiv>
          <PurInputDiv className="pl-4">
            <Input
              type="tel"
              id="purchaserTel"
              placeholder="'-'를 제외한 휴대폰 번호를 입력해주세요"
              value={isReceiverPhone}
              maxLength={11}
              onChange={e => receiverPhonelHandler(e)}
              required
            />
          </PurInputDiv>
          <PurInputDiv className="pt-2 flex">
            <Input
              type="text"
              id="zipCode"
              maxLength={5}
              placeholder="우편번호"
            />
            <div className="pl-2">
              <DButton className="py-1" onClick={() => {}}>
                우편번호 찾기
              </DButton>
            </div>
          </PurInputDiv>
          <PurInputDiv className="w-full py-2">
            <Input
              type="text"
              id="address1"
              maxLength={30}
              placeholder="주소"
            />
          </PurInputDiv>
          <PurInputDiv className="w-full">
            <Input
              type="text"
              id="address2"
              maxLength={30}
              placeholder="상세주소"
            />
          </PurInputDiv>
        </PurContentInput>
      </PurContent>
      <PurContent>
        <div className="font-semibold">환불계좌 정보</div>
        <PurContentInput>
          <PurInputDiv className="w-1/5">
            <Input
              type="text"
              id="holderName"
              maxLength={10}
              placeholder="예금주"
            />
          </PurInputDiv>
          <PurInputDiv className="w-1/5 px-4">
            <Input
              type="text"
              id="bankName"
              placeholder="은행명"
              maxLength={10}
            />
          </PurInputDiv>
          <PurInputDiv className="w-3/5">
            <Input
              type="text"
              id="accountNumber"
              maxLength={14}
              placeholder="'-'를 제외한 계좌번호를 입력해주세요"
              value={isRFAccountNum}
              onChange={e => RFAccountlHandler(e)}
            />
          </PurInputDiv>
        </PurContentInput>
      </PurContent>
    </PurSection>
  );
}
