import Table from "@/components/homeComponents/Table";
import useFetchProducts from "@/hooks/useFetchProducts";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { useProductsStore } from "@/stores/useProductsStore";
import { useEffect } from "react";

const Home = () => {
  const { fetchProducts } = useFetchProducts();
  const { selectedCategory, searchedWord, priceRange, initialMaxPrice, initialMinPrice } = useProductsStore();
  const { offset } = usePaginationStore();

  useEffect(() => {
    fetchProducts();
  }, [offset, selectedCategory, searchedWord, priceRange, initialMaxPrice, initialMinPrice]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Table />
    </div>
  );
};

export default Home;
