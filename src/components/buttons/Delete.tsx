import { deleteProduct } from "@/api/requests";
import { useProductsStore } from "@/stores/useProductsStore";

interface DeleteProps {
  productId: number;
}
const Delete = ({ productId }: DeleteProps) => {
  const { removeProduct, setTotalProducts, totalProducts } = useProductsStore();
  const handleDelete = async () => {
    await deleteProduct(productId);
    removeProduct(productId);
    setTotalProducts(totalProducts.filter((product) => product.id !== productId));
  };
  return (
    <button onClick={handleDelete} className="w-full h-full hover:bg-(--light-danger) transition-colors duration-200 ease-in-out cursor-pointer">
      Delete
    </button>
  );
};

export default Delete;
