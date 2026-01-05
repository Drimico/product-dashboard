import { getAllProducts, getProductsByCategory } from "../api/requests";
import { useProductsStore } from "@/stores/useProductsStore";

const useFetchProducts = () => {
  const { setProducts, setTotalProducts, selectedCategory, selectedFilter, offset, limit, searchedWord } = useProductsStore();

  const fetchProducts = async () => {
    let allProducts;
    if (selectedCategory) {
      allProducts = await getProductsByCategory(selectedCategory.id);
    } else {
      allProducts = await getAllProducts({ limit: 1000, offset: 0, page: 1 });
    }
    let sortedProducts = [...allProducts];

    if (searchedWord) {
      sortedProducts = sortedProducts.filter((product) => product.title.toLowerCase().trim().includes(searchedWord.toLowerCase().trim()));
    }
    if (selectedFilter === "Price Low To High") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === "Price High To Low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setTotalProducts(sortedProducts);

    const paginatedProducts = sortedProducts.slice(offset, offset + limit);
    setProducts(paginatedProducts);

    return paginatedProducts;
  };

  return { fetchProducts };
};

export default useFetchProducts;
