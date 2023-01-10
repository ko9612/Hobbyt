import { useState } from "react";
import tw from "tailwind-styled-components";
import MyPageCategory from "../../Category/MyPageCategory";
import { ProductMenus } from "../../Category/CategoryArr";

export const PContent = tw.div`
  w-[50rem] justify-center items-center m-auto
  `;

export default function ProductstList() {
  const [saleProduct] = useState([
    {
      userID: "jieun",
      title: "심플 무알러지 피어싱",
      productID: 1,
      salesPeriod: "22.12.15-22.12.30",
      salesRate: 22,
      date: "22.12.15",
    },
    {
      userID: "jieun",
      title: "자체 제작 무속성 솜인형",
      productID: 2,
      salesPeriod: "22.12.16-22.12.30",
      salesRate: 10,
      date: "22.12.16",
    },
  ]);

  return (
    <>
      <MyPageCategory Menus={ProductMenus} />
      <PContent>
        {saleProduct.map((product, idx) => (
          <>
            <ul
              key={idx}
              className="flex items-center justify-between p-[1.5rem] text-center"
            >
              <li className="w-[13rem] text-left truncate">{product.title}</li>
              <li className="w-[10rem] mr-[6rem]">{product.salesPeriod}</li>
              <li className="w-[5rem] mr-[8rem]">{product.salesRate}</li>
              <li className="w-[5rem] mr-[2rem]">{product.date}</li>
            </ul>
            <hr />
          </>
        ))}
      </PContent>
    </>
  );
}
