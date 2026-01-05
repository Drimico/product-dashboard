import type { CategoryResponse, ProductResponse } from "@/api/types";
import { create } from "zustand";

interface ProductsStore {
  offset: number;
  page: number;
  limit: number;
  products: ProductResponse[];
  categories: CategoryResponse[];
  selectedCategory: CategoryResponse | null;
  selectedFilter: "" | "Price Low To High" | "Price High To Low";
  totalProducts: ProductResponse[];
  searchedWord: string;
  setSearchedWord: (word: string) => void;
  setTotalProducts: (totalProducts: ProductResponse[]) => void;
  setProducts: (products: ProductResponse[]) => void;
  setCategories: (categories: CategoryResponse[]) => void;
  setSelectedCategory: (category: CategoryResponse | null) => void;
  setSelectedFilter: (filter: "" | "Price Low To High" | "Price High To Low") => void;
  setPagination: (offset: number, page: number) => void;
  removeProduct: (id: number) => void;
}
export const useProductsStore = create<ProductsStore>((set) => ({
  offset: 0,
  page: 1,
  limit: 8,
  products: [],
  categories: [],
  selectedCategory: null,
  selectedFilter: "",
  totalProducts: [],
  searchedWord: "",
  setSearchedWord: (word: string) => set({ searchedWord: word }),
  setTotalProducts: (totalProducts: ProductResponse[]) => set({ totalProducts }),
  setPagination: (offset: number, page: number) => {
    set({ offset, page });
  },
  setProducts: (products: ProductResponse[]) => set({ products }),
  removeProduct: (id: number) =>
    set((state) => {
      const newProducts = state.products.filter((product) => product.id !== id);

      if (newProducts.length === 0 && state.page > 1) {
        const newPage = state.page - 1;
        return {
          products: newProducts,
          page: newPage,
          offset: (newPage - 1) * state.limit,
        };
      }

      return { products: newProducts };
    }),
  setCategories: (categories: CategoryResponse[]) => set({ categories }),
  setSelectedCategory: (category: CategoryResponse | null) => set({ selectedCategory: category }),
  setSelectedFilter: (filter) => set({ selectedFilter: filter, page: 1, offset: 0 }),
}));
