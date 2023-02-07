import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MyPageCategory from "../../Category/MyPageCategory";
import { PurchaseMenus } from "../../Category/CategoryArr";
import { PContent } from "./ProductsList";
import { getOrderList } from "../../../api/tabApi";

export default function PurchaseList() {
  const router = useRouter();

  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await getOrderList();
    setData(res.data);
    console.log("구매 작품 리스트", res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // 날짜 바꿔주는 함수
  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  // 진행사항 함수
  const getStatus = (status: string) => {
    if (status === "ORDER") {
      return "주문완료";
    }
    if (status === "PAYMENT_VERIFICATION") {
      return "입금확인";
    }
    if (status === "PREPARE_DELIVERY") {
      return "배송준비중";
    }
    if (status === "START_DELIVERY") {
      return "배송시작";
    }
    if (status === "FINISH_DELIVERY") {
      return "배송완료";
    }
    if (status === "PREPARE_REFUND") {
      return "환불준비중";
    }
    if (status === "FINISH_REFUND") {
      return "환불완료";
    }
    if (status === "FINISH") {
      return "거래종료";
    }
  };

  return (
    <>
      <MyPageCategory Menus={PurchaseMenus} />
      <PContent>
        {data?.data &&
          data?.data.map((product, idx) => (
            <div key={idx}>
              <ul className="flex items-center justify-between p-[1.5rem] text-center">
                <li
                  role="presentation"
                  className="w-[13rem] text-left truncate cursor-pointer"
                  onClick={() => router.push("/orderdetail")}
                >
                  {product.title}
                </li>
                <li className="w-[10rem] mr-[4.8rem]">{product.nickname}</li>
                <li className="w-[8rem] mr-[6.6rem]">
                  {product.createdAt && getParsedDate(product.createdAt)}
                </li>
                <li className="w-[5rem] mr-[2rem]">
                  {product.status && getStatus(product.status)}
                </li>
              </ul>
              <hr />
            </div>
          ))}
      </PContent>
    </>
  );
}
