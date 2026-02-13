import { ChevronDown, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import CategoryModal from "../modals/CategoryModal";
import { useProductsStore } from "@/stores/useProductsStore";
import AddProductModal from "../modals/CreateProductModal";
import { usePaginationStore } from "@/stores/usePaginationStore";
import RangeSlider from "./RangeSlider";
import { useDeleteCategories } from "@/hooks/useDeleteCategories";

const TableTop = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isRangeSliderOpen, setIsRangeSliderOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { selectedCategory, setSelectedCategory, setSearchedWord, priceRange, initialMinPrice, initialMaxPrice } = useProductsStore();
  const { setPagination } = usePaginationStore();
  const { deleteCategories } = useDeleteCategories();
  const categoryClickLogic = async () => {
    if (!selectedCategory) {
      setIsCategoryModalOpen((prev) => !prev);
    } else {
      setSelectedCategory(null);
    }
    await deleteCategories();
  };

  const searchLogic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSearchedWord(e.target.value);
    setPagination(0, 1);
  };

  const clearSearch = () => {
    setSearch("");
    setSearchedWord("");
  };

  return (
    <div className="flex w-full h-10 justify-between items-center mb-8">
      <div className="flex relative w-80 h-fit bg-(--bg-light) border-2 border-(--border) rounded-xl">
        <input value={search} onChange={searchLogic} type="text" className="w-full h-full focus:outline-none p-2" />
        {search ? (
          <X onClick={clearSearch} size={25} className="absolute right-2 top-2 cursor-pointer" />
        ) : (
          <Search size={25} className="absolute right-2 top-2" />
        )}
      </div>

      <div className="flex justify-between items-center gap-10 w-fit h-fit">
        <button
          onClick={categoryClickLogic}
          className="flex items-center border-2 border-(--border) px-3 py-1 rounded-xl bg-(--bg-light) shadow-(--shadow-s) gap-4 relative w-fit h-fit"
        >
          {!selectedCategory ? (
            <div className="flex items-center gap-2 cursor-pointer">
              <span>Category</span>
              <ChevronDown size={25} />
            </div>
          ) : (
            <div className="flex items-center gap-2 group cursor-pointer">
              <span>{selectedCategory.name}</span>
              <X className="group-hover:rotate-90 transition-transform duration-300 ease-in-out" size={25} />
            </div>
          )}
          {isCategoryModalOpen && <CategoryModal />}
        </button>

        <div
          onClick={() => setIsRangeSliderOpen((prev) => !prev)}
          className="flex items-center border-2 border-(--border) px-3 py-1 rounded-xl bg-(--bg-light) shadow-(--shadow-s) gap-4 relative w-fit h-fit"
        >
          <span>Price Range</span>${priceRange.price_min ?? initialMinPrice} - ${priceRange.price_max ?? initialMaxPrice}
          <ChevronDown size={25} />
          {isRangeSliderOpen && <RangeSlider setIsRangeSliderOpen={setIsRangeSliderOpen} />}
        </div>

        <button
          onClick={() => setIsAddProductModalOpen((prev) => !prev)}
          className="flex items-center border-2 border-(--border) px-3 py-2 rounded-xl bg-(--secondary) shadow-(--shadow-s) gap-2 relative cursor-pointer"
        >
          <Plus size={25} />
          <span>Add Product</span>
        </button>
        {isAddProductModalOpen && <AddProductModal setIsAddProductModalOpen={setIsAddProductModalOpen} />}
      </div>
    </div>
  );
};

export default TableTop;
