import { create } from "zustand";

interface ProductsStore {
  offset: number;
  page: number;
  limit: number;
  setPagination: (offset: number, page: number) => void;
}
export const useProductsStore = create<ProductsStore>((set) => ({
  offset: 0,
  page: 1,
  limit: 10,
  setPagination: (offset: number, page: number) => {
    set({ offset, page });
  },
}));
