import type { CategoryResponse, ProductResponse } from "@/api/types";
import { create } from "zustand";

interface ProductsStore {
  products: ProductResponse[];
  totalProducts: ProductResponse[];
  categories: CategoryResponse[];
  selectedCategory: CategoryResponse | null;
  searchedWord: string;
  hasNextPage: boolean;
  priceRange: { price_min: number | null; price_max: number | null };
  initialMinPrice: number;
  initialMaxPrice: number;
  setSearchedWord: (word: string) => void;
  setProducts: (products: ProductResponse[]) => void;
  setTotalProducts: (products: ProductResponse[]) => void;
  setCategories: (categories: CategoryResponse[]) => void;
  setSelectedCategory: (category: CategoryResponse | null) => void;
  setPriceRange: (priceRange: { price_min: number | null; price_max: number | null }) => void;
  setInitialMinPrice: (price: number) => void;
  setInitialMaxPrice: (price: number) => void;
  removeProduct: (id: number) => void;
  setHasNextPage: (hasNextPage: boolean) => void;
}
export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  totalProducts: [],
  categories: [],
  selectedCategory: null,
  searchedWord: "",
  priceRange: {
    price_min: null,
    price_max: null,
  },
  initialMinPrice: 0,
  initialMaxPrice: 0,
  hasNextPage: false,
  setSearchedWord: (word: string) => set({ searchedWord: word }),
  setProducts: (products: ProductResponse[]) => set({ products }),
  setTotalProducts: (totalProducts: ProductResponse[]) => set({ totalProducts }),
  removeProduct: (id: number) =>
    set((state) => {
      const newProducts = state.products.filter((product) => product.id !== id);

      return { products: newProducts };
    }),
  setCategories: (categories: CategoryResponse[]) => set({ categories }),
  setSelectedCategory: (category: CategoryResponse | null) => set({ selectedCategory: category }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setInitialMinPrice: (price: number) => set({ initialMinPrice: price }),
  setInitialMaxPrice: (price: number) => set({ initialMaxPrice: price }),
  setHasNextPage: (hasNextPage: boolean) => set({ hasNextPage }),
}));
