import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRecoilValue } from "recoil";
import MyPageCategory from "../../Category/MyPageCategory";
import { PurchaseMenus } from "../../Category/CategoryArr";
import { PContent } from "./ProductsList";
import { getOrderList } from "../../../api/tabApi";
import { UserIdState } from "../../../state/UserState";

export default function PurchaseList() {
  const router = useRouter();

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

  useEffect(() => {
    const getData = async () => {
      const res = await getOrderList(page);
      setData(res.data);
      console.log("구매 작품 리스트", res.data);
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
        <div className="h-[45rem]">
          {data?.data &&
            data?.data.map((product, idx) => (
              <div key={idx}>
                <ul className="flex items-center justify-between p-[1.5rem] text-center">
                  <Link
                    href={`/mypage/${userId}/orderdetail/${product.orderId}`}
                  >
                    <li
                      role="presentation"
                      className="w-[8rem] mr-[5rem] text-center truncate cursor-pointer "
                    >
                      {product.title}
                    </li>
                  </Link>
                  <li className="w-36 mr-[5rem] text-center ">
                    {product.nickname}
                  </li>
                  <li className="w-36 mr-[6rem] text-center ">
                    {product.createdAt && getParsedDate(product.createdAt)}
                  </li>
                  <li className="w-32 mr-[1rem] text-center ">
                    {product.status && getStatus(product.status)}
                  </li>
                </ul>
                <hr />
              </div>
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
