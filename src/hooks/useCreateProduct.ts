import { createCategory, createProduct, getCategories } from "@/api/requests";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { useProductsStore } from "@/stores/useProductsStore";
import axios from "axios";
import { useState } from "react";
import useFetchProducts from "./useFetchProducts";

interface UseCreateProductProps {
  setIsAddProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ProductForm {
  title: string;
  price: string;
  description: string;
  categoryImage: string;
  categoryName: string;
  images: string[];
}
const useCreateProduct = ({ setIsAddProductModalOpen }: UseCreateProductProps) => {
  const { totalProducts } = useProductsStore();
  const { limit, setPagination } = usePaginationStore();
  const {fetchProducts} = useFetchProducts()
  const [createdProduct, setCreatedProduct] = useState<ProductForm>({
    title: "",
    price: "",
    description: "",
    categoryImage: "",
    categoryName: "",
    images: [],
  });
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const onCreateProduct = async () => {
    const newErrors: Record<string, string> = {};
    if (!createdProduct.title) newErrors.name = "Name is required";
    else if (createdProduct.title.trim() === "") newErrors.name = "Name must contain characters";
    else if (!/[a-zA-Z]/.test(createdProduct.title)) newErrors.name = "Name must contain letters";
    if (!createdProduct.categoryName) newErrors.category = "Category is required";
    else if (createdProduct.categoryName.trim() === "") newErrors.category = "Category must contain characters";
    if (!createdProduct.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(+createdProduct.price)) newErrors.price = "Price must be a valid number";
    else if (+createdProduct.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!createdProduct.images) newErrors.productImage = "Image is required";
    if (!createdProduct.categoryImage) newErrors.categoryImage = "Image is required";
    if (!createdProduct.description) newErrors.description = "Description is required";
    else if (createdProduct.description.trim() === "") newErrors.description = "Description must contain characters";

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const categorySlug = createdProduct.categoryName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const categoryCreateData = {
        name: createdProduct.categoryName,
        image: createdProduct.categoryImage,
      };
      const allCategories = await getCategories();
      const existingCategorySlug = allCategories.find((category) => category.slug === categorySlug);
      const categoryId = existingCategorySlug ? existingCategorySlug.id : (await createCategory(categoryCreateData)).id;

      const productCreateData = {
        title: createdProduct.title,
        price: +createdProduct.price,
        description: createdProduct.description,
        categoryId,
        images: createdProduct.images,
      };

      await createProduct(productCreateData);
      await fetchProducts();
      const lastPage = Math.ceil((totalProducts.length + 1) / limit);
      setPagination((lastPage - 1) * limit, lastPage);
      setIsAddProductModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message.includes("product")) {
          setErrorMessages({ name: "Product with this name already exists" });
        } else {
          alert(error.response?.data.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    createdProduct,
    setCreatedProduct,
    errorMessages,
    onCreateProduct,
  };
};

export default useCreateProduct;
