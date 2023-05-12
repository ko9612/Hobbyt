import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getOrderDetail } from "../../../api/orderApi";
import { OrderStatus } from "../../../state/OrderState";
import {
  UserRecipientZipCodeState,
  UserRecipientStreetState,
  UserRecipientDetailState,
  UserRefundHolderState,
  UserRefundBankState,
  UserRefundNumState,
  UserIdState,
} from "../../../state/UserState";
import { OrderDetailProps } from "../../../type/OrderType";
import MsgModal from "../../Modal/MsgModal";
import DepositInfo from "./DepositInfo";
import OrderInfo from "./OrderInfo";
import OrderProgress from "./OrderProgress";
import PurchaserEditInfo from "./PurChaserEditInfo";
import PurchaserInfo from "./PurChaserInfo";
import SellerInfo from "./SellerInfo";

export default function OrderDetailContent() {
  const router = useRouter();

  const [showMsgModal, setShowMsgModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const pid = Number(router.query.id);
  const userId = useRecoilValue(UserIdState);

  const [isData, setData] = useState<OrderDetailProps>();
  const setIsZipcode = useSetRecoilState(UserRecipientZipCodeState);
  const setIsStatus = useSetRecoilState(OrderStatus);
  const setIsStreet = useSetRecoilState(UserRecipientStreetState);
  const setIsDetail = useSetRecoilState(UserRecipientDetailState);
  const setIsRefundHolder = useSetRecoilState(UserRefundHolderState);
  const setIsRefundBank = useSetRecoilState(UserRefundBankState);
  const setIsRefundNumber = useSetRecoilState(UserRefundNumState);

  const getOrderData = async () => {
    const detailData = await getOrderDetail(pid);
    const { data } = detailData as any;
    if ((detailData as any).status === 200) {
      if (
        router.pathname.includes("/ordermanagement") &&
        data.sellerId !== userId
      ) {
        setErrMsg("접근할 수 없는 페이지입니다");
        setShowMsgModal(true);
      } else if (
        !router.pathname.includes("/ordermanagement") &&
        data.comsumerId !== userId
      ) {
        setErrMsg("접근할 수 없는 페이지입니다");
        setShowMsgModal(true);
      } else {
        setData(data);
        setIsStatus(data.status);
        setIsZipcode(data.recipient.address.zipcode);
        setIsStreet(data.recipient.address.street);
        setIsDetail(data.recipient.address.detail);
        setIsRefundHolder(data.refundAccount.holder);
        setIsRefundBank(data.refundAccount.bank);
        setIsRefundNumber(data.refundAccount.number);
      }
    } else if ((detailData as any).status === 404) {
      setErrMsg("주문정보를 찾을 수 없습니다");
      setShowMsgModal(true);
    } else {
      setErrMsg("Server Error");
      setShowMsgModal(true);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <>
      {showMsgModal && <MsgModal msg={errMsg} setOpenModal={setShowMsgModal} />}
      {isData?.status && <OrderProgress isData={isData} />}
      <SellerInfo isData={isData} />
      {router.pathname.includes("/ordermanagement") ? (
        <PurchaserInfo isData={isData} />
      ) : (
        <PurchaserEditInfo isData={isData} />
      )}
      {isData?.payMethod !== "CARD" && <DepositInfo isData={isData} />}
      <OrderInfo isData={isData} />
    </>
  );
}
