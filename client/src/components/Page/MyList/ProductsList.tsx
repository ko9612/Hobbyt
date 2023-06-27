import { ChangeEvent, useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import MyPageCategory from "../../Category/MyPageCategory";
import { ProductMenus } from "../../Category/CategoryArr";
import { getProductsList } from "../../../api/tabApi";
import {
  PageInfoType,
  ProductListType,
  ProductType,
} from "../../../type/userTypes";
import ParseDateFC from "../../../util/ParseDateFC";

export const PContent = tw.div` block justify-center items-center m-auto md:h-[60rem]`;

export default function ProductstList() {
  const [data, setData] = useState<ProductListType[]>([]);

  // 페이지네이션
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState<PageInfoType[]>([]);
  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getProductsList(page);
      const listRes = (res as any).data;
      const pageRes = listRes.pageInfo;
      setData(listRes);
      setTotalPages(pageRes);
    };
    getData();
  }, [page]);

  return (
    <>
      <MyPageCategory Menus={ProductMenus} />
      <PContent>
        <div className="h-[54rem]">
          {data.data &&
            data.data.map((product: ProductType, idx: number) => (
              <div key={idx}>
                <Link href={`/blog/${product.sellerId}/sale/${product.saleId}`}>
                  <ul className="flex items-center justify-between p-[1.5rem] text-center text-sm md:text-base">
                    <li className="w-1/6 md:w-[8rem] text-center truncate">
                      {product.productName}
                    </li>
                    <li className="w-2/6 md:w-[12rem] md:mr-8 text-center">
                      {product.isAlwaysOnSale === true
                        ? "상시판매"
                        : `${product.period.startedAt} ~ ${product.period.endAt}`}
                    </li>
                    <li className="w-1/6 md:w-[5rem] md:mr-14 text-center">
                      {product.salesVolume}
                    </li>
                    <li className="w-1/4 md:w-[8rem] text-center">
                      {product.createdAt && ParseDateFC(product.createdAt)}
                    </li>
                  </ul>
                </Link>
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
