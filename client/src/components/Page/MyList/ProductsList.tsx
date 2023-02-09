import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";
import MyPageCategory from "../../Category/MyPageCategory";
import { ProductMenus } from "../../Category/CategoryArr";
import { getProductsList } from "../../../api/tabApi";

export const PContent = tw.div`
  w-[50rem] justify-center items-center m-auto
  `;

export default function ProductstList() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await getProductsList();
    setData(res.data);
    console.log("판매작품 리스트", res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // 날짜 바꿔주는 함수
  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  return (
    <>
      <MyPageCategory Menus={ProductMenus} />
      <PContent>
        {data?.data &&
          data?.data.map((product, idx) => (
            <>
              <Link href={`/blog/${product.sellerId}/sale/${product.saleId}`}>
                <ul
                  key={idx}
                  className="flex items-center justify-between p-[1.5rem] text-center"
                >
                  <li className="w-[13rem] text-left truncate">
                    {product.productName}
                  </li>
                  <li className="w-[10rem] mr-[6rem]">
                    {product.isAlwaysOnSale === true
                      ? "상시판매"
                      : `${product.period.startedAt}-${product.period.endAt}`}
                  </li>
                  <li className="w-[5rem] mr-[8rem]">{product.salesVolume}</li>
                  <li className="w-[5rem] mr-[2rem]">
                    {product.createdAt && getParsedDate(product.createdAt)}
                  </li>
                </ul>
              </Link>
              <hr />
            </>
          ))}
      </PContent>
    </>
  );
}
