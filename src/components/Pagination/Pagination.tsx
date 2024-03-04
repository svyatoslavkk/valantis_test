import { useDataContext } from "../../context/context";

export default function Pagination() {
  const { currentPage, totalPages, renderPaginationButtons, handlePageChange } = useDataContext();

  return (
    <div>
      <button className="pag__button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      <div className="flex__content">
        {renderPaginationButtons()}
      </div>
      <button className="pag__button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  )
}