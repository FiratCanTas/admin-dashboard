import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/users/userSlice";

const Pagination = () => {
  const { currentPage, itemsPerPage, users } = useSelector(
    (state) => state.users,
  );
  const dispatch = useDispatch();
  const totalPages = Math.ceil(users.length / itemsPerPage);

  console.log("totalPages", totalPages);
  console.log("currentPage", currentPage);

  const getPageNumbers = () => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (value, index) => index + 1);

    if (currentPage === 1) return [1, 2, 3];
    if (currentPage === totalPages)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-between px-5">
      <div className="flex gap-3">
        <button
          className="cursor-pointer"
          onClick={() => dispatch(setPage(1))}
          disabled={currentPage === 1}
        >
          ⟪
        </button>
        <button
          className="cursor-pointer"
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
        >
          ⟨
        </button>
        <div className="flex gap-1">
          {pageNumbers.map((pageNumber) => (
            <button
              onClick={() => dispatch(setPage(pageNumber))}
              className={`${pageNumber === currentPage && "text-blue-400"} cursor-pointer`}
              key={pageNumber}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          className="cursor-pointer"
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          ⟩
        </button>
        <button
          className="cursor-pointer"
          onClick={() => dispatch(setPage(totalPages))}
          disabled={currentPage === totalPages}
        >
          ⟫
        </button>
      </div>
      <div>
        <p>
          {`${currentPage * itemsPerPage - 4} - ${users.length <= currentPage * itemsPerPage ? users.length : currentPage * itemsPerPage} out of ${users.length} users`}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
