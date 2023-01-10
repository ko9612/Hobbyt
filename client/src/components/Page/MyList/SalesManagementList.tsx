import { useState } from "react";
import MyPageCategory from "../../Category/MyPageCategory";
import { SaleManagementMenus } from "../../Category/CategoryArr";
import { PContent } from "./ProductsList";
import ProgressCategory from "../../Category/ProgressCategory";

export default function SalesManagementList() {
  const [purchaseProduct] = useState([
    {
      userID: "jieun",
      title: "벨벳 자이언트뚱 손가방",
      productID: 1,
      purchaser: "user1341",
      date: "22.12.20 18:24",
      progress: "주문완료",
    },
    {
      userID: "jieun",
      title: "포토카드 탑로더 12차 판매",
      productID: 2,
      purchaser: "user4411",
      date: "22.12.31 01:29",
      progress: "배송준비중",
    },
  ]);
  return (
    <>
      <MyPageCategory Menus={SaleManagementMenus} />
      <PContent>
        {purchaseProduct.map((product, idx) => (
          <>
            <ul
              key={idx}
              className="flex items-center justify-between p-[1rem] text-center"
            >
              <li className="w-[13rem] text-left truncate">{product.title}</li>
              <li className="w-[10rem] mr-[4rem] pr-[1.9rem]">
                {product.purchaser}
              </li>
              <li className="w-[8rem] mr-[5rem] pr-[1.8rem]">{product.date}</li>
              <ProgressCategory />
            </ul>
            <hr />
          </>
        ))}
      </PContent>
    </>
  );
}
