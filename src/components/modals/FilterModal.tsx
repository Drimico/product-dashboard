import { useProductsStore } from "@/stores/useProductsStore";

const FilterModal = () => {
const { setSelectedFilter } = useProductsStore();
  return (
    <>
      <div className="fixed inset-0 z-10" />
      <div className="absolute w-fit h-fit top-[130%] right-0 bg-(--bg) flex flex-col gap-2 p-1 shadow-(--shadow-l) whitespace-nowrap z-20">
        <span
          onClick={() => setSelectedFilter("Price Low To High")}
          className="px-2 py-1 hover:bg-(--highlight) cursor-pointer"
        >
          Price Low to High
        </span>
        <span
          onClick={() => setSelectedFilter("Price High To Low")}
          className="px-2 py-1 hover:bg-(--highlight) cursor-pointer"
        >
          Price High to Low
        </span>
      </div>
    </>
  );
};

export default FilterModal;
