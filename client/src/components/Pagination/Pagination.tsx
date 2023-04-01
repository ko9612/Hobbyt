import tw from "tailwind-styled-components";

const PaginationComponent = tw.div`border border-red-500`;

function Pagination({ currentPage, currentPageHandler, items }) {
  const pagination = Array(items.totalPages)
    .fill()
    .map((v, i) => i + 1);
  const pagePrevBtn = () => {
    if (currentPage > 1) {
      currentPageHandler(currentPage - 1);
    }
  };

  const pageNextBtn = () => {
    if (currentPage + 1 <= items.totalPages) {
      currentPageHandler(currentPage + 1);
    }
  };

  return (
    <PaginationComponent>
      <div className="pagination">
        <div className="page">
          <button onClick={pagePrevBtn}>
            <img src={prevIcon} alt="페이지이동" className="prev" />
          </button>
          {pagination &&
            pagination.map((v, i) => (
              <button
                className={
                  currentPage === v ? "page-items check" : "page-items"
                }
                onClick={() => {
                  currentPageHandler(v);
                }}
                key={(v, i)}
              >
                {v}
              </button>
            ))}
          <button onClick={pageNextBtn} className="nextbutton">
            <img src={prevIcon} alt="페이지이동" className="next" />
          </button>
        </div>
      </div>
    </PaginationComponent>
  );
}

export default Pagination;
