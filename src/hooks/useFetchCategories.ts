import { getCategories } from "@/api/requests";
import { useProductsStore } from "@/stores/useProductsStore";

const useFetchCategories = () => {
  const { setCategories } = useProductsStore();
  const fetchCategories = async () => {
    const params = {
      limit: 1000,
    };
    const response = await getCategories(params);
    setCategories(response);
  };

  return { fetchCategories };
};

export default useFetchCategories;
