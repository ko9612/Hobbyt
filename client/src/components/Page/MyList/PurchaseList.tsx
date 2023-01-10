import { useState } from "react";
import { useRouter } from "next/router";
import MyPageCategory from "../../Category/MyPageCategory";
import { PurchaseMenus } from "../../Category/CategoryArr";
import { PContent } from "./ProductsList";

export default function PurchaseList() {
  const router = useRouter();
  const [purchaseProduct] = useState([
    {
      userID: "jieun",
      title: "자체 제작 고양이 텀블러",
      productID: 1,
      seller: "고양이귀여워",
      date: "22.12.16 18:24",
      progress: "주문완료",
    },
    {
      userID: "jieun",
      title: "레진 공예 쉐이커",
      productID: 2,
      seller: "강아지귀여워",
      date: "22.12.31 01:29",
      progress: "배송준비중",
    },
  ]);
  return (
    <>
      <MyPageCategory Menus={PurchaseMenus} />
      <PContent>
        {purchaseProduct.map((product, idx) => (
          <>
            <ul
              key={idx}
              className="flex items-center justify-between p-[1.5rem] text-center"
            >
              <li
                role="presentation"
                className="w-[13rem] text-left truncate cursor-pointer"
                onClick={() => router.push("/orderdetail")}
              >
                {product.title}
              </li>
              <li className="w-[10rem] mr-[4.8rem]">{product.seller}</li>
              <li className="w-[8rem] mr-[6.6rem]">{product.date}</li>
              <li className="w-[5rem] mr-[2rem]">{product.progress}</li>
            </ul>
            <hr />
          </>
        ))}
      </PContent>
    </>
  );
}
