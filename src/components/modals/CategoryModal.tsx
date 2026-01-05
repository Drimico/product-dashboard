import type { CategoryResponse } from "@/api/types";
import useFetchProducts from "@/hooks/useFetchProducts";
import { useProductsStore } from "@/stores/useProductsStore";

const CategoryModal = () => {
  const { fetchProducts } = useFetchProducts();
  const { categories, setSelectedCategory, setPagination } = useProductsStore();

  const handleCategoryClick = async (category: CategoryResponse) => {
    await fetchProducts();
    setPagination(0, 1);
    setSelectedCategory(category);
  };
  return (
    <>
      <div className="fixed inset-0 z-10" />
      <div className="absolute w-fit max-h-55 h-fit top-[130%] right-0 bg-(--bg) flex flex-col gap-2 p-1 shadow-(--shadow-l) overflow-y-auto scrollbar-thin z-20">
        {categories.map((category) => (
          <div
            onClick={() => handleCategoryClick(category)}
            className="px-2 py-1 hover:bg-(--highlight) flex whitespace-nowrap cursor-pointer"
            key={category.id}
          >
            {category.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryModal;
