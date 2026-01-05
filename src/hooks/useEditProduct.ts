import { updateCategory, updateProduct } from "@/api/requests";
import type { ProductResponse } from "@/api/types";
import { useProductsStore } from "@/stores/useProductsStore";
import { useState } from "react";

interface UseEditProductProps {
  product: ProductResponse;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const useEditProduct = ({ product, setIsEditModalOpen }: UseEditProductProps) => {
  const { products, setProducts } = useProductsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [productForm, setProductForm] = useState({
    name: product.title,
    category: product.category.name,
    price: product.price.toString(),
    image: product.images[0],
  });

  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const onEditProduct = async () => {
    const newErrors: Record<string, string> = {};

    if (!productForm.name) newErrors.name = "Name is required";
    else if (productForm.name.trim() === "") newErrors.name = "Name must contain characters";
    else if (!/[a-zA-Z]/.test(productForm.name)) newErrors.name = "Name must contain letters";
    if (!productForm.category) newErrors.category = "Category is required";
    if (!productForm.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(+productForm.price)) newErrors.price = "Price must be a valid number";
    else if (+productForm.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!productForm.image) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }
    setIsLoading(true);
    try {
      const categoryData = {
        name: productForm.category,
      };
      const productData = {
        title: productForm.name,
        categoryId: product.category.id,
        price: +productForm.price,
        images: [productForm.image],
      };
      const updatedProductResponse = await updateProduct(productData, product.id);
      const updatedCategoryResponse = await updateCategory(categoryData, product.category.id);

      const updatedProducts = products.map((p) => (p.id === product.id ? { ...updatedProductResponse, category: updatedCategoryResponse } : p));
      setProducts(updatedProducts);

      setIsEditModalOpen((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    productForm,
    setProductForm,
    errorMessages,
    onEditProduct,
  };
};

export default useEditProduct;
