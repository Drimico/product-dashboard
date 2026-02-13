import { deleteProduct } from "@/api/requests";
import { useDeleteCategories } from "@/hooks/useDeleteCategories";
import useFetchProducts from "@/hooks/useFetchProducts";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { useProductsStore } from "@/stores/useProductsStore";

interface DeleteProps {
  productId: number;
}
const Delete = ({ productId }: DeleteProps) => {
  const { removeProduct, products, setSelectedCategory } = useProductsStore();
  const { offset, limit, currentPage, setPagination } = usePaginationStore();
  const { fetchProducts } = useFetchProducts();
  const { deleteCategories } = useDeleteCategories();
  const handleDelete = async () => {
    await deleteProduct(productId);
    removeProduct(productId);

    if (products.length === 1 && currentPage > 1) {
      const newOffset = offset - limit;
      const newPage = currentPage - 1;
      setPagination(newOffset, newPage);

      setSelectedCategory(null);
    }
    await fetchProducts();
    await deleteCategories();
  };
  return (
    <button onClick={handleDelete} className="w-full h-full hover:bg-(--light-danger) transition-colors duration-200 ease-in-out cursor-pointer">
      Delete
    </button>
  );
};

export default Delete;
