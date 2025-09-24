import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (page) => {
    if (page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // გვერდების სია (მაგ: 1 ... 4 5 6 ... 10)
  const generatePageNumbers = () => {
    let pages = [];
    if (totalPages <= 4 && totalPages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (totalPages == 5) {
      if (currentPage == 3) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(...[1, 2, "...", totalPages - 1, totalPages]);
      }
      return pages;
    } else {
      if ([1, 2, totalPages - 1, totalPages].includes(currentPage)) {
        pages.push(...[1, 2, "...", totalPages - 1, totalPages]);
      } else if (currentPage == 3) {
        pages.push(...[1, 2, currentPage, "...", totalPages - 1, totalPages]);
      } else if (currentPage == totalPages - 2) {
        pages.push(...[1, 2, "...", currentPage, totalPages - 1, totalPages]);
      } else {
        pages.push(
          ...[1, 2, "...", currentPage, "...", totalPages - 1, totalPages]
        );
      }
      return pages;
    }
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-6 mb-40">
      {/* Previous Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:opacity-50 hover:cursor-pointer disabled:cursor-default"
      >
        <img src="/chevron-left.svg" alt="Prev" />
      </button>

      {/* Page Buttons */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => handlePageClick(page)}
            className={`w-8 h-8 flex items-center justify-center border rounded-[4px] bg-[#fff] text-sm font-bold leading-[22px] hover:cursor-pointer ${
              page === currentPage
                ? "border-[#ff4000] text-[#ff4000]"
                : "hover:bg-gray-100 border-[#f8f6f7] text-[#212b36] opacity-60 hover:opacity-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:opacity-50 hover:cursor-pointer disabled:cursor-default"
      >
        <img src="/chevron-right.svg" alt="Next" />
      </button>
    </div>
  );
}

export default Pagination;
