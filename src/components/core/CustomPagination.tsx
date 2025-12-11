import { useProductsStore } from "@/stores/useProductsStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomPagination = () => {
  const { page, limit, setPagination } = useProductsStore();
  const totalPages = Math.ceil(30 / limit);

  const onNext = () => {
    const nextPage = page + 1;
    setPagination((nextPage - 1) * limit, nextPage);
  };
  const onPrev = () => {
    const prevPage = page - 1;
    setPagination((prevPage - 1) * limit, prevPage);
  };
  const handlePageClick = (pageNumber: number) => {
    setPagination((pageNumber - 1) * limit, pageNumber);
  };
  return (
    <div className="flex gap-2 items-center text-(--text)">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="flex items-center disabled:opacity-50 disabled:cursor-default p-3 rounded-full cursor-pointer bg-(--bg-light) shadow-(--shadow-l)"
      >
        <ChevronLeft />
      </button>

      {Array(totalPages)
        .fill(0)
        .map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                handlePageClick(index + 1);
              }}
              className={`relative p-6 rounded-full cursor-pointer shadow-(--shadow-l) transition-colors duration-200 ease-in-out ${
                index + 1 === page ? "bg-(--highlight)" : "bg-(--bg-light)"
              }`}
            >
              <span className="absolute top-[25%] left-[40%] ">{index + 1}</span>
            </button>
          );
        })}

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="flex items-center p-3 bg-(--bg-light) rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-default shadow-(--shadow-l)"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default CustomPagination;
