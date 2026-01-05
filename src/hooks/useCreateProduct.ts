import { createCategory, createProduct } from "@/api/requests";
import { useProductsStore } from "@/stores/useProductsStore";
import { useState } from "react";

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
  const { totalProducts, limit, categories, setTotalProducts, setPagination } = useProductsStore();
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
    if (!createdProduct.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(+createdProduct.price)) newErrors.price = "Price must be a valid number";
    else if (+createdProduct.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!createdProduct.images) newErrors.image = "Image is required";
    if (!createdProduct.categoryImage) newErrors.image = "Image is required";
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
      const productSlug = createdProduct.title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const categoryCreateData = {
        name: createdProduct.categoryName,
        image: createdProduct.categoryImage,
      };
      const existingCategorySlug = categories.find((category) => category.slug === categorySlug);
      const existingProductSlug = totalProducts.find((product) => product.slug === productSlug);
      if (existingProductSlug) {
        setErrorMessages({ name: "Product name already exists" });
        return;
      }
      const categoryId = existingCategorySlug ? existingCategorySlug.id : (await createCategory(categoryCreateData)).id;
      const productCreateData = {
        title: createdProduct.title,
        price: +createdProduct.price,
        description: createdProduct.description,
        categoryId,
        images: createdProduct.images,
      };
      const response = await createProduct(productCreateData);
      const newTotalProducts = [...totalProducts, response];
      const totalPages = Math.ceil(newTotalProducts.length / limit);
      const lastPageOffset = (totalPages - 1) * limit;
      setPagination(lastPageOffset, totalPages);
      setTotalProducts(newTotalProducts);
      setIsAddProductModalOpen(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
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
