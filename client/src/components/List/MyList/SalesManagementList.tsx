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
            <ul key={idx} className="flex justify-between p-4 text-center">
              <li className="w-[16rem] text-left">{product.title}</li>
              <li className="w-[10rem] mr-10">{product.purchaser}</li>
              <li className="w-[8rem] mr-20">{product.date}</li>
              {/* <li className="w-[5rem] mr-10">{product.progress}</li> */}
              <ProgressCategory />
            </ul>
            <hr />
          </>
        ))}
      </PContent>
    </>
  );
}
