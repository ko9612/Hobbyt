import tw from "tailwind-styled-components";
import {
  PostWriteContent,
  PostWriteList,
  PostWriteLabel,
  Sign,
  PostInput,
  SubLabel,
} from "./PostWriteStyle";

const ShippingInfo = tw.div`
flex items-center w-[16rem]
`;

const ShippingFeeInfo = tw.div`
flex items-center w-[9rem]
`;

export default function SendTimeInput() {
  return (
    <PostWriteContent>
      <PostWriteList className="flex flex-col">
        <PostWriteLabel htmlFor="depositTime" className="mb-2">
          입금시간 정보 <Sign>&#42;</Sign>
        </PostWriteLabel>
        <ShippingInfo>
          <SubLabel htmlFor="depositTime" className="w-[7rem]">
            주문 완료 후
          </SubLabel>
          <ShippingFeeInfo>
            <div className="w-[4rem]">
              <PostInput
                type="number"
                id="depositTime"
                min={1}
                max={99}
                defaultValue={1}
              />
            </div>
            &nbsp;시간 이내
          </ShippingFeeInfo>
        </ShippingInfo>
      </PostWriteList>
    </PostWriteContent>
  );
}
