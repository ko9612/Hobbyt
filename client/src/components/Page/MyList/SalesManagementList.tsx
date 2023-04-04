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

export default function SalesManagementList() {
  const [data, setData] = useState([]);
  const userId = useRecoilValue(UserIdState);

  // 페이지네이션
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState([]);
  const handlePageChange = (e: ChangeEvent) => {
    const select = e.target.childNodes;
    const pageNum = Number(e.target.outerText);

    if (select.length === 2) {
      setPage(pageNum - 1);
    } else if (select.length === 1) {
      setPage(pageNum + 1);
    }
  };

  // 날짜 바꿔주는 함수
  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  useEffect(() => {
    const getData = async () => {
      const res = await getManagementList(page);
      setData(res.data);
      console.log("판매관리 리스트", res.data);
    };
    getData();
  }, [page]);

  return (
    <>
      <MyPageCategory Menus={SaleManagementMenus} />
      <PContent>
        <div className="h-[45rem]">
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
                    <li className="w-[8rem] mr-[3.5rem] text-center truncate">
                      {product.title}
                    </li>
                  </Link>
                  <li className="w-[8rem] mr-[4rem] truncate text-center">
                    {product.nickname}
                  </li>
                  <li className="w-[8rem] mr-[4rem] text-center">
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
              </>
            ))}
        </div>
        <div className="flex justify-center mt-20">
          {totalPages && (
            <Stack spacing={2}>
              <Pagination
                count={totalPages.totalPages}
                defaultPage={1}
                shape="rounded"
                size="large"
                onChange={e => handlePageChange(e)}
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
