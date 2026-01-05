import Table from "@/components/homeComponents/Table";
import useFetchCategories from "@/hooks/useFetchCategories";
import useFetchProducts from "@/hooks/useFetchProducts";
import { useProductsStore } from "@/stores/useProductsStore";
import { useEffect } from "react";

const Home = () => {
  const { fetchProducts } = useFetchProducts();
  const { fetchCategories } = useFetchCategories();
  const { page, offset, products, selectedFilter, selectedCategory, searchedWord } = useProductsStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, offset, selectedCategory, selectedFilter, searchedWord, products.length]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Table />
    </div>
  );
};

export default Home;
