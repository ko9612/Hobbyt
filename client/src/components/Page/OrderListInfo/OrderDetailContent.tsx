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

interface IdProps {
  id: number;
}

export default function OrderDetailContent({ id }: IdProps) {
  const router = useRouter();
  const [orderData, setOrderData] = useRecoilState(OrderDetailState);

  const getOrderData = async () => {
    const data = getOrderDetail(id);
    setOrderData((data as any).data);
  };

  console.log(orderData);

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
