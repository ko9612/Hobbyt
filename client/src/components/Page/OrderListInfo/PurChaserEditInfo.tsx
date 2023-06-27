import tw from "tailwind-styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { ComponentProps, useState } from "react";
import { useRouter } from "next/router";

import { OLISection, OLITitle, OLIItem, ItemTitle } from "./SellerInfo";
import AddressApi from "../../../util/AddressApi";
import { InputDiv, Input } from "../UserInfo/InfoStyle";
import { accountNumRegex } from "../../../util/Regex";
import {
  UserRefundHolderState,
  UserRefundBankState,
  UserRefundNumState,
  UserRecipientZipCodeState,
  UserRecipientStreetState,
  UserRecipientDetailState,
} from "../../../state/UserState";
import SubmitButton from "../../Button/SubmitButton";
import { patchOrderInfo } from "../../../api/orderApi";
import MsgModal from "../../Modal/MsgModal";
import { IDataProps } from "./OrderProgress";

const ItemLabelTitle = tw.label`w-1/3 mr-3 pb-2`;

export default function PurchaserEditInfo({ isData }: IDataProps) {
  const router = useRouter();
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const oid = Number(router.query.id);
  const isZipcode = useRecoilValue(UserRecipientZipCodeState);
  const isStreet = useRecoilValue(UserRecipientStreetState);
  const isDetail = useRecoilValue(UserRecipientDetailState);
  const [isRefundHolder, setIsRefundHolder] = useRecoilState(
    UserRefundHolderState,
  );
  const [isRefundBank, setIsRefundBank] = useRecoilState(UserRefundBankState);
  const [isRefundNumber, setIsRefundNumber] =
    useRecoilState(UserRefundNumState);

  // 예금주 handler
  const EditHolderHandler: ComponentProps<"input">["onChange"] = e => {
    setIsRefundHolder(e.target.value);
  };

  // 은행명 handler
  const EditBanklHandler: ComponentProps<"input">["onChange"] = e => {
    setIsRefundBank(e.target.value);
  };

  // 계좌번호 handler
  const EditAccountNumHandler: ComponentProps<"input">["onChange"] = e => {
    const { value } = e.target;
    if (accountNumRegex.test(value))
      setIsRefundNumber(value.replace(/[^0-9]/g, ""));
  };

  // 정보 Edit Handler
  const InfoEditClick = async () => {
    const EditData = {
      address: {
        zipcode: isZipcode,
        street: isStreet,
        detail: isDetail,
      },
      refundAccount: {
        holder: isRefundHolder,
        bank: isRefundBank,
        number: isRefundNumber,
      },
    };

    const EditSubmit = await patchOrderInfo(EditData, oid);

    if ((EditSubmit as any).status === 200) {
      setErrMsg("저장되었습니다.");
    } else if ((EditSubmit as any).status === 404) {
      setErrMsg("주문정보를 찾을 수 없습니다.");
    } else {
      setErrMsg("서버에러. 관리자에게 문의해주세요.");
    }
    setShowMsgModal(true);
  };

  return (
    <OLISection>
      <OLITitle className="flex flex-wrap items-center">
        <div className="pr-10">
          배송{isData?.payMethod !== "CARD" && "/환불"} 정보
        </div>
        <div className="text-sm font-medium text-red-400">
          * 배송{isData?.payMethod !== "CARD" && "지 및 환불"}정보 변경은
          입금확인 단계까지만 가능합니다.
        </div>
      </OLITitle>
      {isData && isData.recipient && isData.status && (
        <>
          <OLIItem>
            <ItemTitle>주문자명</ItemTitle>
            <div className="w-2/3">{isData.recipient.name}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>주문자 연락처</ItemTitle>
            <div className="w-2/3">{isData.recipient.phoneNumber}</div>
          </OLIItem>
          <OLIItem>
            <ItemTitle>이메일</ItemTitle>
            <div className="w-2/3">{isData.email}</div>
          </OLIItem>
          <OLIItem className="flex-wrap">
            <ItemTitle>주소</ItemTitle>
            <InputDiv>
              <AddressApi />
            </InputDiv>
          </OLIItem>
          {isData.payMethod !== "CARD" && (
            <>
              <OLIItem className="flex-wrap">
                <ItemLabelTitle htmlFor="BankName">환불은행</ItemLabelTitle>
                <InputDiv>
                  <Input
                    type="text"
                    id="BankName"
                    maxLength={10}
                    value={isRefundBank}
                    onChange={e => EditBanklHandler(e)}
                  />
                </InputDiv>
              </OLIItem>
              <OLIItem className="flex-wrap">
                <ItemLabelTitle htmlFor="accountNumber">
                  환불계좌
                </ItemLabelTitle>
                <InputDiv>
                  <Input
                    type="text"
                    id="accountNumber"
                    maxLength={14}
                    placeholder="'-'를 제외한 계좌번호를 입력해주세요"
                    value={isRefundNumber}
                    onChange={e => EditAccountNumHandler(e)}
                  />
                </InputDiv>
              </OLIItem>
              <OLIItem className="flex-wrap">
                <ItemLabelTitle htmlFor="holderName">환불예금주</ItemLabelTitle>
                <InputDiv>
                  <Input
                    type="text"
                    id="holderName"
                    maxLength={10}
                    value={isRefundHolder}
                    onChange={e => EditHolderHandler(e)}
                  />
                </InputDiv>
              </OLIItem>
            </>
          )}
          {showMsgModal && (
            <MsgModal msg={errMsg} setOpenModal={setShowMsgModal} />
          )}
          {isData.status === "ORDER" ||
          isData.status === "PAYMENT_VERIFICATION" ? (
            <div className="pt-10 text-right">
              <SubmitButton id="shippingInfoSubmit" onClick={InfoEditClick}>
                {isData?.payMethod !== "CARD"
                  ? "배송/환불 정보 저장하기"
                  : "배송 정보 저장하기"}
              </SubmitButton>
            </div>
          ) : null}
        </>
      )}
    </OLISection>
  );
}
