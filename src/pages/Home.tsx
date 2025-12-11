import { useEffect, useState } from "react";
import { getAllProducts } from "../api/requests";
import type { PaginationParams, ProductsResponse } from "../api/types";
import CustomPagination from "../components/core/CustomPagination";
import { useProductsStore } from "@/stores/useProductsStore";

const Home = () => {
  const [products, setProducts] = useState<ProductsResponse[]>([]);
  const { offset, page, limit } = useProductsStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params: PaginationParams = { limit, offset, page };
        const response = await getAllProducts(params);
        console.log(response);

        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page, offset]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <CustomPagination />
    </div>
  );
};

export default Home;
