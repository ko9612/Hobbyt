import { useState } from "react";
import tw from "tailwind-styled-components";

export default function ProductstList() {
  const PTitle = tw.div`
  flex bg-MainColor w-[54rem] p-5 justify-between items-center m-auto mt-10 rounded-2xl text-white
  `;
  const PContent = tw.div`
  w-[50rem] justify-center items-center m-auto
  `;

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
      <PTitle>
        <p className="ml-20 text-2xl font-semibold">작품명</p>
        <p className="ml-20 text-2xl font-semibold">판매기간</p>
        <p className="text-2xl font-semibold">판매량</p>
        <p className="mr-16 text-2xl font-semibold">게시날짜</p>
      </PTitle>
      <PContent>
        {saleProduct.map((product, idx) => (
          <>
            <ul key={idx} className="flex justify-between p-4 text-center">
              <li className="w-[16rem] text-left">{product.title}</li>
              <li className="w-[10rem] mr-10">{product.salesPeriod}</li>
              <li className="w-[5rem] mr-20">{product.salesRate}</li>
              <li className="w-[5rem] mr-10">{product.date}</li>
            </ul>
            <hr />
          </>
        ))}
      </PContent>
    </>
  );
}
