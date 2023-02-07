import { useEffect, useState } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import MyPageCategory from "../../Category/MyPageCategory";
import { SaleManagementMenus } from "../../Category/CategoryArr";
import { PContent } from "./ProductsList";
import ProgressCategory from "../../Category/ProgressCategory";
import { getManagementList } from "../../../api/tabApi";
import { ManagementState } from "../../../state/OrderState";

export default function SalesManagementList() {
  // const [purchaseProduct] = useState([
  //   {
  //     userID: "jieun",
  //     title: "벨벳 자이언트뚱 손가방",
  //     productID: 1,
  //     purchaser: "user1341",
  //     date: "22.12.20 18:24",
  //     progress: "주문완료",
  //   },
  //   {
  //     userID: "jieun",
  //     title: "포토카드 탑로더 12차 판매",
  //     productID: 2,
  //     purchaser: "user4411",
  //     date: "22.12.31 01:29",
  //     progress: "배송준비중",
  //   },
  // ]);

  // const [purchaseProduct] = useState([
  //   {
  //     orderId: 3,
  //     title: "과자1 급처",
  //     nickname: "test1",
  //     createdAt: "2023-02-06T01:29:47.52848",
  //     status: "ORDER",
  //     orderNumber: 23123123,
  //   },
  //   {
  //     orderId: 2,
  //     title: "과자2 급처",
  //     nickname: "test1",
  //     createdAt: "2023-02-06T01:29:27.470252",
  //     status: "ORDER",
  //     orderNumber: 231251233,
  //   },
  // ]);
  const [data, setData] = useState([]);
  const newStatus = useRecoilValue(ManagementState);

  const getData = async () => {
    const res = await getManagementList();
    setData(res.data);
    console.log("판매관리 리스트", res.data);
  };

  // 날짜 바꿔주는 함수
  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  // console.log("데이터", data);
  useEffect(() => {
    getData();
  }, [newStatus]);

  return (
    <>
      <MyPageCategory Menus={SaleManagementMenus} />
      <PContent>
        {data.data &&
          data.data.map((product: any) => (
            <>
              <ul
                key={product.orderId}
                className="flex items-center justify-between p-[1rem] text-center"
              >
                <li className="w-[13rem] text-left truncate">
                  {product.title}
                </li>
                <li className="w-[10rem] mr-[4rem] pr-[1.9rem]">
                  {product.nickname}
                </li>
                <li className="w-[8rem] mr-[5rem] pr-[1.8rem]">
                  {product.createdAt && getParsedDate(product.createdAt)}
                </li>
                <ProgressCategory
                  orderStatus={product.status}
                  orderId={product.orderId}
                />
              </ul>
              <hr />
            </>
          ))}
      </PContent>
    </>
  );
}
