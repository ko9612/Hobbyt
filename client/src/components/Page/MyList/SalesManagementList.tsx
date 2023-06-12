import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import MyPageCategory from "../../Category/MyPageCategory";
import { SaleManagementMenus } from "../../Category/CategoryArr";
import { PContent } from "./ProductsList";
import ProgressCategory from "../../Category/ProgressCategory";
import { getManagementList } from "../../../api/tabApi";
import { UserIdState } from "../../../state/UserState";
import {
  PageInfoType,
  SaleManagementListType,
  SaleManagememtType,
} from "../../../type/userTypes";

export default function SalesManagementList() {
  const [data, setData] = useState<SaleManagementListType[]>([]);
  const userId = useRecoilValue(UserIdState);
  // 페이지네이션
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState<PageInfoType[]>([]);
  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getManagementList(page);
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

  return (
    <>
      <MyPageCategory Menus={SaleManagementMenus} />
      <PContent>
        <div className="h-[54rem]">
          {data?.data &&
            data?.data.map((product: SaleManagememtType) => (
              <div key={product.orderId}>
                <ul className="flex items-center justify-between p-[1rem] text-center text-sm md:text-base">
                  <Link
                    href={`/mypage/${userId}/orderdetail/${product.sellerId}/ordermanagement/${product.orderId}`}
                  >
                    <li className="w-16 md:w-[8rem] md:mr-[3.5rem] text-center truncate">
                      {product.title}
                    </li>
                  </Link>
                  <li className="w-18 md:w-[8rem] md:mr-[4rem] truncate text-center">
                    {product.nickname}
                  </li>
                  <li className="w-22 md:w-[8rem] md:mr-[4rem] text-center">
                    {product.createdAt && getParsedDate(product.createdAt)}
                  </li>
                  <div>
                    <ProgressCategory
                      isCanceled={product.isCanceled}
                      orderStatus={product.status}
                      orderId={product.orderId}
                    />
                  </div>
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
