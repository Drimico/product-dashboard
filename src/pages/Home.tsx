import Table from "@/components/homeComponents/Table";
import useFetchProducts from "@/hooks/useFetchProducts";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { useProductsStore } from "@/stores/useProductsStore";
import { useEffect } from "react";

const Home = () => {
  const { fetchProducts } = useFetchProducts();
  const { selectedCategory, searchedWord, priceRange, totalProducts } = useProductsStore();
  const { offset, currentPage } = usePaginationStore();

  useEffect(() => {
    fetchProducts();
  }, [offset, selectedCategory, searchedWord, currentPage, priceRange, totalProducts.length]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Table />
    </div>
  );
};

export default Home;
