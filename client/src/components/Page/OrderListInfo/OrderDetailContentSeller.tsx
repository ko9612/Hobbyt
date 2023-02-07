import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getOrderDetail } from "../../../api/OrderApi";
import { OrderDetailState } from "../../../state/OrderState";
import DepositInfo from "./DepositInfo";
import OrderInfo from "./OrderInfo";
import OrderProgress from "./OrderProgress";
import PurchaserInfo from "./PurChaserInfo";

import SellerInfo from "./SellerInfo";

export default function OrderDetailContentSeller() {
  const router = useRouter();
  const pid = Number(router.query.id);
  const [, setOrderData] = useRecoilState(OrderDetailState);
  const getOrderData = async () => {
    const detailData = await getOrderDetail(pid);
    setOrderData((detailData as any).data);
  };

  useEffect(() => {
    if (router.isReady) {
      getOrderData();
    }
  }, [router.isReady]);

  return (
    <>
      <OrderProgress />
      <SellerInfo />
      <PurchaserInfo />
      <DepositInfo />
      <OrderInfo />
    </>
  );
}
