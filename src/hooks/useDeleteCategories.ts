import { getAllProducts, getCategories, deleteCategory } from "@/api/requests";
import axios from "axios";

export const useDeleteCategories = () => {
  const deleteCategories = async () => {
    try {
      const categories = await getCategories();
      const products = await getAllProducts();

      const categoryIdsInUse = new Set(products.map((product) => product.category.id));

      const categoriesToDelete = categories.filter((category) => !categoryIdsInUse.has(category.id));

      await Promise.all(categoriesToDelete.map((category) => deleteCategory(category.id)));

    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  return { deleteCategories };
};
