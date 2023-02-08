import { useEffect, useState } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import MyPageCategory from "../../Category/MyPageCategory";
import { SaleManagementMenus } from "../../Category/CategoryArr";
import { PContent } from "./ProductsList";
import ProgressCategory from "../../Category/ProgressCategory";
import { getManagementList } from "../../../api/tabApi";
import { UserIdState } from "../../../state/UserState";

export default function SalesManagementList() {
  const [data, setData] = useState([]);
  const userId = useRecoilValue(UserIdState);

  const getData = async () => {
    const res = await getManagementList();
    setData(res.data);
    console.log("판매관리 리스트", res.data);
  };

  // 날짜 바꿔주는 함수
  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <MyPageCategory Menus={SaleManagementMenus} />
      <PContent>
        {data?.data &&
          data?.data.map((product: any) => (
            <>
              <ul
                key={product.orderId}
                className="flex items-center justify-between p-[1rem] text-center"
              >
                <Link
                  href={`/mypage/${userId}/orderdetail/${product.sellerId}/ordermanagement/${product.orderId}`}
                >
                  <li className="w-[13rem] text-left truncate">
                    {product.title}
                  </li>
                </Link>
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
