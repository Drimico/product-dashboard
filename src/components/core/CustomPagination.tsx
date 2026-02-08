import { usePaginationStore } from "@/stores/usePaginationStore";
import { useProductsStore } from "@/stores/useProductsStore";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";

const CustomPagination = () => {
  const { currentPage, limit, setPagination } = usePaginationStore();
  const { hasNextPage, totalProducts } = useProductsStore();
  const totalPages = Math.ceil(totalProducts.length / limit);

  const onNext = () => {
    const nextPage = currentPage + 1;
    setPagination((nextPage - 1) * limit, nextPage);
  };
  const onPrev = () => {
    const prevPage = currentPage - 1;
    setPagination((prevPage - 1) * limit, prevPage);
  };
  const onPageChange = (page: number) => {
    setPagination((page - 1) * limit, page);
  };
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage < 3) {
        pages.push(2, 3, "...", totalPages);
      } else if (currentPage > totalPages - 2) {
        pages.push("...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };
  return (
    <div className="flex gap-2 items-center text-(--text)">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="flex items-center justify-center disabled:opacity-50 disabled:cursor-default h-13 w-13 rounded-full cursor-pointer bg-(--bg-light) shadow-(--shadow-l) "
      >
        <ChevronLeft />
      </button>
      {getPageNumbers().map((page, index) => {
        if (typeof page === "string") {
          return (
            <span key={index} className="w-10 h-13 justify-center flex items-end px-2 ">
              <Ellipsis />
            </span>
          );
        } else {
          return (
            <button
              className={`${
                currentPage === page && "bg-(--highlight)"
              } flex items-center justify-center disabled:opacity-50 disabled:cursor-default h-13 w-13 rounded-full cursor-pointer bg-(--bg-light) shadow-(--shadow-l)`}
              key={index}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        }
      })}
      <button
        onClick={onNext}
        disabled={!hasNextPage}
        className="flex items-center h-13 w-13 justify-center bg-(--bg-light) rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-default shadow-(--shadow-l)"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default CustomPagination;
