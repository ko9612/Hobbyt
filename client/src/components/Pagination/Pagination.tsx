import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

const PaginationWrapper = tw.div`border border-red-500`;
const FaAngleDoubleLeft = tw.button``;
const FaAngleLeft = tw.button``;
const ButtonWrapper = tw.div`border border-blue-500`;
const PageButton = tw.div`border border-green-500`;
const FaAngleRight = tw.div``;
const FaAngleDoubleRight = tw.div``;

export default function Pagination({ totalPage, limit, page, setPage }) {
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);

  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    }
  }, [page]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage]);

  return (
    <PaginationWrapper>
      <FaAngleDoubleLeft onClick={() => setPage(1)} disabled={page === 1} />
      <FaAngleLeft onClick={() => setPage(page - 1)} disabled={page === 1} />
      <ButtonWrapper>
        {currentPageArray?.map(i => (
          <PageButton
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </PageButton>
        ))}
      </ButtonWrapper>
      <FaAngleRight
        onClick={() => setPage(page + 1)}
        disabled={page === totalPage}
      />
      <FaAngleDoubleRight
        onClick={() => setPage(totalPage)}
        disabled={page === totalPage}
      />
    </PaginationWrapper>
  );
}
