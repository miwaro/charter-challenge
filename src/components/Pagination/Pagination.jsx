/* eslint-disable react/prop-types */
import { useEffect, useContext } from "react";
import { DateContext } from "../../Contexts/DateContext";
import "./styles.css";
function Pagination({
  customersPerPage,
  totalCustomers,
  paginate,
  currentPage,
}) {
  const { selectedDate } = useContext(DateContext);
  const pageNumbers = [];
  const totalPages = Math.ceil(totalCustomers / customersPerPage);

  useEffect(() => {
    paginate(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  for (let i = 1; i <= Math.ceil(totalCustomers / customersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li>
          <button
            className={currentPage === 1 ? "disabled-link" : "page-link"}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`page-link ${number === currentPage ? "current" : ""}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            className={
              currentPage === totalPages ? "disabled-link" : "page-link"
            }
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
