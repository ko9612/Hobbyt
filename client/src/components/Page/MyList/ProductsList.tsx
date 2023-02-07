import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import MyPageCategory from "../../Category/MyPageCategory";
import { ProductMenus } from "../../Category/CategoryArr";
import { getProductsList } from "../../../api/tabApi";

export const PContent = tw.div`
  w-[50rem] justify-center items-center m-auto
  `;

export default function ProductstList() {
  // const [saleProduct] = useState([
  //   {
  //     userID: "jieun",
  //     title: "심플 무알러지 피어싱",
  //     productID: 1,
  //     salesPeriod: "22.12.15-22.12.30",
  //     salesRate: 22,
  //     date: "22.12.15",
  //   },
  //   {
  //     userID: "jieun",
  //     title: "자체 제작 무속성 솜인형",
  //     productID: 2,
  //     salesPeriod: "22.12.16-22.12.30",
  //     salesRate: 10,
  //     date: "22.12.16",
  //   },
  // ]);

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
              {/* <Link href={`/blog/${}`}> */}
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
              {/* </Link> */}
              <hr />
            </>
          ))}
      </PContent>
    </>
  );
}
