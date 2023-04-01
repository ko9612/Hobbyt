import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import Pagination from "react-js-pagination";
import MyPageCategory from "../../Category/MyPageCategory";
import { ProductMenus } from "../../Category/CategoryArr";
import { getProductsList } from "../../../api/tabApi";

export const PContent = tw.div`w-[50rem] block justify-center items-center m-auto border-2 border-black h-[60rem]`;

export default function ProductstList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const handlePageChange = page => {
    setPage(page);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getProductsList(page);
      setData(res.data);
      // setPage(page + 1);
      // setTotalPages(res.data.pageInfo);
      // console.log("판매작품 리스트", res.data);
    };
    getData();
  }, [page]);

  // 날짜 바꿔주는 함수
  const getParsedDate = (date: string) =>
    new Date(date).toLocaleDateString("ko-KR");

  console.log("판매작품 리스트", data);

  return (
    <>
      <MyPageCategory Menus={ProductMenus} />
      <PContent>
        <div className="h-[45rem]">
          {data.data &&
            data.data.map((product, idx) => (
              <div key={product.id}>
                <Link href={`/blog/${product.sellerId}/sale/${product.saleId}`}>
                  <ul
                    key={idx}
                    className="flex items-center justify-between p-[1.5rem] text-center"
                  >
                    <li className="w-[8rem] text-center truncate">
                      {product.productName}
                    </li>
                    <li className="w-[12rem] mr-8 text-center">
                      {product.isAlwaysOnSale === true
                        ? "상시판매"
                        : `${product.period.startedAt} ~ ${product.period.endAt}`}
                    </li>
                    <li className="w-[5rem] mr-14 text-center">
                      {product.salesVolume}
                    </li>
                    <li className="w-[8rem] text-center">
                      {product.createdAt && getParsedDate(product.createdAt)}
                    </li>
                  </ul>
                </Link>
                <hr />
              </div>
            ))}
        </div>
        {/* <div className="flex justify-center mt-20">
          <div className="inline-block border border-red-500 w-[300px] h-[30px] justify-center">
            <Pagination
              activePage={page} // 필수 활성화 페이지
              itemsCountPerPage={10} // 페이지당 항목 수
              totalItemsCount={300} // 필수 표시할 총 항목 수
              pageRangeDisplayed={10} // 페이지네이터의 페이지 범위 (이전, 다음, 첫번째, 마지막)
              onChange={handlePageChange}
            />
          </div>
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
        </div> */}
      </PContent>
    </>
  );
}

// // 페이지네이션
// const [page, setPage] = useState(0);
// const [totalPages, setTotalPages] = useState([]);
// const [count, setCount] = useState(1);

// const handlePageChange = (e: ChangeEvent) => {
//   const select = e.target.childNodes;
//   const pageNum = Number(e.target.outerText);

//   // if (select.length === 2) {
//   //   console.log("첫", pageNum);
//   //   setPage(pageNum - 1);
//   // } else if (select.length === 1) {
//   //   console.log("두번째", pageNum);
//   //   page;
//   //   if (pageNum > 1) {
//   //     console.log("세번째", pageNum);
//   //     setPage(1);
//   //   } else {
//   //     console.log("마지막", pageNum);
//   //     setPage(-1);
//   //   }
//   // }

//   // if (e.target.tagName === "BUTTON") {
//   //   setPage(pageNum + 1);
//   // } else if (e.target.tagName === "svg") {
//   //   setPage(pageNum - 1);
//   //   // if (Number.isNaN(pageNum)) {
//   //   //   setPage(1);
//   //   // }
//   // }
//   console.log("끝", pageNum);
//   // console.log("target", e.target);
//   // console.log("zzzzzzz", e.target.children);
//   console.log("zzzzzzz", e.target.childNodes);
//   // console.log("target", e.target.tagName);
// };
