import tw from "tailwind-styled-components";
import { useState, ComponentProps } from "react";
import {
  PostWriteContent,
  PostWriteList,
  PostWriteLabel,
  Sign,
  PostInput,
  PostTextArea,
  SubLabel,
} from "./PostWriteStyle";
// import PostInput from "../Input/PostInput";

const ShippingInfo = tw.div`
mb-4 bg-slate-200 py-2 px-3 rounded-xl
`;

const ShippingFeeInfo = tw.div`
  flex items-center w-[30rem]
`;

const FeeRegex = /^-?\d+$/;

export default function ShippingInfoInput() {
  const [isFee, setIsFee] = useState("");
  const FeeHandler: ComponentProps<"input">["onChange"] = e => {
    if (FeeRegex.test(e.target.value)) setIsFee(e.target.value);
  };

  return (
    <PostWriteContent>
      <PostWriteList className="flex flex-col">
        <PostWriteLabel htmlFor="startDate" className="mb-2">
          배송정보 <Sign>&#42;</Sign>
        </PostWriteLabel>
        <ShippingInfo>
          <div className="flex items-center w-[16rem]">
            <SubLabel htmlFor="shippingTime" className="w-[10rem]">
              배송 평균 소요시간
            </SubLabel>
            <div className="w-[6rem] flex items-center">
              <PostInput
                type="number"
                id="shippingTime"
                min={1}
                max={999}
                defaultValue={1}
              />
              &nbsp;일
            </div>
          </div>
          <div>
            <SubLabel htmlFor="ShippingGuide">배송공지</SubLabel>
            <PostTextArea id="ShippingGuide" cols={50} rows={3} />
          </div>
          <ShippingFeeInfo>
            <Sign className="pr-2">&#42;</Sign>
            <SubLabel className="pr-2">
              <PostInput
                type="text"
                id="shippingCompany"
                maxLength={10}
                placeholder="배송사명"
              />
            </SubLabel>
            <SubLabel>
              <PostInput
                type="text"
                id="shippingFee"
                placeholder="배송비"
                value={isFee}
                defaultValue="0"
                onChange={e => FeeHandler(e)}
              />
            </SubLabel>
          </ShippingFeeInfo>
        </ShippingInfo>
      </PostWriteList>
    </PostWriteContent>
  );
}
