import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { getOrderDetail } from "../../../api/OrderApi";
import { OrderDetailState } from "../../../state/OrderState";
import {
  UserRecipientZipCodeState,
  UserRecipientStreetState,
  UserRecipientDetailState,
  UserRefundHolderState,
  UserRefundBankState,
  UserRefundNumState,
} from "../../../state/UserState";
import DepositInfo from "./DepositInfo";
import OrderInfo from "./OrderInfo";
import OrderProgress from "./OrderProgress";
import PurchaserEditInfo from "./PurChaserEditInfo";
import PurchaserInfo from "./PurChaserInfo";
import SellerInfo from "./SellerInfo";

export default function OrderDetailContentBuyer() {
  const router = useRouter();
  const pid = Number(router.query.id);
  const setOrderData = useSetRecoilState(OrderDetailState);
  const setIsZipcode = useSetRecoilState(UserRecipientZipCodeState);
  const setIsStreet = useSetRecoilState(UserRecipientStreetState);
  const setIsDetail = useSetRecoilState(UserRecipientDetailState);
  const setIsRefundHolder = useSetRecoilState(UserRefundHolderState);
  const setIsRefundBank = useSetRecoilState(UserRefundBankState);
  const setIsRefundNumber = useSetRecoilState(UserRefundNumState);
  const [isData, setData] = useState([]);

  const getOrderData = async () => {
    const detailData = await getOrderDetail(pid);
    const { data } = detailData as any;
    setOrderData(data);
    setData(data);
    setIsZipcode(data.recipient.address.zipcode);
    setIsStreet(data.recipient.address.street);
    setIsDetail(data.recipient.address.detail);
    setIsRefundHolder(data.refundAccount.holder);
    setIsRefundBank(data.refundAccount.bank);
    setIsRefundNumber(data.refundAccount.number);
  };

  console.log(isData);

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <>
      <OrderProgress />
      <SellerInfo />
      {router.pathname.includes("/ordermanagement") ? (
        <PurchaserInfo />
      ) : (
        <PurchaserEditInfo />
      )}
      <DepositInfo />
      <OrderInfo />
    </>
  );
}
