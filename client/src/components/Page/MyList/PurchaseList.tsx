import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRecoilValue } from "recoil";
import MyPageCategory from "../../Category/MyPageCategory";
import { PurchaseMenus } from "../../Category/CategoryArr";
import { PContent } from "./ProductsList";
import { getOrderList } from "../../../api/tabApi";
import { UserIdState } from "../../../state/UserState";
import {
  PageInfoType,
  PurchaseListType,
  PurchaseType,
} from "../../../type/userTypes";

export default function PurchaseList() {
  const [data, setData] = useState<PurchaseListType[]>([]);
  const userId = useRecoilValue(UserIdState);
  // 페이지네이션
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState<PageInfoType[]>([]);
  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getOrderList(page);
      const listRes = (res as any).data;
      const pageRes = listRes.pageInfo;
      setData(listRes);
      setTotalPages(pageRes);
    };
    getData();
  }, [page]);

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
    if (status === "CANCEL") {
      return "미입금취소";
    }
  };

  return (
    <>
      <MyPageCategory Menus={PurchaseMenus} />
      <PContent>
        <div className="h-[54rem]">
          {data?.data &&
            data?.data.map((product: PurchaseType, idx: number) => (
              <div key={idx}>
                <ul className="flex items-center justify-between p-[1.5rem] text-center text-sm md:text-base">
                  <Link
                    href={`/mypage/${userId}/orderdetail/${product.orderId}`}
                  >
                    <li
                      role="presentation"
                      className="w-16 md:w-[8rem] md:mr-[5rem] text-center truncate cursor-pointer "
                    >
                      {product.title}
                    </li>
                  </Link>
                  <li className="w-12 md:w-36 md:mr-[5rem] text-center ">
                    {product.nickname}
                  </li>
                  <li className="w-24 md:w-36 md:mr-[6rem] text-center ">
                    {product.createdAt && getParsedDate(product.createdAt)}
                  </li>
                  <li className="w-14 md:w-32 md:mr-[1rem] text-center ">
                    {product.status && getStatus(product.status)}
                  </li>
                </ul>
                <hr />
              </div>
            ))}
        </div>
        <div className="myInfo-pagenation-box">
          {totalPages && (
            <Stack spacing={2}>
              <Pagination
                count={totalPages.totalPages}
                defaultPage={1}
                shape="rounded"
                size="large"
                onChange={(e, value) => handlePageChange(e, value)}
                defaultValue={1}
                boundaryCount={2}
              />
            </Stack>
          )}
        </div>
      </PContent>
    </>
  );
}
